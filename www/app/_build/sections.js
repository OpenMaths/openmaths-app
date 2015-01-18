!function(){"use strict";function e(e,t,o){function r(r,n,a){e.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+n.access_token).success(function(n){n.accessToken=r.access_token,n.avatarStyle={"background-image":"url('"+n.picture+"')"},e.post(appConfig.apiUrl+"arft",n.id).success(function(i){var s={code:r.code,gPlusId:n.id,arfToken:i};e.post(appConfig.apiUrl+"login",s).success(function(e){"successMsg"==_.first(_.keys(e))?a(n):(t.error(e),o.generate("There was an error signing you in to our application server.","error"))}).error(function(e){t.error(e),o.generate("There was an error signing you in to our application server.","error")})}).error(function(e){t.error(e),o.generate("There was an error getting the anti request forgery token from our application server.","error")})}).error(function(e){t.error(e),o.generate("There was an error retrieving user data from Google.","error")})}function n(r,n){e.post(appConfig.apiUrl+"logout",r).success(function(){n(!0)}).error(function(e){t.error(e),o.generate("There was an error signing you out of our application server.","error")})}return{signIn:r,signOut:n}}angular.module("omApp").factory("omAuth",e),e.$inject=["$http","$log","notification"]}(),function(){"use strict";function e(e){function t(t,o,r,n,a,i){var s=new XMLHttpRequest,l=appConfig.apiUrl+"/"+o;return-1==_.indexOf(appConfig.apiCORSMethods,t)?(e.generate("Method "+t+" not allowed.","error"),!1):(s.open(t,l,!0),_.forEach(_.keys(i),function(e){s.setRequestHeader(e,i[e])}),s.onreadystatechange=function(){var t=s.responseText;4==s.readyState&&(200==s.status?n(t):a?a(t):e.generate("There was an error with our application server while dealing with your request.","error"))},void s.send(r))}return{request:t}}angular.module("omApp").factory("CORS",e),e.$inject=["notification"]}(),function(){"use strict";function e(e){function t(t){e.initGapi=function(){t.gapiActive=!0}}var o={restrict:"EA",templateUrl:"app/sections/navigation/nav-top.layout.html",link:t};return o}angular.module("omApp").directive("navTop",e),e.$inject=["$window"]}(),function(){"use strict";function e(e,t,o,r,n){var a;e.$parent.title=r.pageTitle,e.$parent.transparentNav=r.pageTransparentNav,e.omUser||(alert("You must be logged in to Contribute to OpenMaths!"),t.path("/")),e.autocompleteData={},e.steps={"basic-settings":"Basic Settings",editor:"Editor","preview-and-publish":"Preview & Publish"},e.stepsKeys=_.keys(e.steps),e.activeStep=0,e.errorMessages={required:"This field is required.",maxLength:"This field is exceeding the maximum length of 128 characters.",umiTitle:"The title should only consist of letters, spaces, or hyphens"},e.instructions={type:"What category of information?",title:"Users will be able to search your contribution.",titleSynonyms:"Comma-separated list of alternative names.",latexContent:"The actual content. You are free to use LaTeX (including text-mode macros!!).",prerequisiteDefinitions:"Comma-separated list of valid dependency Titles.",seeAlso:"Comma-separated list of valid Titles which may be related.",tags:"Comma-separated list of tags to help users find your contribution.",dispatch:"Submitting your contribution will create a request to pull the content into our database."},e.umiTypes=[{id:"Definition",label:"Definition",formal:"allow"},{id:"Axiom",label:"Axiom",formal:"allow"},{id:"Theorem",label:"Theorem",formal:"allow"},{id:"Lemma",label:"Lemma",formal:"allow"},{id:"Corollary",label:"Corollary",formal:"allow"},{id:"Conjecture",label:"Conjecture",formal:"allow"},{id:"Proof",label:"Proof",formal:"allow"},{id:"HistoricalNote",label:"Historical Note"},{id:"PhilosophicalJustification",label:"Philosophical Justification"},{id:"Diagram",label:"Diagram"},{id:"Example",label:"Example"},{id:"PartialTheorem",label:"Partial Theorem",formal:"allow"}],e.goToStep=function(t){var o=_.indexOf(e.stepsKeys,t);o<=e.activeStep?e.activeStep=o:n.generate("Please complete the current step first before proceeding further.","info",e.$parent)},e.toggleFormalVersion=function(){e.formalVersion=e.formalVersion?!1:!0,e.formalVersion?n.generate("Your contribution is now of type Formal.","info",e.$parent):n.generate("Your contribution is no longer of type Formal.","info",e.$parent)},e.createUmi=function(){var t=e.createUmiForm,o={auth:{accessToken:e.omUser.accessToken,gPlusId:e.omUser.id},message:"Initialise UMI",umiType:t.type.id,title:_.capitalise(t.title),titleSynonyms:t.titleSynonyms?_.cleanseCSV(t.titleSynonyms):[],content:t.latexContent,prerequisiteDefinitionIds:e.autocompleteData.prerequisiteDefinitions?_.keys(e.autocompleteData.prerequisiteDefinitions):[],seeAlsoIds:e.autocompleteData.seeAlso?_.keys(e.autocompleteData.seeAlso):[],tags:t.tags?_.cleanseCSV(t.tags):[]};e.contributeData=o,CORS.request("POST","add",JSON.stringify(o),function(){n.generate("Your contribution was successfully posted!","success",e.$parent,!0)},!1,{"Content-type":"application/json;charset=UTF-8"})},e.latexToHtml=function(){return e.createUmiForm.latexContent?(window.clearTimeout(a),e.parsedLatexContent=e.createUmiForm.latexContent,void(a=_.delay(function(){e.parsingContent=!0,e.timeScale=_.timeScale(e.createUmiForm.latexContent),CORS.request("POST","latex-to-html",e.createUmiForm.latexContent,function(t){var n,t=JSON.parse(t),a="parsed"==_.first(_.keys(t))?!0:!1;if(a)e.editorError=!1,n=t.parsed;else{var i=_.first(_.values(t)),s=_.parseInt(i[1])-4,l=e.createUmiForm.latexContent.substr(s,8);e.editorError={message:i[0],offset:i[1],where:l},n=e.createUmiForm.latexContent}e.$apply(function(){e.parsedLatexContent=n}),o(function(){e.parsingContent=!1},r.parseLatexContentProgressTimeout)},!1,{"Content-type":"application/json;charset=UTF-8"})},r.parseLatexContentTimeout))):(e.parsedLatexContent="",!1)}}angular.module("omApp").controller("ContributeController",e).constant("magic",{pageTitle:"Contribute",pageTransparentNav:!1,parseLatexContentTimeout:2e3,parseLatexContentProgressTimeout:800}),e.$inject=["$scope","$location","$timeout","magic","notification"]}(),function(){"use strict";function e(e,t,o,r,n,a){var i=r.id,s=[];e.$parent.title=a.pageTitle,e.$parent.transparentNav=a.pageTransparentNav,e.rows=sessionStorage.getItem("gridRows")?_.parseInt(sessionStorage.getItem("gridRows")):a.gridDefaultRowCount,e.columns=sessionStorage.getItem("gridColumns")?_.parseInt(sessionStorage.getItem("gridColumns")):a.gridDefaultColumnCount;for(var l=0;l<e.rows;l++){for(var c=[],u=0;u<e.columns;u++)c.push(u);s.push(c)}e.grid=s,e.manageGrid=function(t,o){if("row"==o){for(var r=[],n=0;n<e.columns;n++)r.push(n);switch(t){case"add":if(e.rows>a.gridMaxRows-1)return!1;e.rows=e.rows+1,e.grid.push(r);break;case"remove":if(e.rows<a.gridMinRows+1)return!1;e.rows=e.rows-1,e.grid.pop()}sessionStorage.setItem("gridRows",e.rows)}else if("column"==o){switch(t){case"add":if(e.columns>a.gridMaxColumns-1)return!1;for(var n=0;n<e.rows;n++)e.grid[n].push(e.columns);e.columns=e.columns+1;break;case"remove":if(e.columns<a.gridMinColumns+1)return!1;for(n=0;n<e.rows;n++)e.grid[n].pop();e.columns=e.columns-1}sessionStorage.setItem("gridColumns",e.columns)}};var p=function(r,i,s,l){var c=function(){e.fadeInUmi=!0},u="uriFriendlyTitle"==r?appConfig.apiUrl+"/"+i:appConfig.apiUrl+"/"+r+"/"+i;t.get(u).success(function(t){l&&(t.targetClasses=l),e.grid[s.row][s.column]=t,o(c,a.fadeUmiTimeout)}).error(function(){n.generate("There was an error loading requested contribution.","error",e.$parent)})};p("uriFriendlyTitle",i,a.gridStartingPosition,!1),e.position=function(t,o,r,n){var a=[];if("up"==r)var i=[t-1,o];else if("down"==r)var i=[t+1,o];else if("left"==r)var i=[t,o-1];else if("right"==r)var i=[t,o+1];0==i[0]?a.push("closes-top"):i[0]==e.rows-1?a.push("closes-bottom"):0==i[1]?a.push("closes-left"):i[1]==e.columns-1&&a.push("closes-right");var i={row:i[0],column:i[1]};p("id",n,i,a.join(" "))}}angular.module("omApp").controller("BoardController",e).constant("magicForBoard",{pageTitle:"Board",pageTransparentNav:!1,gridDefaultRowCount:3,gridDefaultColumnCount:3,gridMaxRows:6,gridMinRows:2,gridMaxColumns:6,gridMinColumns:2,gridStartingPosition:{row:1,column:1},fadeUmiTimeout:250}),e.$inject=["$scope","$http","$timeout","$routeParams","notification","magicForBoard"]}(),function(){"use strict";function e(e,t,o,r){e.$parent.title=r.pageTitle,e.$parent.transparentNav=r.pageTransparentNav,e.getUmi=function(r){return r?void t.path("/board/"+r):(o.generate("No URI argument present","error",e),!1)}}angular.module("omApp").controller("DiveController",e).constant("magicForDive",{pageTitle:"Dive Into",pageTransparentNav:!0}),e.$inject=["$scope","$location","notification","magicForDive"]}(),function(){"use strict";function e(e,t,o,r,n,a){e.title=a.pageTitle,e.siteName=appConfig.siteName,e.siteLanguage=appConfig.siteLanguage,e.description=appConfig.description[appConfig.siteLanguage],e.$watch(function(){return t.path()},function(){var r=t.url().split("/");e.path=""==r[1]?a.pageDefaultWelcomeLabel:r[1],o.ga("send","pageview",{page:t.path()})}),e.googleSignIn=function(){return e.omUser?!1:void gapi.auth.signIn({callback:function(e){e.status.signed_in?n.signIn(e,gapi.auth.getToken(),i):"immediate_failed"!==e.error&&r.generate("There was an error ("+e.error+") during the sign in process.","error")}})},e.googleSignOut=function(){gapi.auth.signOut(),n.signOut({accessToken:e.omUser.accessToken,gPlusId:e.omUser.id},s)};var i=function(t){sessionStorage.setItem("omUser",JSON.stringify(t)),e.omUser=t,r.generate("You are now signed in as "+t.email+".","success")},s=function(t){t?(sessionStorage.removeItem("omUser"),e.omUser=!1,r.generate("You have been successfully signed out.","info")):r.generate("There was an error signing you out.","error")};if(e.setTheme=function(t){e.themeClass=t,localStorage.setItem("themeClass",t)},e.themeClass=localStorage.getItem("themeClass")?localStorage.getItem("themeClass"):"light",e.setUmiFont=function(t){e.umiFontClass=t,localStorage.setItem("umiFontClass",t)},e.umiFontClass=localStorage.getItem("umiFontClass")?localStorage.getItem("umiFontClass"):"umi-font-modern",sessionStorage.getItem("omUser")){var l=sessionStorage.getItem("omUser");e.omUser=JSON.parse(l)}}angular.module("omApp").controller("GlobalController",e).constant("magicForGlobal",{pageTitle:"Page",pageDefaultWelcomeLabel:"dive"}),e.$inject=["$scope","$location","$window","notification","omAuth","magicForGlobal"]}(),function(){"use strict";function e(e,t){function o(o){var r=2500;t.subscribe(function(t){o.notification=t,o.act=!0,e(function(){o.act=!1},r)})}var r={restrict:"EA",templateUrl:"app/sections/section.global/notification.layout.html",scope:{},replace:!0,link:o};return r}angular.module("omApp").directive("notificationDirective",e),e.$inject=["$timeout","notification"]}(),function(){"use strict";function e(e){function t(e){r.push(e)}function o(t,o){var n={message:t,type:o};e.info(n),_.forEach(r,function(e){e(n)})}var r=[];return{subscribe:t,generate:o}}angular.module("omApp").factory("notification",e),e.$inject=["$log"]}(),function(){"use strict";function e(e,t,o){var r=40,n=38,a=13,i=40;e.searchResultsNavigate=function(t,o,i){if(!t)return!1;var s=_.keys(t.data).length,l=t.currentSelection;if(o.keyCode==a)if(o.preventDefault(),"getUmi"==_.first(i)){var c=e.searchResults.data[e.searchResults.currentSelection].uriFriendlyTitle;e.$parent[i](c)}else"autocomplete"==_.first(i)&&e.autocomplete(i[1]);return o.keyCode==n&&l>0?(o.preventDefault(),t.currentSelection=l-1):o.keyCode==r&&s-1>l&&(o.preventDefault(),t.currentSelection=l+1),!1},e.search=function(r,n,a){n&&(e.showAutocomplete=!0);var i=function(t,o){var r=t.split("."),n=_.first(r);return r.length>1?(r.reverse().pop(),i(r.reverse().join("."),e[n])):o?o[n]:e[n]},i=i(r,!1),l=i.length;l>0?(a&&s(l),t.get(appConfig.apiUrl+"/search/"+i).success(function(t){if(t.length>0){var r={currentSelection:0,data:t};e.searchResults=r}else e.searchResults=!1,o.generate("No results found :-(","info")}).error(function(){o.generate("There was an error with the connection to our API.","error")})):e.searchResults=!1},e.autocomplete=function(t,o){var r=e.searchResults,n=o?r.data[o]:r.data[r.currentSelection];if(e.createUmiForm[t]="",e.showAutocomplete=!1,e.searchResults=!1,e.autocompleteData[t])e.autocompleteData[t][n.id]=n.title;else{var a={};a[n.id]=n.title,e.autocompleteData[t]=a}},e.removeUmiId=function(t,o){delete e.autocompleteData[t][o]};var s=function(e){if(i>e){var t=e*(100/i)+"%";document.getElementById("masthead").style.backgroundPositionY=t}}}angular.module("omApp").controller("SearchController",e),e.$inject=["$scope","$http","notification"]}(),function(){"use strict";function e(){var e={restrict:"A",link:function(e,t){t.bind("click",function(e){e.stopPropagation()})}};return e}angular.module("omApp").directive("stopEvent",e)}();