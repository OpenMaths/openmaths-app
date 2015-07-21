module openmaths {
    'use strict';

    export class ExploreController {
        Board: openmaths.Board;
        Dive: openmaths.Dive;

        view: string;
        triggerBoard: (uriFriendlyTitle: string) => void;

        constructor(Api: openmaths.Api,
                    NotificationFactory: openmaths.NotificationFactory,
                    $rootScope: ng.IScope,
                    $state: ng.ui.IStateService) {
            this.Board = new openmaths.Board(Api, NotificationFactory);
            this.Dive = new openmaths.Dive();

            this.updateState($state.current.name);

            $rootScope.$on('$stateChangeSuccess', (e, toState) => {
                this.updateState(toState.name);
            });

            this.triggerBoard = (uriFriendlyTitle: string) => {
                $state.go('explore.board', {uriFriendlyTitle: uriFriendlyTitle});
            };
        }

        updateState(toState: string) {
            switch (toState) {
                case this.Board.state:
                    this.view = 'board';
                    break;
                case this.Dive.state:
                    this.view = 'dive';
                    break;
            }
        }
    }

    angular
        .module('openmaths')
        .controller('ExploreController', ExploreController);
}