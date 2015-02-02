!function(){"use strict";function e(e,t,o,n,r,i,a,s,u,c,l,g){e.$parent.title=g.pageTitle,e.$parent.transparentNav=g.pageTransparentNav,e.rows=s.get("gridRows")?_.parseInt(s.get("gridRows")):g.gridDefaultRowCount,e.columns=s.get("gridColumns")?_.parseInt(s.get("gridColumns")):g.gridDefaultColumnCount;for(var m=t.uriFriendlyTitle?t.uriFriendlyTitle:!1,p=[],d=0;d<e.rows;d++){for(var f=[],h=0;h<e.columns;h++)f.push(h);p.push(f)}e.grid=p,e.manageGrid=function(t,o){switch(t){case"row":var n=i.row(o,e.rows,e.columns);return n?(n.newRow?e.grid.push(n.newRow):e.grid.pop(),e.rows=n.newRowsNumber,e.uiSettings.remember.boardLayout?s.set("gridRows",n.newRowsNumber):"",!0):!1;case"column":var r=i.column(o,e.columns);if(!r)return!1;for(d=0;d<e.rows;d++)"push"==r.operation?e.grid[d].push(e.columns):e.grid[d].pop();return e.columns=r.newColumnsNumber,e.uiSettings.remember.boardLayout?s.set("gridColumns",r.newColumnsNumber):"",!0;default:return c.log("Type "+t+" not allowed","debug"),!1}};var v=function(t,i,s,u){if(i===!1)return a.generate("A parameter must be present to access this section. Try navigating through search.","info"),r.url("/"),!1;var m=function(){e.fadeInUmi=!0},p="uriFriendlyTitle"==t?l.api+i:l.api+t+"/"+i;o.get(p).success(function(o){c.log("UMI "+t+" => "+i+" loaded.","info"),u&&(o.targetClasses=u),e.grid[s.row][s.column]=o,n(m,g.fadeUmiTimeout)}).error(function(e){a.generate("There was an error loading requested contribution.","error",e)})};v("uriFriendlyTitle",m,g.gridStartingPosition,!1),e.position=function(t,o,n,r){var i=[];if("up"==n)var a=[t-1,o];else if("down"==n)var a=[t+1,o];else if("left"==n)var a=[t,o-1];else if("right"==n)var a=[t,o+1];0==a[0]?i.push("closes-top"):a[0]==e.rows-1?i.push("closes-bottom"):0==a[1]?i.push("closes-left"):a[1]==e.columns-1&&i.push("closes-right");var a={row:a[0],column:a[1]};v("id",r,a,i.join(" "))}}angular.module("omApp").controller("BoardController",e).constant("magicForBoard",{pageTitle:"Board",pageTransparentNav:!1,fadeUmiTimeout:250,gridDefaultRowCount:3,gridDefaultColumnCount:3,gridStartingPosition:{row:1,column:1}}),e.$inject=["$scope","$routeParams","$http","$timeout","$location","manageGrid","notification","sStorage","lStorage","logger","magic","magicForBoard"]}(),function(){"use strict";function e(){var e={restrict:"E",templateUrl:"app/sections/section.board/board.layout.html"};return e}angular.module("omApp").directive("boardLayout",e)}(),function(){"use strict";function e(e){function t(t,o,n){switch(t){case"add":if(o>e.gridMaxRows-1)return!1;for(var r=[],i=0;n>i;i++)r.push(i);return{newRowsNumber:o+1,newRow:r};case"remove":return o<e.gridMinRows+1?!1:{newRowsNumber:o-1,newRow:!1};default:return logger.log("Method "+t+" not allowed","debug"),!1}}function o(t,o){switch(t){case"add":return o>e.gridMaxColumns-1?!1:{newColumnsNumber:o+1,operation:"push"};case"remove":return o<e.gridMinColumns+1?!1:{newColumnsNumber:o-1,operation:"pop"};default:return logger.log("Method "+t+" not allowed","debug"),!1}}var n={row:t,column:o};return n}angular.module("omApp").factory("manageGrid",e).constant("magicForManageGridFactory",{gridMaxRows:6,gridMinRows:2,gridMaxColumns:6,gridMinColumns:2}),e.$inject=["magicForManageGridFactory"]}(),function(){"use strict";function e(e){function t(t,o,n){function r(e){l=e.pageY-c,a+l>s&&(document.getElementById(u).style.minHeight=a+l+"px")}function i(){e.off("mousemove",r),e.off("mouseup",i)}var a,s=_.parseInt(n.minHeight),u="row-"+n.rowIndex,c=0,l=0;o.on("mousedown",function(t){t.preventDefault(),a=document.getElementById(u).style.minHeight?_.parseInt(document.getElementById(u).style.minHeight):s,c=t.pageY,e.on("mousemove",r),e.on("mouseup",i)})}var o={restrict:"E",link:t};return o}angular.module("omApp").directive("resizeRow",e),e.$inject=["$document"]}(),function(){"use strict";function e(e,t,o,n,r,i,a){r.check(),e.$parent.title=a.pageTitle,e.$parent.transparentNav=a.pageTransparentNav,e.createUmiForm={umiType:"",title:"",titleSynonyms:"",content:"",prerequisiteDefinitionIds:{},seeAlsoIds:{},tags:""};var s;e.formErrorMessages=a.formErrorMessages,e.formInstructions=a.formInstructions,e.formUmiTypes=a.formUmiTypes,e.steps=a.steps,e.stepsKeys=_.keys(e.steps),e.activeStep=0,e.goToStep=function(t){var o=_.indexOf(e.stepsKeys,t);o<=e.activeStep?e.activeStep=o:n.generate("Please complete the current step first before proceeding further.","info")},e.toggleFormalVersion=function(){e.formalVersion=e.formalVersion?!1:!0,e.formalVersion?n.generate("Your contribution is now of type Formal.","info"):n.generate("Your contribution is no longer of type Formal.","info")},e.createUmi=function(){var t=e.createUmiForm,o={auth:{accessToken:e.omUser.accessToken,gPlusId:e.omUser.id},message:"Initialise UMI",umiType:t.umiType.id,title:_.capitalise(t.title),titleSynonyms:t.titleSynonyms?_.cleanseCSV(t.titleSynonyms):[],content:t.content,prerequisiteDefinitionIds:t.prerequisiteDefinitionIds?_.keys(t.prerequisiteDefinitionIds):[],seeAlsoIds:t.seeAlsoIds?_.keys(t.seeAlsoIds):[],tags:t.tags?_.cleanseCSV(t.tags):[]};return console.log(o),!1},e.latexToHtml=function(){var r=e.createUmiForm.content;return r?(o.cancel(s),e.parsedContent=r,s=o(function(){},a.parseContentTimeout),void s.then(function(){e.parsingContent=!0,e.timeScale=_.timeScale(e.createUmiForm.content),t.post(i.api+"latex-to-html",e.createUmiForm.content).success(function(t){var n,r="parsed"==_.first(_.keys(t))?!0:!1;if(r)e.editorError=!1,n=t.parsed;else{var i=_.first(_.values(t)),s=_.parseInt(i[1])-4,u=e.createUmiForm.content.substr(s,8);e.editorError={message:i[0],offset:i[1],where:u},n=e.createUmiForm.content}e.parsedContent=n,o(function(){e.parsingContent=!1},a.parseContentProgressTimeout)}).error(function(e){n.generate("There was an error parsing content","error",e)})})):(e.parsedContent="",!1)}}angular.module("omApp").controller("ContributeController",e).constant("magicForContribute",{pageTitle:"Contribute",pageTransparentNav:!1,parseContentTimeout:2e3,parseContentProgressTimeout:750,steps:{"basic-settings":"Basic Settings",editor:"Editor","preview-and-publish":"Preview & Publish"},formErrorMessages:{required:"This field is required.",maxLength:"This field is exceeding the maximum length of 128 characters.",umiTitle:"The title should only consist of letters, spaces, or hyphens"},formInstructions:{umiType:"What category of information?",title:"Users will be able to search your contribution.",titleSynonyms:"Comma-separated list of alternative names.",content:"The actual content. You are free to use LaTeX (including text-mode macros!!).",prerequisiteDefinitionIds:"Comma-separated list of valid dependency Titles.",seeAlsoIds:"Comma-separated list of valid Titles which may be related.",tags:"Comma-separated list of tags to help users find your contribution."},formUmiTypes:[{id:"Definition",label:"Definition",formal:"allow"},{id:"Axiom",label:"Axiom",formal:"allow"},{id:"Theorem",label:"Theorem",formal:"allow"},{id:"Lemma",label:"Lemma",formal:"allow"},{id:"Corollary",label:"Corollary",formal:"allow"},{id:"Conjecture",label:"Conjecture",formal:"allow"},{id:"Proof",label:"Proof",formal:"allow"},{id:"HistoricalNote",label:"Historical Note"},{id:"PhilosophicalJustification",label:"Philosophical Justification"},{id:"Diagram",label:"Diagram"},{id:"Example",label:"Example"},{id:"PartialTheorem",label:"Partial Theorem",formal:"allow"}]}),e.$inject=["$scope","$http","$timeout","notification","userLevel","magic","magicForContribute"]}(),function(){"use strict";function e(){var e={restrict:"E",templateUrl:"app/sections/section.contribute/contribute.layout.html"};return e}angular.module("omApp").directive("contributeLayout",e)}(),function(){"use strict";function e(){var e={restrict:"A",templateUrl:"app/sections/shared.autocomplete/layout.html",scope:{autocompleteData:"=model"},controller:"SearchController"};return e}angular.module("omApp").directive("autocomplete",e)}(),function(){"use strict";function e(e,t,o){function n(n,r,i){e.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+r.access_token).success(function(r){r.accessToken=n.access_token,r.avatarStyle={"background-image":"url('"+r.picture+"')"},e.post(o.api+"arft",r.id).success(function(a){var s={code:n.code,gPlusId:r.id,arfToken:a};e.post(o.api+"login",s).success(function(e){"successMsg"==_.first(_.keys(e))?i(r):t.generate("There was an error signing you in to our application server.","error",e)}).error(function(e){t.generate("There was an error signing you in to our application server.","error",e)})}).error(function(e){t.generate("There was an error getting the anti request forgery token from our application server.","error",e)})}).error(function(e){t.generate("There was an error retrieving user data from Google.","error",e)})}function r(n,r){e.post(o.api+"logout",n).success(function(){r()}).error(function(e,o){t.generate("There was an error signing you out of our application server.","error",[e,o])})}return{signIn:n,signOut:r}}angular.module("omApp").factory("omAuth",e),e.$inject=["$http","notification","magic"]}(),function(){"use strict";function e(e,t,o){function n(n){var r=t.get("omUser");return r?void e.url("/"+n):(o.generate("You need to be signed in to access this section.","info"),!1)}function r(){var n=t.get("omUser");return n?void 0:(o.generate("You need to be signed in to access this section.","info"),e.url("/"),!1)}return{access:n,check:r}}angular.module("omApp").factory("userLevel",e),e.$inject=["$location","sStorage","notification"]}(),function(){"use strict";function e(e,t,o,n,r,i,a,s,u){function c(){var o=t.url().split("/");e.path=""==o[1]?u.pageDefaultWelcomeLabel:o[1],e.omUser=n.get("omUser"),e.gapiActive=n.get("gapiActive"),s.debug?a.log("Current Location: "+e.path,"info"):r.sendPageView(t.path())}e.title=u.pageTitle,e.siteName=s.siteName,e.siteLanguage=s.siteLanguage,e.description=s.description,e.year=s.year,e.cssPath=s.css,e.uiSettings=o.get("uiSettings")?o.get("uiSettings"):u.uiSettingsDefault,e.onboarding=o.get("onboarding")?o.get("onboarding"):{},e.setUI=function(t,n){switch(t=t.toLowerCase()){case"font":e.uiSettings.font=n;break;case"theme":e.uiSettings.theme=n;break;case"remember":e.uiSettings.remember[n]=e.uiSettings.remember[n]?!1:!0;break;default:return!1}o.set("uiSettings",e.uiSettings)},e.$watch(function(){return t.path()},c)}angular.module("omApp").controller("GlobalController",e).constant("magicForGlobal",{pageTitle:"Page",pageDefaultWelcomeLabel:"dive",uiSettingsDefault:{theme:"light",font:"umi-font-modern",remember:{boardLayout:!0}}}).constant("magic",{siteName:"OpenMaths",siteLanguage:"en",description:"The way Mathematics should be done.",css:_.getCSSPath(),api:_.getApiUrl(),debug:_.getDebug(),year:(new Date).getFullYear()}),e.$inject=["$scope","$location","lStorage","sStorage","googleAnalytics","onboarding","logger","magic","magicForGlobal"]}(),function(){"use strict";function e(e){function t(t,o,n){t.$watch(n.omBind,function(n){o.html(n),e(o.contents())(t),MathJax.Hub.Queue(["Typeset",MathJax.Hub,o[0]])})}var o={restrict:"A",replace:!0,link:t};return o}angular.module("omApp").directive("omBind",e),e.$inject=["$compile"]}(),function(){"use strict";function e(e,t){e.$parent.title=t.pageTitle,e.$parent.transparentNav=t.pageTransparentNav}angular.module("omApp").controller("DiveController",e).constant("magicForDive",{pageTitle:"Dive Into",pageTransparentNav:!0}),e.$inject=["$scope","magicForDive"]}(),function(){"use strict";function e(){var e={restrict:"E",templateUrl:"app/sections/section.dive/dive.layout.html",controller:"SearchController"};return e}angular.module("omApp").directive("diveLayout",e)}(),function(){"use strict";function e(){var e={restrict:"A",templateUrl:"app/sections/shared.footer/layout.html"};return e}angular.module("omApp").directive("footerLayout",e)}(),function(){"use strict";function e(e){function t(t){e.ga("send","pageview",{page:t})}var o={sendPageView:t};return o}angular.module("omApp").factory("googleAnalytics",e),e.$inject=["$window"]}(),function(){"use strict";function e(e,t,o){function n(n,r){return-1==_.indexOf(o.allowedTypes,r)?(e.debug("$log type "+r+" not allowed"),!1):void(t.debug?e[r](n):"")}var r={log:n};return r}angular.module("omApp").factory("logger",e).constant("magicForLoggerFactory",{allowedTypes:["info","warn","error","debug","log"]}),e.$inject=["$log","magic","magicForLoggerFactory"]}(),function(){"use strict";function e(e,t,o,n,r,i,a){function s(i){e.initGapi=function(){i.gapiActive=a.set("gapiActive",{status:"active"})},i.googleSignIn=function(){return i.omUser?(i.dropDownUser=i.dropDownUser?!1:!0,!1):void gapi.auth.signIn({callback:function(e){if(1==e.status.signed_in)n.signIn(e,gapi.auth.getToken(),s);else{var t=e.error;"immediate_failed"!==t&&"user_signed_out"!==t?o.generate("There was an error ("+t+") during the sign in process.","error"):r.log(t,"debug")}}})},i.googleSignOut=function(){gapi.auth.signOut(),n.signOut({accessToken:i.omUser.accessToken,gPlusId:i.omUser.id},u)};var s=function(e){a.set("omUser",e),i.omUser=e,o.generate("You are now signed in as "+e.email+".","success")},u=function(){a.remove("omUser"),i.omUser=!1,o.generate("You have been successfully signed out.","info")};i.accessUserLevel=function(e){return t.access(e)},i.accessBoard=function(){return"board"!==i.path&&o.generate("Use our search to navigate to this section :-)","info"),!1}}var u={restrict:"A",templateUrl:"app/sections/shared.navigation/layout.html",scope:!0,link:s};return u}angular.module("omApp").directive("navTopLayout",e),e.$inject=["$window","userLevel","notification","omAuth","logger","lStorage","sStorage"]}(),function(){"use strict";function e(e){function t(t,o,n){var r=n.section;t.initOnboardingInfo=function(){e.generate(r)}}var o={restrict:"E",templateUrl:"app/sections/shared.onboarding/onboarding-indicator.layout.html",replace:!0,scope:{},link:t};return o}angular.module("omApp").directive("onboardingIndicator",e),e.$inject=["onboarding"]}(),function(){"use strict";function e(e,t,o,n){function r(r){o.subscribe(function(o){r.data=o,e(function(){r.act=!0},n.popUpAppearTimeout),r.hide=function(i){if(i){var a=t.get("onboarding")?t.get("onboarding"):{};a[o.section]=!0,r.onboarding[o.section]=!0,t.set("onboarding",a)}r.act=!1,e(function(){r.data=!1},n.popUpDisappearTimeout)}})}var i={restrict:"E",templateUrl:"app/sections/shared.onboarding/layout.html",replace:!0,scope:{onboarding:"=onboarding"},link:r};return i}angular.module("omApp").directive("onboardingLayout",e).constant("magicForOnboardingDirective",{popUpAppearTimeout:50,popUpDisappearTimeout:500}),e.$inject=["$timeout","lStorage","onboarding","magicForOnboardingDirective"]}(),function(){"use strict";function e(e,t){function o(e){r.push(e)}function n(o){var n={title:t[o].title,message:e.trustAsHtml(t[o].message),section:o};_.forEach(r,function(e){e(n)})}var r=[];return{subscribe:o,generate:n}}angular.module("omApp").factory("onboarding",e).constant("magicForOnboardingFactory",{dive:{title:"Dive Into Mathematics",message:"Search results will appear as you type. You can easily navigate <strong>using arrow keys and pressing Enter</strong>, or simply using your mouse or track pad."},settings:{title:"Make yourself at home :-)",message:"For the more artful, we created a <strong>subtler - dark version</strong> of the platform. You can also set the definition font to <strong>Times New Roman</strong> found in most books."},contribute:{title:"Create content",message:"A Google Account. <strong>That is all you need</strong> to use OpenMaths to generate content and contribute."},manageBoard:{title:"Manage your board",message:"Use the plus and minus indicators to <strong>manage rows and columns</strong>. We remember your preferences by default, but you can always disable it."},resizeBoardRows:{title:"Resize and adapt",message:"Feel free to <strong>play around with the grid</strong>! Whether you are running out of space, or you simply want to customise the way it looks."}}),e.$inject=["$sce","magicForOnboardingFactory"]}(),function(){"use strict";function e(e,t,o,n,r,i,a,s){function u(t){if(!e.searchResults)return!1;var o=_.keys(e.searchResults.data).length,n=e.searchResults.currentSelection;return t==s.keyUp&&n>0?e.searchResults.currentSelection=n-1:t==s.keyDown&&o-1>n&&(e.searchResults.currentSelection=n+1),!1}function c(){if(!e.searchResults)return!1;var t=e.searchResults.currentSelection,o=e.searchResults.data[t];return e.autocompleteData[o.id]=o.title,l()}function l(){return e.searchTerm="",e.searchResults="",!1}function g(e){if(e<s.simulateDivingMaxTermLength){var t=e*(100/s.simulateDivingMaxTermLength)+"%";document.getElementById(s.simulateDivingDomId).style.backgroundPositionY=t}}var m;e.nGetUmi=function(t){if(!e.searchResults)return r.generate("No URI argument present","error"),!1;var o=_.isUndefined(t)?e.searchResults.currentSelection:t,i=e.searchResults.data[o];n.path("/board/"+i.uriFriendlyTitle)},e.nRemoveTag=function(t){delete e.autocompleteData[t]},e.nAutocomplete=function(t){var o=e.searchResults.data[t];return e.autocompleteData[o.id]=o.title,l()},e.nNavigate=function(t,o){return t.keyCode==s.keyReturn?(t.preventDefault(),o?e.nGetUmi():c()):t.keyCode==s.keyUp||t.keyCode==s.keyDown?(t.preventDefault(),u(t.keyCode)):void 0},e.nSearch=function(n){var u=e.searchTerm,c=u.length;return n?g(c):"",1>c?(e.searchResults=!1,!1):(o.cancel(m),m=o(function(){},s.keyboardDelay),void m.then(function(){t.get(a.api+"search/"+u).success(function(t){i.log("Listing results for term: "+u,"info"),t.length>0?e.searchResults={currentSelection:0,data:t}:(e.searchResults=!1,r.generate("No results found :-(","info"))}).error(function(e){r.generate("There was an error with the connection to our API.","error",e)})}))}}angular.module("omApp").controller("SearchController",e).constant("magicForSearch",{keyDown:40,keyUp:38,keyReturn:13,simulateDivingMaxTermLength:40,simulateDivingDomId:"page-layout",keyboardDelay:250}),e.$inject=["$scope","$http","$timeout","$location","notification","logger","magic","magicForSearch"]}(),function(){"use strict";function e(){function e(e,t){t.bind("click",function(e){e.stopPropagation()})}var t={restrict:"A",link:e};return t}angular.module("omApp").directive("stopEvent",e)}(),function(){"use strict";function e(e){function t(t,o){return e.localStorage.setItem(t,JSON.stringify(o)),!0}function o(t){var o=e.localStorage.getItem(t);return o?JSON.parse(o):!1}function n(t){return o(t)?(e.localStorage.removeItem(t),!0):!1}var r={set:t,get:o,remove:n};return r}angular.module("omApp").factory("lStorage",e),e.$inject=["$window"]}(),function(){"use strict";function e(e){function t(t,o){return e.sessionStorage.setItem(t,JSON.stringify(o)),!0}function o(t){var o=e.sessionStorage.getItem(t);return o?JSON.parse(o):!1}function n(t){return o(t)?(e.sessionStorage.removeItem(t),!0):!1}var r={set:t,get:o,remove:n};return r}angular.module("omApp").factory("sStorage",e),e.$inject=["$window"]}(),function(){"use strict";function e(e,t,o){function n(n){t.subscribe(function(t){n.notification=t,n.act=!0,e(function(){n.act=!1},o.notificationDisappearTimeout)})}var r={restrict:"E",templateUrl:"app/sections/shared.notification/layout.html",scope:{},replace:!0,link:n};return r}angular.module("omApp").directive("notificationLayout",e).constant("magicForNotificationDirective",{notificationDisappearTimeout:2500}),e.$inject=["$timeout","notification","magicForNotificationDirective"]}(),function(){"use strict";function e(e,t){function o(e){r.push(e)}function n(o,n,i){if(-1==_.indexOf(t.allowedTypes,n))return e.log("Method "+n+" not allowed.","debug"),!1;var a={message:o,type:n};i&&(a.trace=i),e.log(a,"info"),_.forEach(r,function(e){e(a)})}var r=[];return{subscribe:o,generate:n}}angular.module("omApp").factory("notification",e).constant("magicForNotificationFactory",{allowedTypes:["info","warning","error","success"]}),e.$inject=["logger","magicForNotificationFactory"]}();