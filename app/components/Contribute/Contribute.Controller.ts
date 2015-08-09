module openmaths {
    'use strict';

    export class ContributeController {
        MutationForm: openmaths.MutationForm;
        SubmitMutation: openmaths.SubmitMutation;

        parsingInProgress: boolean;

        constructor($scope: ng.IScope, $http: ng.IHttpService) {
            this.MutationForm = new openmaths.MutationForm;
            this.SubmitMutation = new openmaths.SubmitMutation(new openmaths.Api($http));

            openmaths.ReactiveX.watchModel($scope, 'ContributeCtr.MutationForm.content.value')
                .throttle(500)
                .map((e: IReactiveXWatchModelCallbackArgs) => e.newValue)
                .subscribe((d: string) => {
                    let data = {
                        auth: openmaths.SessionStorage.get('omUser'),
                        s: d
                    };

                    Rx.Observable.fromPromise(this.SubmitMutation.latexToHtmlPromise(data))
                        .do(() => {
                            openmaths.Logger.debug('LaTeX to HTML translation in progress');

                            // @TODO if does not work move up a level
                            this.parsingInProgress = true;
                        })
                        .catch(error => {
                            let response = openmaths.Api.response(error);

                            openmaths.Logger.error(response);

                            this.MutationForm.content.error = true;
                            this.MutationForm.content.valueParsed = response.data;

                            return Rx.Observable.empty();
                        })
                        .subscribe(result => {
                            let response = openmaths.Api.response(result);

                            openmaths.Logger.info(response);

                            this.MutationForm.content.error = false;
                            this.MutationForm.content.valueParsed = response.data;

                            this.parsingInProgress = false;
                        });
                });
        }
    }

    angular
        .module('openmaths')
        .controller('ContributeController', ContributeController);
}