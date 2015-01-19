(function () {
	"use strict";

	angular
		.module("omApp")
		.controller("GlobalController", GlobalController)
		.constant("magicForGlobal", {
			pageTitle: "Page",
			pageDefaultWelcomeLabel: "dive"
		});

	function GlobalController($scope, $location, $window, magicForGlobal) {
		$scope.title = magicForGlobal.pageTitle;

		$scope.siteName = appConfig.siteName;
		$scope.siteLanguage = appConfig.siteLanguage;
		$scope.description = appConfig.description[appConfig.siteLanguage];

		$scope.$watch(function () {
			return $location.path();
		}, function () {
			var splitUrl = $location.url().split("/");
			$scope.path = splitUrl[1] == "" ? magicForGlobal.pageDefaultWelcomeLabel : splitUrl[1];

			// @TODO check if this works properly
			$window.ga("send", "pageview", {
				page: $location.path()
			});
		});

		// @TODO decide how and where implement
		$scope.setTheme = function (theme) {
			$scope.themeClass = theme;
			localStorage.setItem("themeClass", theme);
		};
		$scope.themeClass = localStorage.getItem("themeClass") ? localStorage.getItem("themeClass") : "light";

		$scope.setUmiFont = function (font) {
			$scope.umiFontClass = font;
			localStorage.setItem("umiFontClass", font);
		};
		$scope.umiFontClass = localStorage.getItem("umiFontClass") ? localStorage.getItem("umiFontClass") : "umi-font-modern";

		if (sessionStorage.getItem("omUser")) {
			var omUserString = sessionStorage.getItem("omUser");
			$scope.omUser = JSON.parse(omUserString);
		} else {
			$scope.omUser = false;
		}
	}


})();