!function(){"use strict";function e(e,t,n,o,r,i,a,s,u,c){e.$parent.title=c.pageTitle,e.$parent.transparentNav=c.pageTransparentNav,e.rows=a.get("gridRows")?_.parseInt(a.get("gridRows")):c.gridDefaultRowCount,e.columns=a.get("gridColumns")?_.parseInt(a.get("gridColumns")):c.gridDefaultColumnCount;for(var l=t.uriFriendlyTitle?t.uriFriendlyTitle:!1,m=[],g=0;g<e.rows;g++){for(var p=[],f=0;f<e.columns;f++)p.push(f);m.push(p)}e.grid=m,e.manageGrid=function(t,n){switch(t){case"row":var o=r.row(n,e.rows,e.columns);return o?(o.newRow?e.grid.push(o.newRow):e.grid.pop(),e.rows=o.newRowsNumber,e.uiSettings.remember.boardLayout?a.set("gridRows",o.newRowsNumber):"",!0):!1;case"column":var i=r.column(n,e.columns);if(!i)return!1;for(g=0;g<e.rows;g++)"push"==i.operation?e.grid[g].push(e.columns):e.grid[g].pop();return e.columns=i.newColumnsNumber,e.uiSettings.remember.boardLayout?a.set("gridColumns",i.newColumnsNumber):"",!0;default:return s.log("Type "+t+" not allowed","debug"),!1}};var d=function(e){return n.get(e)},h=function(t,n,r,a){if(n===!1)return i.generate("A parameter must be present to access this section. Try navigating through search.","info"),o.url("/"),!1;var c="uriFriendlyTitle"==t?u.api+"title/"+n:u.api+t+"/"+n,l=Rx.Observable.fromPromise(d(c));l.subscribe(function(o){var i=o.data;s.log("UMI "+t+" => "+n+" loaded.","info"),a&&(i.targetClasses=a),i.where=r,e.grid[r.row][r.column]=i},function(e){i.generate("There was an error loading requested contribution.","error",e)})};h("uriFriendlyTitle",l,c.gridStartingPosition,!1),e.position=function(t,n,o){var r,i=[],a=n.where.row,s=n.where.column,u=o;"up"==t?r=[a-1,s]:"down"==t?r=[a+1,s]:"left"==t?r=[a,s-1]:"right"==t&&(r=[a,s+1]),0==r[0]?i.push("closes-top"):r[0]==e.rows-1?i.push("closes-bottom"):0==r[1]?i.push("closes-left"):r[1]==e.columns-1&&i.push("closes-right");var r={row:r[0],column:r[1]};h("id",u,r,i.join(" "))}}angular.module("omApp").controller("BoardController",e).constant("magicForBoard",{pageTitle:"Board",pageTransparentNav:!1,fadeUmiTimeout:250,gridDefaultRowCount:3,gridDefaultColumnCount:3,gridStartingPosition:{row:1,column:1}}),e.$inject=["$scope","$routeParams","$http","$location","manageGrid","notification","sStorage","logger","magic","magicForBoard"]}(),function(){"use strict";function e(){var e={restrict:"E",templateUrl:"app/sections/section.board/board.layout.html"};return e}angular.module("omApp").directive("boardLayout",e)}(),function(){"use strict";function e(e){function t(t,n,o){switch(t){case"add":if(n>e.gridMaxRows-1)return!1;for(var r=[],i=0;o>i;i++)r.push(i);return{newRowsNumber:n+1,newRow:r};case"remove":return n<e.gridMinRows+1?!1:{newRowsNumber:n-1,newRow:!1};default:return logger.log("Method "+t+" not allowed","debug"),!1}}function n(t,n){switch(t){case"add":return n>e.gridMaxColumns-1?!1:{newColumnsNumber:n+1,operation:"push"};case"remove":return n<e.gridMinColumns+1?!1:{newColumnsNumber:n-1,operation:"pop"};default:return logger.log("Method "+t+" not allowed","debug"),!1}}var o={row:t,column:n};return o}angular.module("omApp").factory("manageGrid",e).constant("magicForManageGridFactory",{gridMaxRows:6,gridMinRows:2,gridMaxColumns:6,gridMinColumns:2}),e.$inject=["magicForManageGridFactory"]}(),function(){"use strict";function e(e){function t(t,n,o){function r(e){l=e.pageY-c,a+l>s&&(document.getElementById(u).style.minHeight=a+l+"px")}function i(){e.off("mousemove",r),e.off("mouseup",i)}var a,s=_.parseInt(o.minHeight),u="row-"+o.rowIndex,c=0,l=0;n.on("mousedown",function(t){t.preventDefault(),a=document.getElementById(u).style.minHeight?_.parseInt(document.getElementById(u).style.minHeight):s,c=t.pageY,e.on("mousemove",r),e.on("mouseup",i)})}var n={restrict:"E",link:t};return n}angular.module("omApp").directive("resizeRow",e),e.$inject=["$document"]}(),function(){"use strict";function e(e,t,n,o,r,i,a,s,u,c,l){function m(){var n=e.formalVersion?["check",p()]:["latex-to-html",e.createUmiForm.content];return t.post(c.api+n[0],n[1])}function g(){return t.post(c.api+"add",p())}a.check(),e.$parent.title=l.pageTitle,e.$parent.transparentNav=l.pageTransparentNav,e.createUmiForm={umiType:"",title:"",titleSynonyms:"",content:"",prerequisiteDefinitionIds:{},seeAlsoIds:{},tags:""},t.get("app/sections/section.contribute/contribute.magic.json").success(function(t){_.forEach(t,function(t,n){e[n]=t}),e.stepsKeys=_.keys(e.steps),e.activeStep=0}).error(function(e){o(e,"error")}),e.onboarding.contributeAlpha?"":u.generate("contributeAlpha"),e.goToStep=function(t){var n=_.indexOf(e.stepsKeys,t);n<=e.activeStep?e.activeStep=n:i.generate("Please complete the current step first before proceeding further.","info")},e.toggleFormalVersion=function(){e.formalVersion=e.formalVersion?!1:!0,e.formalVersion?i.generate("Your contribution is now of type Formal.","info"):i.generate("Your contribution is no longer of type Formal.","info")},e.toggleMetaDefinition=function(){e.metaDefinition=e.metaDefinition?!1:!0,e.metaDefinition?i.generate("Your contribution is now of type Meta Definition.","info"):i.generate("Your contribution is no longer of type Meta Definition.","info")};var p=function(){var t={},n={accessToken:e.omUser.accessToken,gPlusId:e.omUser.id};return t.data=e.createUmiForm,t.formalVersion=e.formalVersion,t.metaDefinition=e.metaDefinition,s.returnStructure(t,n)};p(),e.createUmi=function(){var e=Rx.Observable.fromPromise(g());e.subscribe(function(e){var t=e.data;o.log(p(),"info"),i.generate("Your contribution was successfully posted!","success",t)},function(e){i.generate("There was an error posting your contribution.","error",e)})},r.watch(e,"createUmiForm.content").map(function(e){return e.newValue}).filter(function(t){return e.parsedContent=t,t}).debounce(l.parseContentTimeout).distinctUntilChanged()["do"](function(){o.log("LaTeX to HTML translation in progress","info"),e.parsingContent=!0,e.timeScale=_.timeScale(e.createUmiForm.content)}).flatMapLatest(m).retry(l.latexToHtmlRetry).subscribe(function(t){e.parsingContent=!1;var r,i=t.data,a="s"==_.first(i)?!0:!1;if(o.log({response:i,valid:a},"info"),a)r=i.substring(1);else{var s=i.substring(1);r=n.trustAsHtml("<pre>"+s+"</pre>")}e.parsedContent=r,e.parsed={valid:a,message:a?"Parsed":"Something went wrong"}},function(t){e.parsingContent=!1,e.parsedContent=n.trustAsHtml("<pre>There was an error parsing contribution, try refreshing the page and contributing again.</pre>"),e.parsed={valid:!1,message:"Error parsing"},i.generate("There was an error parsing content","error",t)})}angular.module("omApp").controller("ContributeController",e).constant("magicForContribute",{pageTitle:"Contribute",pageTransparentNav:!1,parseContentTimeout:2e3,parseContentProgressTimeout:750,latexToHtmlRetry:3}),e.$inject=["$scope","$http","$sce","logger","rx","notification","userLevel","mutation","onboarding","magic","magicForContribute"]}(),function(){"use strict";function e(){var e={restrict:"E",templateUrl:"app/sections/section.contribute/contribute.layout.html"};return e}angular.module("omApp").directive("contributeLayout",e)}(),function(){"use strict";function e(){function e(e,n){var o=e.data,r=e.formalVersion?"Formal":"",i=e.metaDefinition?"Meta":"";return t(o),{auth:n,message:"Initialise UMI",umiType:r+o.umiType.id+i,title:_.capitalise(o.title),titleSynonyms:o.titleSynonyms?_.cleanseCSV(o.titleSynonyms):[],content:o.content,prerequisiteDefinitionIds:o.prerequisiteDefinitionIds?_.keys(o.prerequisiteDefinitionIds):[],seeAlsoIds:o.seeAlsoIds?_.keys(o.seeAlsoIds):[],tags:o.tags?_.cleanseCSV(o.tags):[]}}function t(e){{var t=["umiType","title","titleSynonyms","content","prerequisiteDefinitionIds","seeAlsoIds","tags"];_.values(e)}_.map(t,function(){})}return{returnStructure:e}}angular.module("omApp").factory("mutation",e)}(),function(){"use strict";function e(e,t){e.$parent.title=t.pageTitle,e.$parent.transparentNav=t.pageTransparentNav}angular.module("omApp").controller("DiveController",e).constant("magicForDive",{pageTitle:"Dive Into",pageTransparentNav:!0}),e.$inject=["$scope","magicForDive"]}(),function(){"use strict";function e(){var e={restrict:"E",templateUrl:"app/sections/section.dive/dive.layout.html",controller:"SearchController"};return e}angular.module("omApp").directive("diveLayout",e)}(),function(){"use strict";function e(e,t,n,o,r,i,a){e.$parent.title=a.pageTitle,e.$parent.transparentNav=a.pageTransparentNav,e.createUmiForm={umiType:"",title:"",titleSynonyms:"",content:"",prerequisiteDefinitionIds:{},seeAlsoIds:{},tags:""};var s;e.formErrorMessages=a.formErrorMessages,e.formInstructions=a.formInstructions,e.formUmiTypes=a.formUmiTypes,e.steps=a.steps,e.stepsKeys=_.keys(e.steps),e.activeStep=0,e.goToStep=function(t){var n=_.indexOf(e.stepsKeys,t);n<=e.activeStep?e.activeStep=n:o.generate("Please complete the current step first before proceeding further.","info")},e.toggleFormalVersion=function(){e.formalVersion=e.formalVersion?!1:!0,e.formalVersion?o.generate("Your contribution is now of type Formal.","info"):o.generate("Your contribution is no longer of type Formal.","info")},e.createUmi=function(){var t=e.createUmiForm,n={auth:{accessToken:e.omUser.accessToken,gPlusId:e.omUser.id},message:"Initialise UMI",umiType:t.umiType.id,title:_.capitalise(t.title),titleSynonyms:t.titleSynonyms?_.cleanseCSV(t.titleSynonyms):[],content:t.content,prerequisiteDefinitionIds:t.prerequisiteDefinitionIds?_.keys(t.prerequisiteDefinitionIds):[],seeAlsoIds:t.seeAlsoIds?_.keys(t.seeAlsoIds):[],tags:t.tags?_.cleanseCSV(t.tags):[]};return console.log(n),!1},e.latexToHtml=function(){var r=e.createUmiForm.content;return r?(n.cancel(s),e.parsedContent=r,s=n(function(){},a.parseContentTimeout),void s.then(function(){e.parsingContent=!0,e.timeScale=_.timeScale(e.createUmiForm.content),t.post(i.api+"latex-to-html",e.createUmiForm.content).success(function(t){var o,r="parsed"==_.first(_.keys(t))?!0:!1;if(r)e.editorError=!1,o=t.parsed;else{var i=_.first(_.values(t)),s=_.parseInt(i[1])-4,u=e.createUmiForm.content.substr(s,8);e.editorError={message:i[0],offset:i[1],where:u},o=e.createUmiForm.content}e.parsedContent=o,n(function(){e.parsingContent=!1},a.parseContentProgressTimeout)}).error(function(e){o.generate("There was an error parsing content","error",e)})})):(e.parsedContent="",!1)}}angular.module("omApp").controller("EditController",e).constant("magicForEdit",{pageTitle:"Edit",pageTransparentNav:!1,parseContentTimeout:2e3,parseContentProgressTimeout:750,steps:{"basic-settings":"Basic Settings",editor:"Editor","preview-and-publish":"Preview & Publish"},formErrorMessages:{required:"This field is required.",maxLength:"This field is exceeding the maximum length of 128 characters.",umiTitle:"The title should only consist of letters, spaces, or hyphens"},formInstructions:{umiType:"What category of information?",title:"Users will be able to search your contribution.",titleSynonyms:"Comma-separated list of alternative names.",content:"The actual content. You are free to use LaTeX (including text-mode macros!!).",prerequisiteDefinitionIds:"Comma-separated list of valid dependency Titles.",seeAlsoIds:"Comma-separated list of valid Titles which may be related.",tags:"Comma-separated list of tags to help users find your contribution."},formUmiTypes:[{id:"Definition",label:"Definition",formal:"allow"},{id:"Axiom",label:"Axiom",formal:"allow"},{id:"Theorem",label:"Theorem",formal:"allow"},{id:"Lemma",label:"Lemma",formal:"allow"},{id:"Corollary",label:"Corollary",formal:"allow"},{id:"Conjecture",label:"Conjecture",formal:"allow"},{id:"Proof",label:"Proof",formal:"allow"},{id:"HistoricalNote",label:"Historical Note"},{id:"PhilosophicalJustification",label:"Philosophical Justification"},{id:"Diagram",label:"Diagram"},{id:"Example",label:"Example"},{id:"PartialTheorem",label:"Partial Theorem",formal:"allow"}]}),e.$inject=["$scope","$http","$timeout","notification","userLevel","magic","magicForContribute"]}(),function(){"use strict";function e(){var e={restrict:"E",templateUrl:"app/sections/section.edit/edit.layout.html"};return e}angular.module("omApp").directive("editLayout",e)}(),function(){"use strict";function e(e,t,n,o,r,i,a,s,u){function c(){var n=t.url().split("/");e.path=""==n[1]?u.pageDefaultWelcomeLabel:n[1],e.omUser=o.get("omUser"),e.gapiActive=o.get("gapiActive"),s.debug?a.log("Current Location: "+e.path,"info"):r.sendPageView(t.path())}e.title=u.pageTitle,e.siteName=s.siteName,e.siteLanguage=s.siteLanguage,e.description=s.description,e.year=s.year,e.cssPath=s.css,e.uiSettings=n.get("uiSettings")?n.get("uiSettings"):u.uiSettingsDefault,e.onboarding=n.get("onboarding")?n.get("onboarding"):{},e.setUI=function(t,o){switch(t=t.toLowerCase()){case"font":e.uiSettings.font=o;break;case"theme":e.uiSettings.theme=o;break;case"remember":e.uiSettings.remember[o]=e.uiSettings.remember[o]?!1:!0;break;default:return!1}n.set("uiSettings",e.uiSettings)},e.$watch(function(){return t.path()},c)}angular.module("omApp").controller("GlobalController",e).constant("magicForGlobal",{pageTitle:"Page",pageDefaultWelcomeLabel:"dive",uiSettingsDefault:{theme:"light",font:"umi-font-modern",remember:{boardLayout:!0}}}).constant("magic",{siteName:"OpenMaths",siteLanguage:"en",description:"The way Mathematics should be done.",css:_.getCSSPath(),api:_.getApiUrl(),debug:_.getDebug(),year:(new Date).getFullYear()}),e.$inject=["$scope","$location","lStorage","sStorage","googleAnalytics","onboarding","logger","magic","magicForGlobal"]}(),function(){"use strict";function e(e,t,n,o){function r(r,i,a){var s=function(){return e.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+i.access_token)},u=function(t){return e.post(n.api+"arft",t)},c=function(t){return e.post(n.api+"login",t)};Rx.Observable.fromPromise(s()).map(function(e){var t=e.data;return t.accessToken=r.access_token,t.avatarStyle={"background-image":"url('"+t.picture+"')"},Rx.Observable.fromPromise(u(t.id)).map(function(e){return{arftResponse:e.data,data:t}})})["switch"]().map(function(e){var t=e.arftResponse,n=e.data,o={arfToken:t,code:r.code,gmail:n.email,gPlusId:n.id};return Rx.Observable.fromPromise(c(o)).map(function(e){return{loginResult:e,data:n}})})["switch"]().retry(o.authRetry).subscribe(function(e){var n=e.loginResult,o=e.data;200==n.status?a(o):t.generate("There was an error signing you in to our application server.","error",n)},function(e){t.generate("There was an error signing you in to our application server.","error",e)})}function i(o,r){var i=function(){return e.post(n.api+"logout",o)};Rx.Observable.fromPromise(i()).subscribe(function(){r()},function(e){t.generate("There was an error signing you out of our application server.","error",e)})}return{signIn:r,signOut:i}}angular.module("omApp").factory("omAuth",e).constant("magicForOmAuth",{authRetry:3}),e.$inject=["$http","notification","magic","magicForOmAuth"]}(),function(){"use strict";function e(e,t,n){function o(o){var r=t.get("omUser");return r?void e.url("/"+o):(n.generate("You need to be signed in to access this section.","info"),!1)}function r(){var o=t.get("omUser");return o?void 0:(n.generate("You need to be signed in to access this section.","info"),e.url("/"),!1)}return{access:o,check:r}}angular.module("omApp").factory("userLevel",e),e.$inject=["$location","sStorage","notification"]}(),function(){"use strict";function e(e){function t(t,n,o){t.$watch(o.omBind,function(o){n.html(o),e(n.contents())(t),MathJax.Hub.Queue(["Typeset",MathJax.Hub,n[0]])})}var n={restrict:"A",replace:!0,link:t};return n}angular.module("omApp").directive("omBind",e),e.$inject=["$compile"]}(),function(){"use strict";function e(){var e={restrict:"A",templateUrl:"app/sections/shared.autocomplete/layout.html",scope:{autocompleteData:"=model"},controller:"SearchController"};return e}angular.module("omApp").directive("autocomplete",e)}(),function(){"use strict";function e(){var e={restrict:"A",templateUrl:"app/sections/shared.footer/layout.html"};return e}angular.module("omApp").directive("footerLayout",e)}(),function(){"use strict";function e(e){function t(t){e.ga("send","pageview",{page:t})}var n={sendPageView:t};return n}angular.module("omApp").factory("googleAnalytics",e),e.$inject=["$window"]}(),function(){"use strict";function e(e,t,n){function o(o,r){return-1==_.indexOf(n.allowedTypes,r)?(e.debug("$log type "+r+" not allowed"),!1):void(t.debug?e[r](o):"")}var r={log:o};return r}angular.module("omApp").factory("logger",e).constant("magicForLoggerFactory",{allowedTypes:["info","warn","error","debug","log"]}),e.$inject=["$log","magic","magicForLoggerFactory"]}(),function(){"use strict";function e(e,t,n,o,r,i,a,s){function u(u){e.initGapi=function(){u.$apply(function(){u.gapiActive=a.set("gapiActive",{status:"active"})})},u.googleSignIn=function(){return u.omUser?(u.dropDownUser=u.dropDownUser?!1:!0,!1):void gapi.auth.signIn({callback:function(e){if(1==e.status.signed_in)r.signIn(e,gapi.auth.getToken(),c);else{var t=e.error;"immediate_failed"!==t&&"user_signed_out"!==t?o.generate("There was an error ("+t+") during the sign in process.","error"):i.log(t,"debug")}}})},u.googleSignOut=function(){gapi.auth.signOut(),r.signOut({accessToken:u.omUser.accessToken,gPlusId:u.omUser.id},l)};var c=function(e){a.set("omUser",e),u.omUser=e,o.generate("You are now signed in as "+e.email+".","success")},l=function(){a.remove("omUser"),u.omUser=!1,o.generate("You have been successfully signed out.","info")};u.accessUserLevel=function(e){return n.access(e)},u.accessBoard=function(){return"board"!==u.path&&(u.$parent.shakeDiveInSearch=!0,t(function(){u.$parent.shakeDiveInSearch=!1},s.shakeDiveInSearchTimeout),o.generate("Use our search to navigate to this section :-)","info")),!1}}var c={restrict:"A",templateUrl:"app/sections/shared.navigation/layout.html",scope:!0,link:u};return c}angular.module("omApp").directive("navTopLayout",e).constant("magicForNacTopDirective",{shakeDiveInSearchTimeout:550}),e.$inject=["$window","$timeout","userLevel","notification","omAuth","logger","sStorage","magicForNacTopDirective"]}(),function(){"use strict";function e(e,t,n){function o(o){t.subscribe(function(t){o.notification=t,o.act=!0,e(function(){o.act=!1},n.notificationDisappearTimeout)})}var r={restrict:"E",templateUrl:"app/sections/shared.notification/layout.html",scope:{},replace:!0,link:o};return r}angular.module("omApp").directive("notificationLayout",e).constant("magicForNotificationDirective",{notificationDisappearTimeout:2500}),e.$inject=["$timeout","notification","magicForNotificationDirective"]}(),function(){"use strict";function e(e,t){function n(e){r.push(e)}function o(n,o,i){if(-1==_.indexOf(t.allowedTypes,o))return e.log("Method "+o+" not allowed.","debug"),!1;var a={message:n,type:o};i&&(a.trace=i),e.log(a,"info"),_.forEach(r,function(e){e(a)})}var r=[];return{subscribe:n,generate:o}}angular.module("omApp").factory("notification",e).constant("magicForNotificationFactory",{allowedTypes:["info","warning","error","success"]}),e.$inject=["logger","magicForNotificationFactory"]}(),function(){"use strict";function e(e){function t(t,n,o){var r=o.section;t.initOnboardingInfo=function(){e.generate(r)}}var n={restrict:"E",templateUrl:"app/sections/shared.onboarding/onboarding-hotspot.layout.html",replace:!0,scope:{},link:t};return n}angular.module("omApp").directive("onboardingHotspot",e),e.$inject=["onboarding"]}(),function(){"use strict";function e(e,t,n,o){function r(r){n.subscribe(function(n){r.data=n,e(function(){r.act=!0},o.popUpAppearTimeout),r.hide=function(i){if(i){var a=t.get("onboarding")?t.get("onboarding"):{};a[n.section]=!0,r.onboarding[n.section]=!0,t.set("onboarding",a)}r.act=!1,e(function(){r.data=!1},o.popUpDisappearTimeout)}})}var i={restrict:"E",templateUrl:"app/sections/shared.onboarding/layout.html",replace:!0,scope:{onboarding:"=onboarding"},link:r};return i}angular.module("omApp").directive("onboardingLayout",e).constant("magicForOnboardingDirective",{popUpAppearTimeout:50,popUpDisappearTimeout:500}),e.$inject=["$timeout","lStorage","onboarding","magicForOnboardingDirective"]}(),function(){"use strict";function e(e,t,n){function o(e){i.push(e)}function r(o){t.get("app/sections/shared.onboarding/onboarding.content.json").success(function(t){var n=t[o];n.message=e.trustAsHtml(n.message),n.section=o,_.forEach(i,function(e){e(n)})}).error(function(e){n(e,"error")})}var i=[];return{subscribe:o,generate:r}}angular.module("omApp").factory("onboarding",e),e.$inject=["$sce","$http","logger"]}(),function(){"use strict";function e(){function e(e,t,n){return Rx.Observable.create(function(o){function r(e,t){o.onNext({oldValue:t,newValue:e})}return e.$watch(t,r,n)})}var t={watch:e};return t}angular.module("omApp").factory("rx",e)}(),function(){"use strict";function e(e,t,n,o,r,i,a,s){function u(t){if(!e.searchResults)return!1;var n=_.keys(e.searchResults.data).length,o=e.searchResults.currentSelection;return t==s.keyUp&&o>0?e.searchResults.currentSelection=o-1:t==s.keyDown&&n-1>o&&(e.searchResults.currentSelection=o+1),!1}function c(){if(!e.searchResults)return!1;var t=e.searchResults.currentSelection,n=e.searchResults.data[t];return e.autocompleteData[n.id]=n.title,l()}function l(){return e.searchTerm="",e.searchResults="",!1}function m(e){var t=e?e.length:!1;if(document.getElementById(s.simulateDivingDomId)&&t&&t<s.simulateDivingMaxTermLength){var n=t*(100/s.simulateDivingMaxTermLength)+"%";document.getElementById(s.simulateDivingDomId).style.backgroundPositionY=n}}function g(e){return t.get(a.api+"search/"+e)}e.nGetUmi=function(t){if(!e.searchResults)return r.generate("No URI argument present","error"),!1;var o=_.isUndefined(t)?e.searchResults.currentSelection:t,i=e.searchResults.data[o];n.path("/board/"+i.uriFriendlyTitle)},e.nRemoveTag=function(t){delete e.autocompleteData[t]},e.nAutocomplete=function(t){var n=e.searchResults.data[t];return e.autocompleteData[n.id]=n.title,l()},e.nNavigate=function(t,n){return t.keyCode==s.keyReturn?(t.preventDefault(),n?e.nGetUmi():c()):t.keyCode==s.keyUp||t.keyCode==s.keyDown?(t.preventDefault(),u(t.keyCode)):void 0},o.watch(e,"searchTerm").map(function(e){return e.newValue}).filter(function(e){return e?m(e):l(),e}).debounce(s.searchTimeout).distinctUntilChanged()["do"](function(e){i.log("Listing results for term: "+e,"info")}).flatMapLatest(g).retry(s.searchRetry).subscribe(function(t){var n=t.data;n.length>0?e.searchResults={currentSelection:0,data:n}:(e.searchResults=!1,r.generate("No results found :-(","info"))},function(e){r.generate("There was an error with the connection to our API.","error",e)})}angular.module("omApp").controller("SearchController",e).constant("magicForSearch",{keyDown:40,keyUp:38,keyReturn:13,simulateDivingMaxTermLength:40,simulateDivingDomId:"page-layout",searchTimeout:250,searchRetry:3}),e.$inject=["$scope","$http","$location","rx","notification","logger","magic","magicForSearch"]}(),function(){"use strict";function e(){function e(e,t){t.bind("click",function(e){e.stopPropagation()})}var t={restrict:"A",link:e};return t}angular.module("omApp").directive("stopEvent",e)}(),function(){"use strict";function e(e){function t(t,n){return e.localStorage.setItem(t,JSON.stringify(n)),!0}function n(t){var n=e.localStorage.getItem(t);return n?JSON.parse(n):!1}function o(t){return n(t)?(e.localStorage.removeItem(t),!0):!1}var r={set:t,get:n,remove:o};return r}angular.module("omApp").factory("lStorage",e),e.$inject=["$window"]}(),function(){"use strict";function e(e){function t(t,n){return e.sessionStorage.setItem(t,JSON.stringify(n)),!0}function n(t){var n=e.sessionStorage.getItem(t);return n?JSON.parse(n):!1}function o(t){return n(t)?(e.sessionStorage.removeItem(t),!0):!1}var r={set:t,get:n,remove:o};return r}angular.module("omApp").factory("sStorage",e),e.$inject=["$window"]}(),function(){"use strict";function e(e){function t(t,n,o){t.expandData={id:o.id,label:o.label,directions:e.directions}}var n={restrict:"A",templateUrl:"app/sections/shared.umi/expand-umi.layout.html",scope:{position:"=call",data:"="},link:t};return n}angular.module("omApp").directive("expandUmi",e).constant("magicForExpandUmiDirective",{directions:["up","right","down","left"]}),e.$inject=["magicForExpandUmiDirective"]}();