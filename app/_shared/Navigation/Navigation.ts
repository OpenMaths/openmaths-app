module openmaths {
    'use strict';

    export class NavigationFactory {
    }

    export interface INavigationDirectiveScope extends ng.IScope {
        GlobalCtr: openmaths.GlobalController;
    }

    angular
        .module('openmaths')
        .service('NavigationFactory', NavigationFactory);

    export class NavigationDirective implements ng.IDirective {
        link;
        restrict = 'E';
        replace = true;
        templateUrl = 'app/_shared/Navigation/navigation.html';

        constructor(private NavigationFactory: openmaths.NavigationFactory) {
            this.link = (scope: INavigationDirectiveScope) => {
            };
        }

        static init(): ng.IDirectiveFactory {
            return (NavigationFactory: openmaths.NavigationFactory) => {
                return new NavigationDirective(NavigationFactory);
            };
        }
    }

    angular
        .module('openmaths')
        .directive('navigation', NavigationDirective.init());
}