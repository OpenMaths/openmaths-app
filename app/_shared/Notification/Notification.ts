module openmaths {
    'use strict';

    let hideNotificationAfter: number = 4500;
    let allowedTypes: Array<string> = ['info', 'warning', 'error', 'success'];

    export interface INotificationData {
        message: string;
        type: string;
    }

    export class NotificationFactory {
        subscriptions = [];

        subscribe(callback: any) {
            this.subscriptions.push(callback);
        }

        generate(message: string, type: string, stackTrace?: any) {
            let notificationData: INotificationData = {
                message: message,
                type: _.contains(allowedTypes, type) ? type : _.first(allowedTypes)
            };

            if (stackTrace) openmaths.Logger.info(stackTrace);

            _.forEach(this.subscriptions, (callback) => {
                callback(notificationData);
            });
        }
    }

    angular
        .module('openmaths')
        .service('NotificationFactory', NotificationFactory);

    export interface INotificationDirectiveScope extends ng.IScope {
        notification: INotificationData;
        act: boolean;
    }

    export class NotificationDirective implements ng.IDirective {
        link;
        restrict = 'E';
        replace = true;
        scope = {};
        templateUrl = 'app/_shared/Notification/notification.html';

        constructor(private $timeout: ng.ITimeoutService,
                    private NotificationFactory: openmaths.NotificationFactory) {
            this.link = (scope: INotificationDirectiveScope) => {
                NotificationFactory.subscribe((notificationData) => {
                    scope.notification = notificationData;
                    scope.act = true;

                    $timeout(() => {
                        scope.act = false;
                    }, hideNotificationAfter);
                });
            };
        }

        static init(): ng.IDirectiveFactory {
            return ($timeout: ng.ITimeoutService, NotificationFactory: openmaths.NotificationFactory) => {
                return new NotificationDirective($timeout, NotificationFactory);
            };
        }
    }

    angular
        .module('openmaths')
        .directive('notification', NotificationDirective.init());
}