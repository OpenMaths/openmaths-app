module openmaths {
    'use strict';

    interface IOnClickFocusDirectiveAttributes extends ng.IAttributes {
        focus: boolean;
        onClickFocus: string;
        selectOnFocus: boolean;
        stopIf: boolean;
    }

    export class OnClickFocusDirective implements ng.IDirective {
        link;
        scope = true;
        restrict = 'A';

        // @TODO clean cruft and test
        constructor() {
            this.link = (scope, ele, attr: IOnClickFocusDirectiveAttributes) => {
                let inputSelector = 'input, textarea, select',
                    inputElement = $(ele).find(inputSelector);

                if (attr.focus) inputElement.attr('focus', 'true').focus();

                ele.bind('click focus', (e) => {
                    _.forEach($(ele).siblings(), sibling => $(sibling).find(inputSelector).removeAttr('focus'));

                    inputElement = $(ele).find(inputSelector);

                    if (inputElement.attr('focus') == 'true' && e.type == 'focus') {
                        if (scope.$eval(attr.stopIf)) return false;

                        inputElement.removeAttr('focus');
                        $(ele).prev().focus();
                    } else {
                        scope.$eval(attr.onClickFocus);
                        scope.$apply();

                        if (attr.selectOnFocus) inputElement.select();

                        inputElement.attr('focus', 'true').focus();
                    }
                });

                scope.$on('$destroy', () => {
                    scope.$on('$destroy', () => ele.unbind());
                });
            };
        }

        static init(): ng.IDirectiveFactory {
            return () => {
                return new OnClickFocusDirective();
            };
        }
    }

    angular
        .module('openmaths')
        .directive('onClickFocus', OnClickFocusDirective.init());
}