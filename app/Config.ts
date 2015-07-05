module openmaths {
    'use strict';

    export interface IApiUrls {
        production: string;
        development: string;
        test: string;
    }

    export interface IApiRoutes {
        search: string;
    }

    export interface IUiConfig {
        theme: string;
        font: string;
        currentState: ng.ui.ICurrentStateUiConfig;
    }

    let uiConfig: IUiConfig = {
        theme: 'light',
        font: 'modern',
        currentState: {}
    };

    let apiUrls: IApiUrls = {
        production: 'https://api.openmaths.io/',
        development: 'http://api.om.dev/',
        test: 'http://api.om.dev/'
    };
    let apiRoutes: IApiRoutes = {
        search: 'search/'
    };
    let productionHost: string = 'openmaths.io';
    let testHost: string = 'localhost:8087';

    export class Config {
        static getApiUrl(): string {
            return apiUrls[openmaths.Debug.getEnvironment()];
        }

        static getProductionHost(): string {
            return productionHost;
        }

        static getTestHost(): string {
            return testHost;
        }

        static getApiRoutes(): IApiRoutes {
            return apiRoutes;
        }

        static getUiConfig(): IUiConfig {
            return uiConfig;
        }
    }
}

interface Window {
    gApiInitialised: () => void;
}

let gApiAsync = () => {
    window.gApiInitialised();
};