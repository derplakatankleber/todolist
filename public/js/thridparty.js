//import {$,jQuery} from '../thirdparty/jquery.js';
import '../thirdparty/jquery.js';
window.jQuery = $;
window.$ = $;
import '../thirdparty/bootstrap/bootstrap.min.js';
import '../thirdparty/sceditor/sceditor.min.js';
// window.bootstrap=bootstrap;
window.sceditor=sceditor;
 // import * as firebase from '../__/firebase/9.4.1/firebase-app.js';
// import('../__/firebase/9.4.1/firebase-app.js)'.then((firebase) => {
//let firebase = await import('../__/firebase/9.4.1/firebase-app.js');
// window.firebase = firebase;
// window.app = {};
// window.app.firebase= firebase;
// import * as auth from '../__/firebase/9.4.1/firebase-auth.js';
// window.app.auth = auth;
// import * as firestore from '../__/firebase/9.4.1/firebase-firestore.js';
// window.app.firestore = firestore;
// init ist kein module
// import * as init from '../__/firebase/init.js'

import * as startEditor from './startEditor.js';
import "./auth.js";
import "./firestore.js";
import "./draggable.js";
import "./indexFilter.js";


let thirdpartyloader ={
    
    initFirebase: function(){
        if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
        let firebaseApp= firebase.initializeApp({
          "apiKey": "AIzaSyDH2ybDlG-HotE7zNOePMJCthCW8yDiV8o",
          "appId": "1:703188787019:web:9c690231ac28e64d5652ce",
          "authDomain": "todo-android-app-870ee.firebaseapp.com",
          "databaseURL": "https://todo-android-app-870ee.firebaseio.com",
          "measurementId": "G-5B2QXEMKFX",
          "messagingSenderId": "703188787019",
          "projectId": "todo-android-app-870ee",
          "storageBucket": "todo-android-app-870ee.appspot.com"
        });
        window.app3=firebaseApp;
        window.app2={};
       // let db = app.firestore.initializeFirestore(firebaseApp);
        //let db = app.firestore.getFirestore(firebaseApp);
        //app2=db;
        app2.auth = app.auth.getAuth(firebaseApp);

    },

 loadJavascriptFile: function(targeturl, success){

    requirejs([targeturl], function(bla) {
       console.log("Script loaded. " + targeturl);
       if(success && typeof success =="function"){
           success();
       }
    }, function (err) {
        //The errback, error callback
        //The error has a list of modules that failed
        var failedId = err.requireModules && err.requireModules[0];
        console.log("error " + failedId);
        console.error(err);
    });	
},
 setRequireConfig: function(){
    requirejs.config({
        paths: {
            'bootstrap': '../thirdparty/bootstrap/bootstrap.min',
            'jquery': '../thirdparty/jquery',
            'flexdatalist': '../thirdparty/flexdatalist/jquery.flexdatalist.min',
            'sceditor': '../thirdparty/sceditor/sceditor.min',
            'popper': '../thirdparty/popper',
            'fire': '../__/firebase/8.9.0',
            'firebase-app': 'fire/firebase-app',
            'firebase-app2': '../__/firebase/8.9.0/firebase-app',
            '@fire.auth': '../__/firebase/8.9.0/firebase-auth',
            '@fire.store': '../__/firebase/8.9.0/firebase-firestore',
            '@fire.init': '../__/firebase/init'
            
            
        },
        "shim" : {
            "@fire.auth":["firebase-app"],
            "@fire.store":["firebase-app"],
            "@fire.init":["firebase-app","@fire.auth","@fire.store"],
            "bootstrap" : ["jquery"],
            "flexdatalist" : ["jquery"],
            "startEditor" : ["jquery","sceditor","flexdatalist"],
            "auth": ["@fire.auth"],
            "firestore": ["@fire.store"],
            "firething":{
                deps: ['../__/firebase/8.10.0/firebase-app'],
                //Once loaded, use the global 'Backbone' as the
                //module value.
                exports: 'firebase'
            },
        }
    });
}
//loadJavascriptFile("sceditor");	
//loadJavascriptFile("flexdatalist");
//loadJavascriptFile("bootstrap");
// define("initBootstrap", ["popper"], function(popper) {
    // // set popper as required by Bootstrap
    // window.Popper = popper;
    // require(["bootstrap"], function(bootstrap) {
        // // do nothing - just let Bootstrap initialise itself
    // });
// });

//requirejs(['auth','firestore','draggable','indexFilter','startEditor']);
    // <script src="./js/auth.js"></script>
	// <script src="./js/firestore.js"></script>
	// <script src="./js/draggable.js"></script>
	// <script src="./js/indexFilter.js"></script>
    // <script src="./js/startEditor.js"></script>
//firebase 9 uses export/import modules - don't use it now
// requirejs(['../__/firebase/8.9.0/firebase-app'], function (firebase) {
    // window.firebase = firebase;
    // console.log("bla");
// })
};
console.log("hier");
//thirdpartyloader.myapp = myapp;
window.thirdpartyloader = thirdpartyloader;
export default thirdpartyloader
