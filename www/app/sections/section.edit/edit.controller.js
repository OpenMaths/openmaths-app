(function () {
	"use strict";

	angular
		.module("omApp")
		.controller("EditController", EditController)
		.constant("magicForEdit", {
			pageTitle: "Edit",
			pageTransparentNav: false,
			parseContentTimeout: 2000,
			parseContentProgressTimeout: 750,
			steps: {
				"basic-settings": "Basic Settings",
				"editor": "Editor",
				"preview-and-publish": "Preview & Publish"
			},
			formErrorMessages: {
				required: "This field is required.",
				maxLength: "This field is exceeding the maximum length of 128 characters.",
				umiTitle: "The title should only consist of letters, spaces, or hyphens"
			},
			formInstructions: {
				umiType: "What category of information?",
				title: "Users will be able to search your contribution.",
				titleSynonyms: "Comma-separated list of alternative names.",
				content: "The actual content. You are free to use LaTeX (including text-mode macros!!).",
				prerequisiteDefinitionIds: "Comma-separated list of valid dependency Titles.",
				seeAlsoIds: "Comma-separated list of valid Titles which may be related.",
				tags: "Comma-separated list of tags to help users find your contribution."
			},
			formUmiTypes: [
				{id: "Definition", label: "Definition", formal: "allow"},
				{id: "Axiom", label: "Axiom", formal: "allow"},
				{id: "Theorem", label: "Theorem", formal: "allow"},
				{id: "Lemma", label: "Lemma", formal: "allow"},
				{id: "Corollary", label: "Corollary", formal: "allow"},
				{id: "Conjecture", label: "Conjecture", formal: "allow"},
				{id: "Proof", label: "Proof", formal: "allow"},
				{id: "HistoricalNote", label: "Historical Note"},
				{id: "PhilosophicalJustification", label: "Philosophical Justification"},
				{id: "Diagram", label: "Diagram"},
				{id: "Example", label: "Example"},
				{id: "PartialTheorem", label: "Partial Theorem", formal: "allow"}
			]
		});

	function EditController($scope, $http, $timeout, notification, userLevel, magic, magicForContribute) {
		//userLevel.check();

		$scope.$parent.title = magicForContribute.pageTitle;
		$scope.$parent.transparentNav = magicForContribute.pageTransparentNav;


		$scope.createUmiForm = {
			umiType: "",
			title: "",
			titleSynonyms: "",
			content: "",
			prerequisiteDefinitionIds: {},
			seeAlsoIds: {},
			tags: ""
		};

		// @NOTE This is to store the $timeout promise,
		// so it can be reset on every keystroke.
		var parseContent;

		$scope.formErrorMessages = magicForContribute.formErrorMessages; // CHANGE IN LAYOUT
		$scope.formInstructions = magicForContribute.formInstructions; // CHANGE IN LAYOUT
		$scope.formUmiTypes = magicForContribute.formUmiTypes; // CHANGE IN LAYOUT

		// NOTE I realise this is a hacky way, but I need to override JS's alphabetical ordering
		$scope.steps = magicForContribute.steps;
		$scope.stepsKeys = _.keys($scope.steps);
		$scope.activeStep = 0;

		/**
		 * Navigates through individual steps of the contribution
		 *
		 * @param key {int}
		 */
		$scope.goToStep = function (key) {
			var keyIndex = _.indexOf($scope.stepsKeys, key);

			if (keyIndex <= $scope.activeStep) {
				$scope.activeStep = keyIndex;
			} else {
				notification.generate("Please complete the current step first before proceeding further.", "info");
			}
		};

		/**
		 * Toggles Formal Version of a contribution
		 */
		$scope.toggleFormalVersion = function () {
			$scope.formalVersion = $scope.formalVersion ? false : true;

			if ($scope.formalVersion) {
				notification.generate("Your contribution is now of type Formal.", "info");
			} else {
				notification.generate("Your contribution is no longer of type Formal.", "info");
			}
		};

		/**
		 * Makes mutation request
		 */
		$scope.createUmi = function () {
			var createUmiForm = $scope.createUmiForm;

			// @TODO this should be a factory
			var dispatchCreateUmi = {
				auth: {
					accessToken: $scope.omUser.accessToken,
					gPlusId: $scope.omUser.id
				},
				message: "Initialise UMI",
				umiType: createUmiForm.umiType.id,
				title: _.capitalise(createUmiForm.title),
				titleSynonyms: createUmiForm.titleSynonyms ? _.cleanseCSV(createUmiForm.titleSynonyms) : [],
				content: createUmiForm.content,
				prerequisiteDefinitionIds: createUmiForm.prerequisiteDefinitionIds ? _.keys(createUmiForm.prerequisiteDefinitionIds) : [],
				seeAlsoIds: createUmiForm.seeAlsoIds ? _.keys(createUmiForm.seeAlsoIds) : [],
				tags: createUmiForm.tags ? _.cleanseCSV(createUmiForm.tags) : []
			};

			console.log(dispatchCreateUmi);
			return false;

			$scope.contributeData = dispatchCreateUmi;

			$http.post(magic.api + "add", dispatchCreateUmi).
				success(function (data) {
					notification.generate("Your contribution was successfully posted!", "success", data);
				}).
				error(function (errorData) {
					notification.generate("There was an error posting your contribution.", "error", errorData);
				});
		};

		/**
		 * Updates latex to HTML
		 *
		 * @returns {boolean}
		 */
		$scope.latexToHtml = function () {
			var content = $scope.createUmiForm.content;

			if (!content) {
				$scope.parsedContent = "";

				return false;
			}

			$timeout.cancel(parseContent);

			$scope.parsedContent = content;

			parseContent = $timeout(function () {
			}, magicForContribute.parseContentTimeout);

			parseContent.then(function () {
				$scope.parsingContent = true;

				$scope.timeScale = _.timeScale($scope.createUmiForm.content);

				$http.post(magic.api + "latex-to-html", $scope.createUmiForm.content).
					success(function (response) {
						var parsedContent;
						var valid = _.first(_.keys(response)) == "parsed" ? true : false;

						if (!valid) {
							var err = _.first(_.values(response));

							var substrPos = _.parseInt(err[1]) - 4; // @TODO does this need < 0 fallback??
							var whereabouts = $scope.createUmiForm.content.substr(substrPos, 8);

							// TODO consider changing to Object rather than an array (BackEnd tidying)
							$scope.editorError = {
								message: err[0],
								offset: err[1],
								where: whereabouts
							};

							parsedContent = $scope.createUmiForm.content;
						} else {
							$scope.editorError = false;
							parsedContent = response.parsed;
						}

						$scope.parsedContent = parsedContent;

						// @NOTE This timeout is to replicate the actual parsing in production (may take about 1 sec.)
						$timeout(function () {
							$scope.parsingContent = false;
						}, magicForContribute.parseContentProgressTimeout);
					}).
					error(function (errorData) {
						notification.generate("There was an error parsing content", "error", errorData);
					});
			});
		};
	}

})();