//TODO: check for login and connection
//TODO: flat objects for doc
var mycollectionName = "testdb";

function loadIndex(){
    if(app && myapp){
        //myapp.user.uid
        if(!myapp.firestore){
            myapp.firestore = firebase.firestore();
        }
        myapp.firestore.collection(mycollectionName).get().then((querySnapshot) => {
            //querySnapshot.forEach((doc) => {
            //	console.log(`${doc.id} => ${doc.data()}`);
            //	console.log(`${doc.data().text1}`);
            //});
            myapp.indexMap = {};
            $(querySnapshot.docs).each(function( index, doc ) {
                myapp.indexMap[doc.id]=doc;
            });
            setIndexContainer(myapp.indexMap);
        });
    }
}

function getJSONofDocument(docItem){
    let contentJSON = {};
    try{
        if(docItem.data().doc){
            contentJSON = JSON.parse(docItem.data().doc);
        } else{
            contentJSON = docItem.data();
        }
    }catch(error){
        console.error(error);
    }
    contentJSON["id"]= docItem.id;
    return contentJSON;
}

function setIndexContainer(mapOfDocs){
    $(".indexContainer .items").empty();
    if(mapOfDocs){
        for (let key in mapOfDocs) {
            let docItem = mapOfDocs[key];
            let contentJSON = getJSONofDocument(docItem);
            let name = contentJSON["id"];
            if(contentJSON["name"]){
                name = contentJSON["name"];
            }
            $(".indexContainer .items").append('<p><a href="javascript:openDocument(\''+docItem.id+'\')" class="doc">'+name+'</a></p>');
        }
    }
}
function logError(error){
    console.error(error);
}

function openDocument(docId){
    clearDocumentView();
    if(docId && app && myapp && myapp.firestore){
        myapp.firestore.collection(mycollectionName).doc(docId).get()
        .then((doc) => {
            myapp.contentDoc =doc;
            //console.log(doc.id, " => ", doc.data());
            let contentJSON = getJSONofDocument(doc);
            if(contentJSON["name"] != "undefined"){
                $(".docContainer").append('<p>Documentname: <input type="text" class="contentName" value="'+ contentJSON.name +'"></p>');
                //$(".docContainer .contentName").val(contentJSON.name);
                let contentRows= 20;
                if(typeof contentJSON.content === "string"){
                    if(contentJSON.content.split("\n").length > contentRows){
                        contentRows = contentJSON.content.split("\n").length;
                    }
                }
                $(".docContainer").append('<textarea class="contentText" rows="' + contentRows + '">'+ contentJSON.content+'</textarea>');
                $(".docContainer").append('<div class="contentAttributes">');
                let keys = Object.keys(contentJSON);
                $(keys).each(function( index, key ) {
                    if(key === "name" || key === "content"){
                        return;
                    }
                    $(".docContainer").append('<p>'+key+': '+ contentJSON[key] +'</p>');
                });
                $(".docContainer").append('</div>')
            }
            if($(".docContainer").children().length < 1){
                $(".docContainer").append('<p>Documentname: '+ doc.id +'</p>');
                let keys = Object.keys(contentData);
                $(keys).each(function( index, key ) {
                    $(".docContainer").append('<p>'+key+': '+ contentData[key] +'</p>');
                });
            }
            setContentEvents();
//<textarea class="contentName">myname</textarea><div class="contentAttributes"></div><textarea class="contentText" rows="2">StringString
//StringString</textarea>
        });

    }
}

function setContentEvents(){
    //expandable textbox for contentData.contentText
    $('textarea.contentText').on('keydown input', function() {
      //Auto-expanding textarea
      this.style.removeProperty('height');
      this.style.height = (this.scrollHeight+2) + 'px';
    }).on('mousedown focus', function() {
      //Do this on focus, to allow textarea to animate to height...
      this.style.removeProperty('height');
      this.style.height = (this.scrollHeight+2) + 'px';
    });
}

function saveDocument(callbackSuccess){
    let mydoc ={};
    let id = "";
    if(myapp.contentDoc && myapp.contentDoc.id){
        //existing object
        id = myapp.contentDoc.id;
        //copy attributes
        mydoc = getJSONofDocument(myapp.contentDoc);
        mydoc.name = $(".contentName").val();
        mydoc.content = $(".contentText").val();
        mydoc.lastaccess = new Date().toISOString();
        mydoc.modified = new Date().toISOString();
        myapp.firestore.collection(mycollectionName).doc(id).set(
            mydoc
        )
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }else{
        //new object
        let name ="";
        if( $(".contentName").val()){name = $(".contentName").val();}
        mydoc.name = name;
        let content="";
        if( $(".contentText").val()){name = $(".contentText").val();}
        mydoc.content = content;
        mydoc.lastaccess = new Date().toISOString();
        mydoc.modified = new Date().toISOString();
        mydoc.created = new Date().toISOString();
        mydoc.owner = myapp.user.uid;
        mydoc.type = "note";
        mydoc.tags = [];
        myapp.firestore.collection(mycollectionName).add(
            mydoc
        )
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            myapp.contentDoc = docRef;
            callbackSuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    }
}
function reopenSelectedDocument(){
    loadIndex();
    openDocument(myapp.contentDoc.id);
}

function newDocument(){
    if(myapp.contentDoc && myapp.contentDoc.id){
        myapp.contentDocOld = myapp.contentDoc;
        myapp.contentDoc = undefined;
    }
    saveDocument(reopenSelectedDocument);
}

function deleteDocument(){
    if(myapp.contentDoc.id && myapp.contentDoc){
        myapp.firestore.collection(mycollectionName).doc(myapp.contentDoc.id).delete().then(() => {
            console.log("Document successfully deleted!");
            //clear doc view
            clearDocumentView();
            //reload doc index
            loadIndex();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}

function clearDocumentView(){
    $(".docContainer").empty();
}

document.addEventListener('DOMContentLoaded', function() {
    $(".jsonloader").on("click", loadIndex);
});