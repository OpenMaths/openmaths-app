module openmaths {
    'use strict';

    export interface IUmiDetails {
        id: string;
        title: string;
        type: string;
        uriFriendlyTitle: string;
    }

    export interface IUmi {
        creator: string;
        htmlContent: string;
        id: string;
        latexContent: string;
        latexContentId: string;
        prerequisiteDefinitions: Array<IUmiDetails>;
        seeAlso: Array<IUmiDetails>;
        tags: Array<string>;
        title: string;
        titleSynonyms: Array<string>;
        ts: number;
        umiType: string;
        uriFriendlyTitle: string;
    }

    export class Umi implements IUmi {
        creator = '';
        htmlContent = '';
        id = '';
        latexContent = '';
        latexContentId = '';
        prerequisiteDefinitions = [];
        seeAlso = [];
        tags = [];
        title = '';
        titleSynonyms = [];
        ts = 0;
        umiType = '';
        uriFriendlyTitle = '';

        //constructor() {
            //this.creator = '';
            //this.htmlContent = '';
            //this.id = '';
            //this.latexContent = '';
            //this.latexContentId = '';
            //this.prerequisiteDefinitions = [];
            //this.seeAlso = [];
            //this.tags = [];
            //this.title = '';
            //this.titleSynonyms = [];
            //this.ts = 0;
            //this.umiType = '';
            //this.uriFriendlyTitle = '';
        //}
    }
}