module openmaths.specs {
    'use strict';

    describe('GlobalController', () => {
        beforeEach(module('openmaths'));

        let controller: openmaths.GlobalController;
        let $rootScope;
        let $state;
        let $templateCache: ng.ITemplateCacheService;
        let $window: IGlobalControllerWindow;

        let testStates = ['home', 'dive', 'dive.list'];
        let testStatesWithUiConfig = ['home', 'dive'];

        // @TODO
        // Authentication to be removed after development

        beforeEach(inject((Authentication: openmaths.Authentication,
                           _$rootScope_: ng.IRootScopeService,
                           _$state_: ng.ui.IStateProvider,
                           _$templateCache_: ng.ITemplateCacheService,
                           _$window_: IGlobalControllerWindow) => {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $templateCache = _$templateCache_;
            $window = _$window_;

            $templateCache.put('app/components/Home/home.html', '');
            $templateCache.put('app/components/Dive/dive.html', '');
            $templateCache.put('app/components/Dive/dive.list.html', '');

            controller = new openmaths.GlobalController(Authentication, $rootScope, $window);
        }));

        it('should create a new controller', () => {
            expect(controller).toBeDefined();
        });

        // TODO Buy Sam beer
        it('should have the uiConfig Object attached to each state', () => {
            _.forEach(testStatesWithUiConfig, (state) => {
                $state.go(state);
                $rootScope.$digest();

                let uiConfig: IUiConfig = controller.uiConfig;

                expect(uiConfig).toBeDefined();
            });
        });

        it('should assign correct state properties and add correct class on body when state changes', () => {
            _.forEach(testStates, (state) => {
                $state.go(state);
                $rootScope.$digest();

                let newState: ng.ui.IState = $state.current,
                    newStates: Array<string> = newState.name.split('.'),
                    currentBaseState: string = controller.currentBaseState,
                    bodyClass: string = controller.bodyClass;


                expect(currentBaseState).toEqual(_.first(newStates));
                expect(bodyClass).toEqual('page-' + currentBaseState);
            });
        });

        it('should have a "false-y" gApiInitialised model attached to its scope', () => {
            expect(controller.gApiInitialised).toBe(false);
        });

        it('should make gApiInitialised true after window.gApiInitialised() has been called', () => {
            $window.gApiInitialised();

            expect(controller.gApiInitialised).toBe(true);
        });
    });
}