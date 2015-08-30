module openmaths {
    'use strict';

    export interface IMutationFormObject {
        active: boolean;
        description: string;
        error?: boolean;
        label: string;
        options?: any;
        remove?: Function;
        update?: Function;
        parseCsv?: Function;
        value: any;
        valueMeta?: any;
        valueParsed?: string;
    }

    export enum UpdateValues {PrerequisiteDefinitions, SeeAlso}

    export class MutationForm {
        advancedTypeOptions: IMutationFormObject;
        content: IMutationFormObject;
        prerequisiteDefinitionIds: IMutationFormObject;
        seeAlsoIds: IMutationFormObject;
        tags: IMutationFormObject;
        title: IMutationFormObject;
        titleSynonyms: IMutationFormObject;
        umiType: IMutationFormObject;

        constructor(Umi?: openmaths.Umi) {
            this.advancedTypeOptions = {
                active: false,
                description: 'Advanced Type Options',
                label: 'Advanced Type Options',
                value: {
                    formal: false,
                    meta: false
                }
            };

            this.content = {
                active: false,
                description: 'The actual content. You are free to use LaTeX (including text-mode macros!!)',
                error: false,
                label: 'Content',
                value: 'C\'mon - Write some $LaTeX$ to see me work! :-)',
                valueParsed: ''
            };

            this.prerequisiteDefinitionIds = {
                active: false,
                description: 'Comma-separated list of valid dependency Titles',
                label: 'Prerequisite Definitions',
                remove: (id: string) => this.removeValues(UpdateValues.PrerequisiteDefinitions, id),
                update: (resolveObject: SearchResult) => this.updateValues(UpdateValues.PrerequisiteDefinitions, resolveObject),
                value: {}
            };

            this.seeAlsoIds = {
                active: false,
                description: 'Comma-separated list of valid Titles which may be related',
                label: 'See Also',
                remove: (id: string) => this.removeValues(UpdateValues.SeeAlso, id),
                update: (resolveObject: SearchResult) => this.updateValues(UpdateValues.SeeAlso, resolveObject),
                value: {}
            };

            this.tags = {
                active: false,
                description: 'Comma-separated list of tags to help users find your contribution.',
                label: 'Tags',
                parseCsv: () => this.tags.value = openmaths.CsvParser.parse(this.tags.valueMeta),
                remove: (label: string) => this.removeTag(label),
                value: [],
                valueMeta: ''
            };

            this.title = {
                active: true,
                description: 'Users will be able to search your contribution',
                label: 'Contribution Title',
                value: ''
            };

            // @TODO discuss redundancy?
            this.titleSynonyms = {
                active: false,
                description: 'Comma-separated list of alternative names.',
                label: 'Title Synonyms',
                value: [],
                valueMeta: ''
            };

            this.umiType = {
                active: false,
                description: 'What category of information?',
                label: 'Contribution Type',
                options: new openmaths.UmiTypes,
                value: ''
            };
        }

        resetActive(): void {
            _.forEach(this, (formObject: IMutationFormObject) => {
                if (formObject.active) formObject.active = false;
            });
        }

        updateValues(selector: UpdateValues, resolveObject: SearchResult) {
            switch (selector) {
                case UpdateValues.PrerequisiteDefinitions:
                    this.prerequisiteDefinitionIds.value[resolveObject.id] = resolveObject.title;
                    break;
                case UpdateValues.SeeAlso:
                    this.seeAlsoIds.value[resolveObject.id] = resolveObject.title;
                    break;
            }
        }

        removeValues(selector: UpdateValues, id: string) {
            switch (selector) {
                case UpdateValues.PrerequisiteDefinitions:
                    delete this.prerequisiteDefinitionIds.value[id];
                    break;
                case UpdateValues.SeeAlso:
                    delete this.seeAlsoIds.value[id];
                    break;
            }
        }

        removeTag(label) {
            let newCsvData = openmaths.CsvParser.removeFromList(this.tags.value, label);

            this.tags.value = newCsvData.list;
            this.tags.valueMeta = newCsvData.value;
        }
    }

    export interface ILatexToHtmlPromisePayload {
        auth: openmaths.Auth;
        s: string;
    }

    export class MutationApi {
        constructor(private Api: openmaths.Api) {
        }

        // @TODO private?
        latexToHtmlPromise(content: ILatexToHtmlPromisePayload): ng.IHttpPromise<void> {
            return this.Api.post(openmaths.Config.getApiRoutes().latexToHtml, content);
        }

        // @TODO private?
        checkContentPromise(payload: openmaths.Mutation): ng.IHttpPromise<void> {
            return this.Api.post(openmaths.Config.getApiRoutes().check, payload);
        }

        // @TODO private?
        createUmiPromise(payload: openmaths.Mutation): ng.IHttpPromise<void> {
            return this.Api.post(openmaths.Config.getApiRoutes().createUmi, payload);
        }

        parseContent(MutationForm: openmaths.MutationForm): ng.IHttpPromise<void> {
            let Mutation = new openmaths.Mutation(MutationForm),
                Promise;

            // @TODO discuss unification on the Back-End
            switch (MutationForm.advancedTypeOptions.value.formal) {
                case true:
                    Promise = this.checkContentPromise(Mutation);
                    break;
                default:
                    Promise = this.latexToHtmlPromise({
                        auth: Mutation.auth,
                        s: Mutation.content
                    });
                    break;
            }

            return Promise;
        }

        createContent(MutationForm: openmaths.MutationForm): ng.IHttpPromise<void> {
            let Mutation = new openmaths.Mutation(MutationForm);

            return this.createUmiPromise(Mutation);
        }

        update(MutationForm: openmaths.MutationForm) {
        }
    }

    export class Mutation {
        auth: openmaths.Auth;
        content: string;
        message: string;
        prerequisiteDefinitionIds: string[];
        seeAlsoIds: string[];
        tags: string[];
        title: string;
        titleSynonyms: string[];
        umiType: string;

        constructor(MutationForm: openmaths.MutationForm) {
            this.auth = openmaths.User.getAuthData();
            this.content = MutationForm.content.value;
            this.message = 'Initialise UMI';
            this.prerequisiteDefinitionIds = _.keys(MutationForm.prerequisiteDefinitionIds.value);
            this.seeAlsoIds = _.keys(MutationForm.seeAlsoIds.value);
            this.tags = MutationForm.tags.value;
            this.title = MutationForm.title.value;
            this.titleSynonyms = MutationForm.titleSynonyms.value;
            this.umiType = new UmiType(MutationForm.umiType, MutationForm.advancedTypeOptions.value).value;
        }
    }

    class UmiType {
        value: string;

        private prepend: string;
        private append: string;

        constructor(umiType: IMutationFormObject, advancedTypeOptions: {formal: boolean, meta: boolean}) {
            this.prepend = '';
            this.append = '';

            if (umiType.options[umiType.value]) {
                this.prepend = umiType.options[umiType.value].formal && advancedTypeOptions.formal ? 'Formal' : '';
                this.append = umiType.options[umiType.value].meta && advancedTypeOptions.meta ? 'Meta' : '';
            }

            this.value = this.prepend + umiType.value + this.append;

        }
    }
}