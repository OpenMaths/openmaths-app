app.controller("BoardController",["$scope","$rootScope","$http","$timeout","$routeParams",function(e,t,o,a,s){t.title="Board",t.navTopTransparentClass=!1,e.grid=[],e.rows=sessionStorage.getItem("gridRows")?parseInt(sessionStorage.getItem("gridRows")):3,e.columns=sessionStorage.getItem("gridColumns")?parseInt(sessionStorage.getItem("gridColumns")):3;var n=s.id;for(i=0;i<e.rows;i++){var r=[];for(c=0;c<e.columns;c++)r.push(c);e.grid.push(r)}e.manageGrid=function(t,o){if("row"==o){var a=[];for(i=0;i<e.columns;i++)a.push(i);switch(t){case"add":if(e.rows>5)return!1;e.rows=e.rows+1,e.grid.push(a);break;case"remove":if(e.rows<3)return!1;e.rows=e.rows-1,e.grid.pop()}sessionStorage.setItem("gridRows",e.rows)}else if("column"==o){switch(t){case"add":if(e.columns>5)return!1;for(i=0;i<e.rows;i++)e.grid[i].push(e.columns);e.columns=e.columns+1;break;case"remove":if(e.columns<3)return!1;for(i=0;i<e.rows;i++)e.grid[i].pop();e.columns=e.columns-1}sessionStorage.setItem("gridColumns",e.columns)}};var l=function(t,i,s,n){var r=function(){e.fadeInUmi=!0},l="uriFriendlyTitle"==t?appConfig.apiUrl+"/"+i:appConfig.apiUrl+"/"+t+"/"+i;o.get(l).success(function(t){n&&(t.targetClasses=n),e.grid[s[0]][s[1]]=t,a(r,250)}).error(function(){e.$parent.notification={message:"There was an error loading the requested contribution.",type:"error",act:!0},a(function(){e.$parent.notification.act=!1},2500)})};l("uriFriendlyTitle",n,[1,1]),e.position=function(e,t,o,i){var a=[];if("up"==o)var s=[e-1,t];else if("down"==o)var s=[e+1,t];else if("left"==o)var s=[e,t-1];else if("right"==o)var s=[e,t+1];0==s[0]?a.push("closes-top"):2==s[0]?a.push("closes-bottom"):0==s[1]?a.push("closes-left"):2==s[1]&&a.push("closes-right"),l("id",i,[s[0],s[1]],a.join(" "))}}]),app.controller("ContributeController",["$scope","$rootScope","$http","$location","$timeout","$routeParams",function(e,t,o,i,a,s){if(e.omUser||(alert("You must be logged in to Contribute to OpenMaths!"),i.path("/")),t.title="Contribute",t.navTopTransparentClass=!1,e.autocompleteData={},s.edit){var n=s.edit.split(":");"edit"!==n[0]&&i.path("/contribute"),o.get(appConfig.apiUrl+"/"+n[1]).success(function(o){e.editUmiData=o,t.title=e.editUmiData.title.title,e.createUmiForm={type:{id:o.umiType,label:o.umiType},title:o.title.title,titleSynonyms:o.titleSynonyms,latexContent:o.latexContent,seeAlso:o.seeAlso,tags:o.tags}}).error(function(){e.$parent.notification={message:"There was an error loading the requested contribution.",type:"error",act:!0},a(function(){e.$parent.notification.act=!1},2500)})}e.errorMessages={required:"This field is required.",maxLength:"This field is exceeding the maximum length of 128 characters.",umiTitle:"The title should only consist of letters, spaces, or hyphens"},e.instructions={type:"What category of information?",title:"Users will be able to search your contribution.",titleSynonyms:"Comma-separated list of alternative names.",latexContent:"The actual content. You are free to use LaTeX (including text-mode macros!!).",prerequisiteDefinitions:"Comma-separated list of valid dependency Titles.",seeAlso:"Comma-separated list of valid Titles which may be related.",tags:"Comma-separated list of tags to help users find your contribution.",dispatch:"Submitting your contribution will create a request to pull the content into our database."},e.umiTypes=[{id:"Definition",label:"Definition"},{id:"Axiom",label:"Axiom"},{id:"Theorem",label:"Theorem"},{id:"Lemma",label:"Lemma"},{id:"Corollary",label:"Corollary"},{id:"Conjecture",label:"Conjecture"},{id:"Proof",label:"Proof"},{id:"HistoricalNote",label:"Historical Note"},{id:"PhilosophicalJustification",label:"Philosophical Justification"},{id:"Diagram",label:"Diagram"},{id:"Example",label:"Example"}],e.createUmi=function(){if(e.showSearchResults)return e.assignUmiId(e.showSearchResults,!1),!1;var t=e.createUmiForm,o={author:e.omUser.email,message:"Initialise UMI",umiType:t.type.id,title:t.title,titleSynonyms:t.titleSynonyms?r(t.titleSynonyms):[],content:t.latexContent,prerequisiteDefinitionIds:e.autocompleteData.prerequisiteDefinitions?_.keys(e.autocompleteData.prerequisiteDefinitions):[],seeAlsoIds:e.autocompleteData.seeAlso?_.keys(e.autocompleteData.seeAlso):[],tags:t.tags?r(t.tags):[]};if(e.editUmiData)var i={umiId:e.editUmiData.id,author:e.omUser.email,message:"Update UMI",newLatex:t.latexContent};var s=e.editUmiData?i:o,n=e.editUmiData?["PUT","update-latex"]:["POST","add"],l=new XMLHttpRequest,c="http://127.0.0.1:8080/"+n[1],u=JSON.stringify(s);l.open(n[0],c,!0),l.setRequestHeader("Content-type","application/json;charset=UTF-8"),l.onreadystatechange=function(){4!=l.readyState?(e.$parent.notification={message:"Your contribution was successfully posted!",type:"success",act:!0},a(function(){e.$parent.notification.act=!1},2500)):(e.$parent.notification={message:"There was an error ("+l.status+") making the request. Please check your contribution again before posting",type:"error",act:!0},a(function(){e.$parent.notification.act=!1},2500))},l.send(u)};var r=function(e){var t=e.split(",");return _.map(t,function(e){return e.trim()})}}]),app.controller("DiveController",["$scope","$rootScope","$http","$location",function(e,t,o,i){t.title="Dive Into",t.navTopTransparentClass=!0,e.getUmi=function(t){return t||e.searchUmiResults?(sessionStorage.setItem("umiLastSearchTitle",e.searchUmiTerm),sessionStorage.setItem("umiLastSearchResults",JSON.stringify(e.searchUmiResults)),void i.path("/board/"+t)):!1}}]),app.controller("FeaturesController",["$scope","$rootScope",function(e,t){t.title="Features",t.navTopTransparentClass=!0}]),app.controller("GlobalController",["$scope","$location","$window","$http","$timeout",function(e,t,o,i,a){function s(){var i=t.url().split("/");e.path=""==i[1]?"dive":i[1],o.ga("send","pageview",{page:t.path()})}if(console.log("OpenMaths is now running"),e.$watch(function(){return t.path()},s),e.setTheme=function(t){e.themeClass=t,localStorage.setItem("themeClass",t)},e.themeClass=localStorage.getItem("themeClass")?localStorage.getItem("themeClass"):"light",e.setUmiFont=function(t){e.umiFontClass=t,localStorage.setItem("umiFontClass",t)},e.umiFontClass=localStorage.getItem("umiFontClass")?localStorage.getItem("umiFontClass"):"umi-font-modern",sessionStorage.getItem("omUser")){var n=sessionStorage.getItem("omUser");e.omUser=JSON.parse(n)}e.googleSignIn=function(){return e.omUser?!1:void gapi.auth.signIn({callback:function(t){if(t.status.signed_in){var o=gapi.auth.getToken();i.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+o.access_token).success(function(t){e.omUser=t,sessionStorage.setItem("omUser",JSON.stringify(t)),e.notification={message:"You are now signed in as "+t.email+".",type:"success",act:!0},a(function(){e.notification.act=!1},2500)}).error(function(){e.notification={message:"There was an error during the sign in process.",type:"error",act:!0},a(function(){e.notification.act=!1},2500)})}else e.notification={message:"There was an error ("+t.error+") during the sign in process.",type:"error",act:!0},a(function(){e.notification.act=!1},2500)}})},e.googleSignOut=function(){gapi.auth.signOut(),e.omUser=!1,sessionStorage.removeItem("omUser"),e.notification={message:"You have been successfully signed out.",type:"info",act:!0},a(function(){e.notification.act=!1},2500)},e.accessUrlUser=function(o,i,s){return e.omUser?void t.url("/"+o):(e.notification={message:i,type:s,act:!0},a(function(){e.notification.act=!1},2500),!1)}}]),app.controller("OoopsController",["$scope","$rootScope",function(e,t){t.title="Ooops"}]),app.controller("SassController",["$scope","$rootScope","$location",function(e,t){t.title="SASS Library"}]),app.controller("SearchController",["$scope","$http",function(e,t){e.searchResultsNavigate=function(e,t){if(!e)return!1;var o=_.keys(e.data).length,i=e.currentSelection;return 38==t.keyCode&&i>0?(t.preventDefault(),e.currentSelection=i-1):40==t.keyCode&&o-1>i&&(t.preventDefault(),e.currentSelection=i+1),!1},e.search=function(o,i){i&&(e.showAutocomplete=!0);var a=function(t,o){var i=t.split("."),s=_.first(i);return i.length>1?(i.reverse().pop(),a(i.reverse().join("."),e[s])):o?o[s]:e[s]},a=a(o,!1),s=a.length;s>0?t.get(appConfig.apiUrl+"/search/"+a).success(function(t){if(t.length>0){var o={currentSelection:0,data:t};console.log(t),e.searchResults=o}else e.searchResults=!1}).error(function(e,t){alert("No data to display :-("),console.log(e+" | "+t)}):e.searchResults=!1},e.autocomplete=function(t,o){var i=e.searchResults,a=o?i.data[o]:i.data[i.currentSelection];if(e.createUmiForm[t]="",e.showAutocomplete=!1,e.autocompleteData[t])e.autocompleteData[t][a.id]=a.title;else{var s={};s[a.id]=a.title,e.autocompleteData[t]=s}},e.removeUmiId=function(t,o){delete e.autocompleteData[t][o]}}]);