function doLogin(){
	
	let email= $(".emailInput").val();
	let pass= $(".passwordInput").val();
	firebase.auth().signInWithEmailAndPassword(email, pass)
	  .then((userCredential) => {
		// Signed in
		alreadyLoggedIn(userCredential.user);
	  })
	  .catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		alert(errorMessage);
	  });
}

function alreadyLoggedIn(user){
	if(user && user.uid){
		window.myapp.user = user;
		$("#useridicon").addClass("auth");
		//hide login menu
		$(".loginfield").addClass("hide");
        $(".passwordInput").val("");
        $(".containerUserEmail").text(window.myapp.user.email);
        $(".loginSuccess").removeClass("hide")
		if(typeof loadIndex == "function"){
			loadIndex();
		}
	}	
}

function logOut(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        $(".loginSuccess").addClass("hide");
        $(".loginfield").removeClass("hide");
        $(".containerUserEmail").text("");
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}

function doLoginOld(){
	var ui = new firebaseui.auth.AuthUI(firebase.auth());
	var uiConfig = {
	  callbacks: {
		signInSuccessWithAuthResult: function(authResult, redirectUrl) {
		  // User successfully signed in.
		  alert("success");
		  // Return type determines whether we continue the redirect automatically
		  // or whether we leave that to developer to handle.
		  return true;
		},
		uiShown: function() {
		  // The widget is rendered.
		  // Hide the loader.
		  document.getElementById('loader').style.display = 'none';
		}
	  },
	  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	  signInFlow: 'redirect', //'popup',
	  signInSuccessUrl: '#success',
	  signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
	],
	  // Terms of service url.
	  //tosUrl: '<your-tos-url>',
	  // Privacy policy url.
	  //privacyPolicyUrl: '<your-privacy-policy-url>'
	};
	ui.start('#firebaseui-auth-container', uiConfig);
}
document.addEventListener('DOMContentLoaded', function() {
	//$("button.loginbutton").on("click", doLogin);
	$("#useridicon").on("click", function(){ 
		$("#firebaseui-auth-container").toggle();
	});
	//const loadEl = document.querySelector('#load');
	// // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
	// // The Firebase SDK is initialized and available here!
	//
	// firebase.auth().onAuthStateChanged(user => { });
	// firebase.database().ref('/path/to/ref').on('value', snapshot => { });
	// firebase.firestore().doc('/foo/bar').get().then(() => { });
	// firebase.functions().httpsCallable('yourFunction')().then(() => { });
	// firebase.messaging().requestPermission().then(() => { });
	// firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
	// firebase.analytics(); // call to activate
	// firebase.analytics().logEvent('tutorial_completed');
	// firebase.performance(); // call to activate
	//
	// // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

	try {
		window.myapp = {};
	  window.app = firebase.app();
	  let features = [
		'auth', 
		'database', 
		'firestore',
		'functions',
		'messaging', 
		'storage', 
		'analytics', 
		'remoteConfig',
		'performance',
	  ].filter(feature => typeof app[feature] === 'function');
	  console.log(`Firebase SDK loaded with ${features.join(', ')}`);
	  
	  firebase.auth();
	  //check if already logged in
	  setTimeout(function(){
		  if(firebase.auth().currentUser){
			  alreadyLoggedIn(firebase.auth().currentUser);
		  }else{
			  console.log("not ready for authentication!");
		  }
	  }, 1000);
	} catch (e) {
	  console.error(e);
	  console.log('Error loading the Firebase SDK, check the console.');
	}	
});