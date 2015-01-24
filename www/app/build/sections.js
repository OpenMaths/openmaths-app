!function(){"use strict";function e(e,t){e.$parent.title=t.pageTitle,e.$parent.transparentNav=t.pageTransparentNav}angular.module("omApp").controller("BoardController",e).constant("magicForBoard",{pageTitle:"Board",pageTransparentNav:!1}),e.$inject=["$scope","magicForBoard"]}(),function(){"use strict";function e(e,t,o,r,n,i,a,s){function c(c){c.rows=n.get("gridRows")?_.parseInt(n.get("gridRows")):s.gridDefaultRowCount,c.columns=n.get("gridColumns")?_.parseInt(n.get("gridColumns")):s.gridDefaultColumnCount;for(var u=e.uriFriendlyTitle,l=[],g=0;g<c.rows;g++){for(var m=[],p=0;p<c.columns;p++)m.push(p);l.push(m)}c.grid=l,c.manageGrid=function(e,t){if("row"==t){for(var o=[],r=0;r<c.columns;r++)o.push(r);switch(e){case"add":if(c.rows>s.gridMaxRows-1)return!1;c.rows=c.rows+1,c.grid.push(o);break;case"remove":if(c.rows<s.gridMinRows+1)return!1;c.rows=c.rows-1,c.grid.pop();break;default:return i.log("Method"+e+"not allowed","debug"),!1}return n.set("gridRows",c.rows),!0}if("column"==t){switch(e){case"add":if(c.columns>s.gridMaxColumns-1)return!1;for(var r=0;r<c.rows;r++)c.grid[r].push(c.columns);c.columns=c.columns+1;break;case"remove":if(c.columns<s.gridMinColumns+1)return!1;for(r=0;r<c.rows;r++)c.grid[r].pop();c.columns=c.columns-1;break;default:return i.log("Method"+e+"not allowed","debug"),!1}return n.set("gridColumns",c.columns),!0}return i.log("Type"+t+"not allowed","debug"),!1};var f=function(e,n,i,u){var l=function(){c.fadeInUmi=!0},g="uriFriendlyTitle"==e?a.api+n:a.api+e+"/"+n;t.get(g).success(function(e){u&&(e.targetClasses=u),c.grid[i.row][i.column]=e,o(l,s.fadeUmiTimeout)}).error(function(e){r.generate("There was an error loading requested contribution.","error",e)})};f("uriFriendlyTitle",u,s.gridStartingPosition,!1),c.position=function(e,t,o,r){var n=[];if("up"==o)var i=[e-1,t];else if("down"==o)var i=[e+1,t];else if("left"==o)var i=[e,t-1];else if("right"==o)var i=[e,t+1];0==i[0]?n.push("closes-top"):i[0]==c.rows-1?n.push("closes-bottom"):0==i[1]?n.push("closes-left"):i[1]==c.columns-1&&n.push("closes-right");var i={row:i[0],column:i[1]};f("id",r,i,n.join(" "))}}var u={restrict:"EA",templateUrl:"app/sections/section.board/board.layout.html",link:c};return u}angular.module("omApp").directive("boardLayout",e).constant("magicForBoardDirective",{fadeUmiTimeout:250,gridDefaultRowCount:3,gridDefaultColumnCount:3,gridMaxRows:6,gridMinRows:2,gridMaxColumns:6,gridMinColumns:2,gridStartingPosition:{row:1,column:1}}),e.$inject=["$routeParams","$http","$timeout","notification","sStorage","logger","magic","magicForBoardDirective"]}(),function(){"use strict";function e(e,t){e.$parent.title=t.pageTitle,e.$parent.transparentNav=t.pageTransparentNav}angular.module("omApp").controller("DiveController",e).constant("magicForDive",{pageTitle:"Dive Into",pageTransparentNav:!0}),e.$inject=["$scope","magicForDive"]}(),function(){"use strict";function e(e,t){function o(o){o.getUmi=function(o){return o?void e.path("/board/"+o):(t.generate("No URI argument present","error"),!1)}}var r={restrict:"EA",templateUrl:"app/sections/section.dive/dive.layout.html",link:o,controller:"SearchController"};return r}angular.module("omApp").directive("diveLayout",e),e.$inject=["$location","notification"]}(),function(){"use strict";function e(e,t,o){e.omUser||alert("You must be logged in to Contribute to OpenMaths!"),e.$parent.title=o.pageTitle,e.$parent.transparentNav=o.pageTransparentNav}angular.module("omApp").controller("ContributeController",e).constant("magicForContribute",{pageTitle:"Contribute",pageTransparentNav:!1}),e.$inject=["$scope","$location","magicForContribute"]}(),function(){"use strict";function e(e,t,o,r,n,i){function a(a){var s;a.autocompleteData={},a.formErrorMessages=i.formErrorMessages,a.formInstructions=i.formInstructions,a.formUmiTypes=i.formUmiTypes,a.steps=i.steps,a.stepsKeys=_.keys(a.steps),a.activeStep=0,a.goToStep=function(e){var t=_.indexOf(a.stepsKeys,e);t<=a.activeStep?a.activeStep=t:n.generate("Please complete the current step first before proceeding further.","info")},a.toggleFormalVersion=function(){a.formalVersion=a.formalVersion?!1:!0,a.formalVersion?n.generate("Your contribution is now of type Formal.","info"):n.generate("Your contribution is no longer of type Formal.","info")},a.createUmi=function(){var t=a.createUmiForm,o={auth:{accessToken:a.omUser.accessToken,gPlusId:a.omUser.id},message:"Initialise UMI",umiType:t.type.id,title:_.capitalise(t.title),titleSynonyms:t.titleSynonyms?_.cleanseCSV(t.titleSynonyms):[],content:t.latexContent,prerequisiteDefinitionIds:a.autocompleteData.prerequisiteDefinitions?_.keys(a.autocompleteData.prerequisiteDefinitions):[],seeAlsoIds:a.autocompleteData.seeAlso?_.keys(a.autocompleteData.seeAlso):[],tags:t.tags?_.cleanseCSV(t.tags):[]};a.contributeData=o,e.post(r.api+"add",o).success(function(e){n.generate("Your contribution was successfully posted!","success",e)}).error(function(e){n.generate("There was an error posting your contribution.","error",e)})},a.latexToHtml=function(){return a.createUmiForm.latexContent?(t.clearTimeout(s),a.parsedLatexContent=a.createUmiForm.latexContent,void(s=_.delay(function(){a.parsingContent=!0,a.timeScale=_.timeScale(a.createUmiForm.latexContent),e.post(r.api+"latex-to-html",a.createUmiForm.latexContent).success(function(e){var t,r="parsed"==_.first(_.keys(e))?!0:!1;if(r)a.editorError=!1,t=e.parsed;else{var n=_.first(_.values(e)),s=_.parseInt(n[1])-4,c=a.createUmiForm.latexContent.substr(s,8);a.editorError={message:n[0],offset:n[1],where:c},t=a.createUmiForm.latexContent}a.parsedLatexContent=t,o(function(){a.parsingContent=!1},i.parseLatexContentProgressTimeout)}).error(function(e){n.generate("There was an error parsing content","error",e)})},i.parseLatexContentTimeout))):(a.parsedLatexContent="",!1)}}var s={restrict:"EA",templateUrl:"app/sections/section.contribute/contribute.layout.html",link:a};return s}angular.module("omApp").directive("contributeLayout",e).constant("magicForContributeDirective",{parseLatexContentTimeout:2e3,parseLatexContentProgressTimeout:800,steps:{"basic-settings":"Basic Settings",editor:"Editor","preview-and-publish":"Preview & Publish"},formErrorMessages:{required:"This field is required.",maxLength:"This field is exceeding the maximum length of 128 characters.",umiTitle:"The title should only consist of letters, spaces, or hyphens"},formInstructions:{type:"What category of information?",title:"Users will be able to search your contribution.",titleSynonyms:"Comma-separated list of alternative names.",latexContent:"The actual content. You are free to use LaTeX (including text-mode macros!!).",prerequisiteDefinitions:"Comma-separated list of valid dependency Titles.",seeAlso:"Comma-separated list of valid Titles which may be related.",tags:"Comma-separated list of tags to help users find your contribution.",dispatch:"Submitting your contribution will create a request to pull the content into our database."},formUmiTypes:[{id:"Definition",label:"Definition",formal:"allow"},{id:"Axiom",label:"Axiom",formal:"allow"},{id:"Theorem",label:"Theorem",formal:"allow"},{id:"Lemma",label:"Lemma",formal:"allow"},{id:"Corollary",label:"Corollary",formal:"allow"},{id:"Conjecture",label:"Conjecture",formal:"allow"},{id:"Proof",label:"Proof",formal:"allow"},{id:"HistoricalNote",label:"Historical Note"},{id:"PhilosophicalJustification",label:"Philosophical Justification"},{id:"Diagram",label:"Diagram"},{id:"Example",label:"Example"},{id:"PartialTheorem",label:"Partial Theorem",formal:"allow"}]}),e.$inject=["$http","$window","$timeout","magic","notification","magicForContributeDirective"]}(),function(){"use strict";function e(e,t,o,r,n,i,a,s){e.title=s.pageTitle,e.siteName=a.siteName,e.siteLanguage=a.siteLanguage,e.description=a.description,e.$watch(function(){return t.path()},function(){var r=t.url().split("/");e.path=""==r[1]?s.pageDefaultWelcomeLabel:r[1],i.log("Current location: "+t.path(),"info"),o.ga("send","pageview",{page:t.path()})}),e.uiSettings=r.get("uiSettings")?r.get("uiSettings"):s.uiSettings,e.omUser=n.get("omUser")?n.get("omUser"):!1}angular.module("omApp").controller("GlobalController",e).constant("magicForGlobal",{pageTitle:"Page",pageDefaultWelcomeLabel:"dive",uiSettingsDefault:{theme:"light",font:"umi-font-modern"}}).constant("magic",{siteName:"OpenMaths",siteLanguage:"en",description:"The way Mathematics should have been done.",api:_.getApiUrl(),debug:_.getDebug()}),e.$inject=["$scope","$location","$window","lStorage","sStorage","logger","magic","magicForGlobal"]}(),function(){"use strict";function e(){var e={restrict:"A",link:function(e,t){t.bind("click",function(e){e.stopPropagation()})}};return e}angular.module("omApp").directive("stopEvent",e)}(),function(){"use strict";function e(e,t,o){function r(r,n,i){e.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+n.access_token).success(function(n){n.accessToken=r.access_token,n.avatarStyle={"background-image":"url('"+n.picture+"')"},e.post(o.api+"arft",n.id).success(function(a){var s={code:r.code,gPlusId:n.id,arfToken:a};e.post(o.api+"login",s).success(function(e){"successMsg"==_.first(_.keys(e))?i(n):t.generate("There was an error signing you in to our application server.","error",e)}).error(function(e){t.generate("There was an error signing you in to our application server.","error",e)})}).error(function(e){t.generate("There was an error getting the anti request forgery token from our application server.","error",e)})}).error(function(e){t.generate("There was an error retrieving user data from Google.","error",e)})}function n(r,n){e.post(o.api+"logout",r).success(function(){n()}).error(function(e,o){t.generate("There was an error signing you out of our application server.","error",[e,o])})}return{signIn:r,signOut:n}}angular.module("omApp").factory("omAuth",e),e.$inject=["$http","notification","magic"]}(),function(){"use strict";function e(e){var t={restrict:"A",replace:!0,link:function(t,o,r){t.$watch(r.omBind,function(r){o.html(r),e(o.contents())(t),MathJax.Hub.Queue(["Typeset",MathJax.Hub,o[0]])})}};return t}angular.module("omApp").directive("omBind",e),e.$inject=["$compile"]}(),function(){"use strict";function e(e,t,o){function r(r,n){return-1==_.indexOf(o.allowedTypes,n)?(e.debug("Method "+n+" not allowed."),!1):void(t.debug?e[n](r):"")}var n={log:r};return n}angular.module("omApp").factory("logger",e).constant("magicForLoggerFactory",{allowedTypes:["info","warn","error","debug","log"]}),e.$inject=["$log","magic","magicForLoggerFactory"]}(),function(){"use strict";function e(e,t,o,r){function n(n){e.initGapi=function(){n.gapiActive=!0},n.googleSignIn=function(){return n.omUser?(n.dropDownUser=n.dropDownUser?!1:!0,!1):void gapi.auth.signIn({callback:function(e){1==e.status.signed_in?o.signIn(e,gapi.auth.getToken(),i):"immediate_failed"!==e.error&&t.generate("There was an error ("+e.error+") during the sign in process.","error")}})},n.googleSignOut=function(){gapi.auth.signOut(),o.signOut({accessToken:n.omUser.accessToken,gPlusId:n.omUser.id},a)};var i=function(e){sessionStorage.setItem("omUser",JSON.stringify(e)),n.omUser=e,t.generate("You are now signed in as "+e.email+".","success")},a=function(){sessionStorage.removeItem("omUser"),n.omUser=!1,t.generate("You have been successfully signed out.","info")};n.setUI=function(e,t){var o=n.uiSettings;switch(e){case"font":o.font=t;break;case"theme":o.theme=t}r.set("uiSettings",o),n.uiSettings=o}}var i={restrict:"EA",templateUrl:"app/sections/shared.navigation/layout.html",link:n};return i}angular.module("omApp").directive("navTopLayout",e),e.$inject=["$window","notification","omAuth","lStorage"]}(),function(){"use strict";function e(e,t){function o(o){var r=2500;t.subscribe(function(t){o.notification=t,o.act=!0,e(function(){o.act=!1},r)})}var r={restrict:"EA",templateUrl:"app/sections/shared.notification/layout.html",scope:{},replace:!0,link:o};return r}angular.module("omApp").directive("notificationLayout",e),e.$inject=["$timeout","notification"]}(),function(){"use strict";function e(e,t){function o(e){n.push(e)}function r(o,r,i){if(-1==_.indexOf(t.allowedTypes,r))return e.log("Method "+r+" not allowed.","debug"),!1;var a={message:o,type:r};i&&(a.trace=i),e.log(a,"info"),_.forEach(n,function(e){e(a)})}var n=[];return{subscribe:o,generate:r}}angular.module("omApp").factory("notification",e).constant("magicForNotificationFactory",{allowedTypes:["info","warning","error","success"]}),e.$inject=["logger","magicForNotificationFactory"]}(),function(){"use strict";function e(e,t,o){var r=40,n=38,i=13,a=40;e.searchResultsNavigate=function(t,o,a){if(!t)return!1;var s=_.keys(t.data).length,c=t.currentSelection;if(o.keyCode==i)if(o.preventDefault(),"getUmi"==_.first(a)){var u=e.searchResults.data[e.searchResults.currentSelection].uriFriendlyTitle;e[a](u)}else"autocomplete"==_.first(a)&&e.autocomplete(a[1]);return o.keyCode==n&&c>0?(o.preventDefault(),t.currentSelection=c-1):o.keyCode==r&&s-1>c&&(o.preventDefault(),t.currentSelection=c+1),!1},e.search=function(r,n,i){n&&(e.showAutocomplete=!0);var a=function(t,o){var r=t.split("."),n=_.first(r);return r.length>1?(r.reverse().pop(),a(r.reverse().join("."),e[n])):o?o[n]:e[n]},a=a(r,!1),c=a.length;c>0?(i&&s(c),t.get(appConfig.apiUrl+"search/"+a).success(function(t){if(t.length>0){var r={currentSelection:0,data:t};e.searchResults=r}else e.searchResults=!1,o.generate("No results found :-(","info")}).error(function(e){o.generate("There was an error with the connection to our API.","error",e)})):e.searchResults=!1},e.autocomplete=function(t,o){var r=e.searchResults,n=o?r.data[o]:r.data[r.currentSelection];if(e.createUmiForm[t]="",e.showAutocomplete=!1,e.searchResults=!1,e.autocompleteData[t])e.autocompleteData[t][n.id]=n.title;else{var i={};i[n.id]=n.title,e.autocompleteData[t]=i}},e.removeUmiId=function(t,o){delete e.autocompleteData[t][o]};var s=function(e){if(a>e){var t=e*(100/a)+"%";document.getElementById("masthead").style.backgroundPositionY=t}}}angular.module("omApp").controller("SearchController",e),e.$inject=["$scope","$http","notification"]}(),function(){"use strict";function e(e){function t(t,o){return e.localStorage.setItem(t,JSON.stringify(o)),!0}function o(t){var o=e.localStorage.getItem(t);return o?JSON.parse(o):!1}var r={set:t,get:o};return r}angular.module("omApp").factory("lStorage",e),e.$inject=["$window"]}(),function(){"use strict";function e(e){function t(t,o){return e.sessionStorage.setItem(t,JSON.stringify(o)),!0}function o(t){var o=e.sessionStorage.getItem(t);return o?JSON.parse(o):!1}var r={set:t,get:o};return r}angular.module("omApp").factory("sStorage",e),e.$inject=["$window"]}();