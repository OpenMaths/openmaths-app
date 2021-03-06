module openmaths.specs {
    'use strict';

    let Authentication: openmaths.Authentication;
    let $httpBackend: ng.IHttpBackendService;

    let googleApiToken = 'helloWorld';
    let googleApiResponse: IGApiUserInfoResponse = {
        email: '',
        family_name: '',
        gender: '',
        given_name: '',
        id: '',
        link: '',
        locale: '',
        name: '',
        picture: '',
        verified_email: true
    };

    let arftGPlusId: string = googleApiResponse.id;
    let arftResponse: string = '';

    let loginData: ILoginData = {
        arfToken: arftResponse,
        code: '',
        gmail: '',
        gPlusId: ''
    };
    let loginResponse: string = 'OK';

    let logoutData: openmaths.Auth = {
        accessToken: '',
        gPlusId: ''
    };
    let logoutResponse: string = 'OK';

    describe('Authentication', () => {
        beforeEach(angular.mock.module('openmaths'));

        beforeEach(inject((_Authentication_: openmaths.Authentication,
                           _$httpBackend_: ng.IHttpBackendService) => {
            Authentication = _Authentication_;
            $httpBackend = _$httpBackend_;
        }));

        it('should have the gApiLogin method', () => {
            expect(Authentication.gApiLogin).toBeDefined();
        });

        it('should have the gApiLogout method', () => {
            expect(Authentication.gApiLogout).toBeDefined();
        });

        it('should have the login method', () => {
            expect(Authentication.login).toBeDefined();
        });

        it('should have the logout method', () => {
            expect(Authentication.logout).toBeDefined();
        });

        //it('should have the userLoggedInCallback method', () => {
        //    expect(Authentication.userLoggedInCallback).toBeDefined();
        //});
        //
        //it('should have the userLoggedOutCallback method', () => {
        //    expect(Authentication.userLoggedOutCallback).toBeDefined();
        //});

        it('should be able to return Google API promise', () => {
            $httpBackend.expectGET('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + googleApiToken)
                .respond(200, googleApiResponse);

            let promise = Authentication.googleApiPromise(googleApiToken);

            promise.then((result) => {
                expect(result.data).toEqual(googleApiResponse);
            });

            $httpBackend.flush();
        });

        it('should be able to return Anti Request Forgery Token promise', () => {
            $httpBackend.expectPOST('http://api.om.dev/arft', arftGPlusId)
                .respond(200, arftResponse);

            let promise = Authentication.arftPromise(arftGPlusId);

            promise.then((result) => {
                expect(result.data).toEqual(arftResponse);
            });

            $httpBackend.flush();
        });

        it('should be able to return Login promise', () => {
            $httpBackend.expectPOST('http://api.om.dev/login', loginData)
                .respond(200, loginResponse);

            let promise = Authentication.loginPromise(loginData);

            promise.then((result) => {
                expect(result.data).toEqual(loginResponse);
            });

            $httpBackend.flush();
        });

        it('should be able to return Logout promise', () => {
            $httpBackend.expectPOST('http://api.om.dev/logout', logoutData)
                .respond(200, logoutResponse);

            let promise = Authentication.logoutPromise(logoutData);

            promise.then((result) => {
                expect(result.data).toEqual(logoutResponse);
            });

            $httpBackend.flush();
        });
    });
}