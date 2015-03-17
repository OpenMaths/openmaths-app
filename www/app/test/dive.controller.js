"use strict";

describe("DiveController", function () {
	beforeEach(module("omApp"));

	var ctrl, scope;

	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		ctrl = $controller("DiveController", {$scope: scope});
	}));

	it("should have a title assigned.", function () {
		expect(scope.title).toBeDefined();
	});
});