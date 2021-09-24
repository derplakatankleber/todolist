function loadIndex(){
	if(app && myapp){
		//myapp.user.uid
		if(!myapp.firestore){
			myapp.firestore = firebase.firestore();
		}
		myapp.firestore.collection("testdb").get().then((querySnapshot) => {
			//querySnapshot.forEach((doc) => {
			//	console.log(`${doc.id} => ${doc.data()}`);
			//	console.log(`${doc.data().text1}`);
			//});
			window.list = [];
			$(querySnapshot.docs).each(function( index, doc ) {
				list.push(doc.id)
			});
			setIndexContainer(list);
		});
	}
}

function setIndexContainer(listOfDocs){
	$(".indexContainer").empty();
	if(listOfDocs){
		$(listOfDocs).each(function( index, docItem ) {
			$(".indexContainer").append('<li><a href="javascript:openDocument(\''+docItem+'\')" class="doc">'+docItem+'</a></li>');
		});
	}
}

function openDocument(docId){
	$(".docContainer").empty();
	if(docId && app && myapp && myapp.firestore){
		myapp.firestore.collection("testdb").doc(docId).get()
		.then((doc) => { 
			console.log(doc.id, " => ", doc.data());
			let contentData = doc.data();
			$(".docContainer").append('<p>Documentnumber: '+ doc.id +'</p>');
			let keys = Object.keys(contentData);
			$(keys).each(function( index, key ) {
				$(".docContainer").append('<p>'+key+': '+ contentData[key] +'</p>');
			});

		});

	}
}

document.addEventListener('DOMContentLoaded', function() {

	$(".jsonloader").on("click", loadIndex);
});