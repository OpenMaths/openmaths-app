app.controller("BoardController",["$scope","$rootScope","$http","$timeout","$routeParams",function(e,t,o,s,n){t.title="Board",t.navTopTransparentClass=!1,e.grid=[],e.rows=sessionStorage.getItem("gridRows")?parseInt(sessionStorage.getItem("gridRows")):3,e.columns=sessionStorage.getItem("gridColumns")?parseInt(sessionStorage.getItem("gridColumns")):3;var r=n.id;for(i=0;i<e.rows;i++){var a=[];for(c=0;c<e.columns;c++)a.push(c);e.grid.push(a)}e.manageGrid=function(t,o){if("row"==o){var s=[];for(i=0;i<e.columns;i++)s.push(i);switch(t){case"add":if(e.rows>5)return!1;e.rows=e.rows+1,e.grid.push(s);break;case"remove":if(e.rows<3)return!1;e.rows=e.rows-1,e.grid.pop()}sessionStorage.setItem("gridRows",e.rows)}else if("column"==o){switch(t){case"add":if(e.columns>5)return!1;for(i=0;i<e.rows;i++)e.grid[i].push(e.columns);e.columns=e.columns+1;break;case"remove":if(e.columns<3)return!1;for(i=0;i<e.rows;i++)e.grid[i].pop();e.columns=e.columns-1}sessionStorage.setItem("gridColumns",e.columns)}};var l=function(t,i,n,r){var a=function(){e.fadeInUmi=!0},l="uriFriendlyTitle"==t?appConfig.apiUrl+"/"+i:appConfig.apiUrl+"/"+t+"/"+i;o.get(l).success(function(t){r&&(t.targetClasses=r),e.grid[n[0]][n[1]]=t,s(a,250)}).error(function(){e.notification={message:"There was an error loading the requested contribution.",type:"error",act:!0},s(function(){e.notification.act=!1},2500)})};l("uriFriendlyTitle",r,[1,1]),e.position=function(e,t,o,i){var s=[];if("up"==o)var n=[e-1,t];else if("down"==o)var n=[e+1,t];else if("left"==o)var n=[e,t-1];else if("right"==o)var n=[e,t+1];0==n[0]?s.push("closes-top"):2==n[0]?s.push("closes-bottom"):0==n[1]?s.push("closes-left"):2==n[1]&&s.push("closes-right"),l("id",i,[n[0],n[1]],s.join(" "))}}]),app.controller("ContributeController",["$scope","$rootScope","$http","$location","$timeout",function(e,t,o,i,s){e.omUser||(alert("You must be logged in to Contribute to OpenMaths!"),i.path("/")),t.title="Contribute",t.navTopTransparentClass=!1,e.errorMessages={required:"This field is required.",maxLength:"This field is exceeding the maximum length of 128 characters.",umiTitle:"The title should only consist of letters, spaces, or hyphens"},e.instructions={type:"What category of information?",title:"Users will be able to search your contribution.",titleSynonyms:"Comma-separated list of alternative names.",latexContent:"The actual content. You are free to use LaTeX (including text-mode macros!!).",prerequisiteDefinitions:"Comma-separated list of valid Titles upon which your contribution depends.",seeAlso:"Comma-separated list of valid Titles which may be related.",tags:"Comma-separated list of tags to help users find your contribution.",dispatch:"Submitting your contribution will create a request to pull the content into our database."},e.umiTypes=[{id:"Definition",label:"Definition"},{id:"Axiom",label:"Axiom"},{id:"Theorem",label:"Theorem"},{id:"Lemma",label:"Lemma"},{id:"Corollary",label:"Corollary"},{id:"Conjecture",label:"Conjecture"},{id:"Proof",label:"Proof"},{id:"HistoricalNote",label:"Historical Note"},{id:"PhilosophicalJustification",label:"Philosophical Justification"},{id:"Diagram",label:"Diagram"},{id:"Example",label:"Example"}],e.createUmi=function(){var t=e.createUmiForm,o={author:e.omUser.email,message:"Initialise UMI",content:t.latexContent,title:t.title,titleSynonyms:t.titleSynonyms?t.titleSynonyms:[],prerequisiteDefinitionIds:t.prerequisiteDefinitions?t.prerequisiteDefinitions:[],seeAlsoIds:t.seeAlso?t.seeAlso:[],tags:t.tags?[t.tags]:[],umiType:t.type.id};console.log(o);var i=new XMLHttpRequest,n="http://127.0.0.1:8080/add",r=JSON.stringify(o);i.open("POST",n,!0),i.setRequestHeader("Content-type","application/json;charset=UTF-8"),i.onload=function(t){console.log(t),e.notification={message:"Your contribution was successfully posted!",type:"success",act:!0},s(function(){e.notification.act=!1},2500)},i.onerror=function(){e.notification={message:"There was an error making the request. Please check your contribution again before posting",type:"error",act:!0},s(function(){e.notification.act=!1},2500)},i.send(r)}}]),app.controller("DiveController",["$scope","$rootScope","$http","$location",function(e,t,o,s){t.title="Dive Into",t.navTopTransparentClass=!0,e.searchUmiKeyDown=function(){var t=e.searchUmiTerm.length,s=2.5*t+"%";40>t&&(document.getElementById("masthead").style.backgroundPositionY=s),t>0?o.get(appConfig.apiUrl+"/search/"+e.searchUmiTerm).success(function(t){var o=100/(t.length+1),s=1;for(i=t.length;--i>=0;){var n=Math.floor(o*s)+"%";t[i].score=n,s+=1}e.searchUmiResults={currentSelection:0,data:t},console.log(e.searchUmiResults)}).error(function(e,t){alert("No data to display :-("),console.log(e+" | "+t)}):e.searchUmiResults=!1},e.getUmi=function(t){return t||e.searchUmiResults?(sessionStorage.setItem("umiLastSearchTitle",e.searchUmiTerm),sessionStorage.setItem("umiLastSearchResults",JSON.stringify(e.searchUmiResults)),void s.path("/board/"+t)):!1}}]),app.controller("FeaturesController",["$scope","$rootScope",function(e,t){t.title="Features",t.navTopTransparentClass=!0}]),app.controller("GlobalController",["$scope","$location","$window","$http","$timeout",function(e,t,o,i,s){function n(){var i=t.url().split("/");e.path=""==i[1]?"dive":i[1],o.ga("send","pageview",{page:t.path()})}if(console.log("OpenMaths is now running"),e.$watch(function(){return t.path()},n),e.setTheme=function(t){e.themeClass=t,localStorage.setItem("themeClass",t)},e.themeClass=localStorage.getItem("themeClass")?localStorage.getItem("themeClass"):"light",e.setUmiFont=function(t){e.umiFontClass=t,localStorage.setItem("umiFontClass",t)},e.umiFontClass=localStorage.getItem("umiFontClass")?localStorage.getItem("umiFontClass"):"umi-font-modern",sessionStorage.getItem("omUser")){var r=sessionStorage.getItem("omUser");e.omUser=JSON.parse(r)}e.googleSignIn=function(){return e.omUser?!1:void gapi.auth.signIn({callback:function(t){if(t.status.signed_in){var o=gapi.auth.getToken();i.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+o.access_token).success(function(t){e.omUser=t,sessionStorage.setItem("omUser",JSON.stringify(t)),e.notification={message:"You are now signed in as "+t.email+".",type:"success",act:!0},s(function(){e.notification.act=!1},2500)}).error(function(){e.notification={message:"There was an error during the sign in process.",type:"error",act:!0},s(function(){e.notification.act=!1},2500)})}else e.notification={message:"There was an error ("+t.error+") during the sign in process.",type:"error",act:!0},s(function(){e.notification.act=!1},2500)}})},e.googleSignOut=function(){gapi.auth.signOut(),e.omUser=!1,sessionStorage.removeItem("omUser"),e.notification={message:"You have been successfully signed out.",type:"info",act:!0},s(function(){e.notification.act=!1},2500)},e.accessUrlUser=function(o,i,n){return e.omUser?void t.url("/"+o):(e.notification={message:i,type:n,act:!0},s(function(){e.notification.act=!1},2500),!1)},e.searchResultsNavigate=function(e,t){if(!e)return!1;var o=Object.keys(e.data).length,i=e.currentSelection;38==t.keyCode&&i>0?e.currentSelection=i-1:40==t.keyCode&&o-1>i&&(e.currentSelection=i+1)}}]),app.controller("OoopsController",["$scope","$rootScope",function(e,t){t.title="Ooops"}]),app.controller("SassController",["$scope","$rootScope","$location",function(e,t){t.title="SASS Library"}]);