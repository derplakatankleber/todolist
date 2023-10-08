//TODO: check for login and connection
//TODO: flat objects for doc
// import { getFirestore, query, getDocs, collection, doc, getDoc, addDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { getFirestore, query, getDocs, collection, doc, getDoc, addDoc, deleteDoc, setDoc } from './firebase.js';
import * as $ from '../thirdparty/jquery.js';
//import {$,jQuery} from '../thirdparty/jquery.js';
// import flexdatalist from '../thirdparty/flexdatalist/jquery.flexdatalist.min.js'
import htmlEditorC from './startEditor.js'
// import auth from from './auth.js'
import { fbLogger } from "./logFirebase.js";
import { downloader } from './tools.js';


export default class store {
    mycollectionName = "testdb";
    tagItemList = [];
    //db: getFirestore(), //in firebase-docu only called "db"
    db;
    indexMap = {};
    sortObj = {};
    contentDoc;
    internalHtmlEditor;
    #user = "";
    constructor(uid) {
        this.#user = uid;
    }

    initFirestore() {
        if (this.#user == "") {
            alert("Please login to proceed");
            return undefined;
        }
        this.db = getFirestore();
    }

    getHtmlEditor() {
        if (typeof this.internalHtmlEditor == "undefined") {
            this.internalHtmlEditor = new htmlEditorC();
        }
        return this.internalHtmlEditor;
    }
    async loadIndexlist() {
        if (myapp) {
            //this.user.uid
            if (!this.db) {
                this.initFirestore();//db = getFirestore();//in docu only called "db"
            }
            const q = query(collection(this.db, this.mycollectionName));
            const querySnapshot = await getDocs(q);
            this.indexMap = {};
            querySnapshot.forEach((doc) => {
                this.indexMap[doc.id] = doc;
            });
            this.setIndexContainer(this.indexMap);
        }
    }

    getJSONofDocument(docItem) {
        let contentJSON = {};
        try {
            if (docItem.data().doc) {
                contentJSON = JSON.parse(docItem.data().doc);
            } else {
                contentJSON = docItem.data();
            }
        } catch (error) {
            console.error(error);
        }
        contentJSON["id"] = docItem.id;
        return contentJSON;
    }

    setIndexContainer(mapOfDocs) {
        $(".indexContainer .items").empty();
        if (mapOfDocs && myapp) {
            this.sortObj = [];
            for (let key in mapOfDocs) {
                let docItem = mapOfDocs[key];
                let contentJSON = this.getJSONofDocument(docItem);
                let name = contentJSON["id"];
                if (contentJSON["name"]) {
                    name = contentJSON["name"];
                }
                //$(".indexContainer .items").append('<p><a href="javascript:openDocument(\''+docItem.id+'\')" class="doc btn btn-secondary btn-sm stretched-link">'+name+'</a></p>');
                // $(".indexContainer .items").append('<button onclick="mystore.openDocument(\''+docItem.id+'\')" class="btn btn-secondary btn-sm overflow-hidden w-90 text-start" type="button">'+name+'</button>');
                this.sortObj.push({ "id": docItem.id, "name": name, "value": ('<button onclick="mystore.clickEventOpen(event,this)" data-id="' + docItem.id + '" class="btn btn-secondary btn-sm overflow-hidden w-90 text-start" type="button">' + name + '</button>') });
                if (contentJSON["tags"] && contentJSON["tags"].length > 0) {
                    let tagListS = contentJSON["tags"];
                    let tagList = [];
                    if (Array.isArray(tagListS)) {
                        tagList = tagListS;
                    } else {
                        let regEx = /[\s,;]+/;
                        tagList = tagListS.split(regEx);
                    }
                    for (let tag of tagList) {
                        if (!this.tagItemList.includes(tag)) {
                            this.tagItemList.push(tag);
                        }
                    }
                }
            }
            let collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            this.sortObj.sort((a, b) => {
                return collator.compare(a.name, b.name);
            });
            for (let id in this.sortObj) {
                // console.log('bla4: ' + id);
                $(".indexContainer .items").append(this.sortObj[id].value);
            }
        }
    }

    async openDocument(docId) {
        if (docId && myapp) {
            this.clearDocumentView();
            const docRef = doc(this.db, this.mycollectionName, docId);
            const docSnap = await getDoc(docRef);
            this.contentDoc = docSnap;
            //console.log(docSnap.id, " => ", docSnap.data());
            let contentJSON = this.getJSONofDocument(docSnap);
            if (contentJSON["name"] != "undefined") {
                $(".docContainer").append('<p>Documentname: <input type="text" class="contentName" value="' + contentJSON.name + '"></p>');
                //$(".docContainer .contentName").val(contentJSON.name);
                let contentRows = 20;
                if (typeof contentJSON.content === "string") {
                    if (contentJSON.content.split("\n").length > contentRows) {
                        contentRows = contentJSON.content.split("\n").length;
                    }
                }
                let modified = contentJSON["modified"];
                if (!modified) {
                    modified = contentJSON["created"];
                    if (!modified) {
                        modified = new Date().toISOString();
                    }
                }
                $(".docContainer").append("<p>Last saved: " + new Date(modified).toLocaleString() + "</p>");
                $(".docContainer").append('<div class="contentAttributes">');
                $(".contentAttributes").append('<i class="bi bi-three-dots-vertical contentAttributesMoreClick"></i><div class="contentAttributesMore"></div>');
                $(".contentAttributesMore").toggle(false);
                $(".contentAttributesMoreClick").on("click", function () { $(".contentAttributesMore").toggle(); });
                let keys = Object.keys(contentJSON);
                $(keys).each(function (index, key) {
                    if (key === "name" || key === "content") {
                        return;
                    }
                    if (key === "tags") {
                        $(".contentAttributes").prepend('<p class="">Tags: <input type="text" class="contentTags" placeholder="tags" list="contentTagList"  multiple="multiple"></p>');
                    } else {
                        $(".contentAttributesMore").append('<span>' + key + ': ' + contentJSON[key] + '<br></span>');
                    }
                });
                $(".docContainer").append('<datalist id="contentTagList"></datalist>');
                let tagItems = "";
                if (this.tagItemList && Array.isArray(this.tagItemList)) {
                    $(this.tagItemList).each(function (index, tagItem) {
                        tagItems += '<option value="' + tagItem + '">';
                    });
                }
                $("#contentTagList").append(tagItems);
                $(".docContainer").append('</div>');
                //$(".contentTags").flexdatalist();
                $(".docContainer").append('<textarea class="contentText" rows="' + contentRows + '">' + contentJSON.content + '</textarea>');
                if ($(".contentTags").length > 0) {
                    // $('.contentTags').multiselect({
                    //     includeSelectAllOption: true,
                    //     enableFiltering: true,
                    //     enableCaseInsensitiveFiltering: true,
                    //     filterPlaceholder:'Search Here..'
                    //     });
                }
            }
            if ($(".docContainer").children().length < 1) {
                $(".docContainer").append('<p>Documentname: ' + docSnap.id + '</p>');
                let keys = Object.keys(contentData);
                $(keys).each(function (index, key) {
                    $(".docContainer").append('<p>' + key + ': ' + contentData[key] + '</p>');
                });
            }
            this.setContentEvents(contentJSON);
            //<textarea class="contentName">myname</textarea><div class="contentAttributes"></div><textarea class="contentText" rows="2">StringString
            //StringString</textarea>

        }
    }

    setContentEvents(contentJSON) {
        //check for note or todo
        if (contentJSON && contentJSON["type"] == "note" && typeof this.getHtmlEditor().startEditor !== "undefined") {
            this.getHtmlEditor().startEditor('textarea.contentText');
        } else {
            //expandable textbox for contentData.contentText
            $('textarea.contentText').on('keydown input', function () {
                //Auto-expanding textarea
                this.style.removeProperty('height');
                this.style.height = (this.scrollHeight + 2) + 'px';
            }).on('mousedown focus', function () {
                //Do this on focus, to allow textarea to animate to height...
                this.style.removeProperty('height');
                this.style.height = (this.scrollHeight + 2) + 'px';
            });
        }
    }
    getDocumentContent() {
        if (this.getHtmlEditor().isActive()) {
            return this.getHtmlEditor().getHtmlContent();
        } else {
            return $(".contentText").val();
        }
    }

    async saveDocument() {
        let mydoc = {};
        let id = "";
        if (this.contentDoc && this.contentDoc.id) {
            let reloadIndex = false;
            //existing object
            id = this.contentDoc.id;
            //copy attributes
            mydoc = this.getJSONofDocument(this.contentDoc);
            let doctitle = $(".contentName").val();
            if (mydoc.name !== doctitle) {
                reloadIndex = true;
            }
            mydoc.name = doctitle;
            mydoc.content = this.getDocumentContent();
            mydoc.lastaccess = new Date().toISOString();
            mydoc.modified = new Date().toISOString();
            if ($("input.contentTags").length > 0 && $("input.contentTags")[0].value.length > 0) {
                mydoc.tags = $("input.contentTags")[0].value.split(",");
            }
            try {
                await setDoc(doc(this.db, this.mycollectionName, id), mydoc);
                console.log("Document successfully written!");
                this.showMessage("Saved: '" + doctitle + "'");
                fbLogger("saveItem", "User:'" + this.#user + "' Item:'" + id + "'");
                if (reloadIndex) {
                    this.loadIndexlist();
                }
            } catch (error) {
                console.error("Error writing document: ", error);
            }
        } else {
            //new object
            let name = "_newDocument";
            if ($(".contentName").val()) { name = $(".contentName").val(); }
            mydoc.name = name;
            let content = this.getDocumentContent();
            if (typeof content === "undefined")
                content = "";
            mydoc.content = content;
            mydoc.lastaccess = new Date().toISOString();
            mydoc.modified = new Date().toISOString();
            mydoc.created = new Date().toISOString();
            mydoc.owner = this.#user;
            mydoc.type = "note";
            mydoc.tags = [];
            try {
                let docRef = await addDoc(collection(this.db, this.mycollectionName), mydoc);
                console.log("Document written with ID: ", docRef.id);
                this.showMessage("Saved: '" + docRef.id + "'");
                fbLogger("saveItem", "User:'" + this.#user + "' Item:'" + id + "'");
                this.contentDoc = docRef;
                this.reopenSelectedDocument();
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    }
    reopenSelectedDocument() {
        this.loadIndexlist();
        this.openDocument(mystore.contentDoc.id);
    }

    newDocument() {
        if (this.contentDoc && this.contentDoc.id) {
            this.contentDocOld = this.contentDoc;
            this.contentDoc = undefined;
        }
        this.saveDocument();
    }

    deleteDocument() {
        if (this.contentDoc.id && this.contentDoc) {
            deleteDoc(doc(this.db, this.mycollectionName, this.contentDoc.id)).then(() => {
                console.log("Document successfully deleted!");
                this.showMessage("Deleted: '" + this.contentDoc.id + "'");
                fbLogger("saveItem", "User:'" + this.#user + "' Item:'" + this.contentDoc.id + "'");
                //clear doc view
                this.clearDocumentView();
                //reload doc index
                this.loadIndexlist();
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    }

    clearDocumentView() {
        $(".docContainer").empty();
    }

    downloadDoc() {
        if (this.contentDoc.id && this.contentDoc && downloader) {
            let doc = this.getJSONofDocument(this.contentDoc);
            new downloader().downloadJSON(JSON.stringify(doc), doc.name);
        }
    }

    uploadDoc() {
        // if (document.querySelector("#uploadFileDia")) {
        //     let elem = document.querySelector("#uploadFileDia");
        //     elem.parentElement.remove(elem);
        // }
        // // const inputForm = document.createElement("form");
        // const input = document.createElement("input");
        // input.tpye = "file";
        // input.id = "uploadFileDia";
        // input.style = "display:none;";
        // // inputForm.append(input);
        // document.body.append(input);
        let input = document.querySelector(".uploadFileDia");
        input.onchange = (event) => {
            const selectedFile = input.files[0];
            console.log(selectedFile);
            var reader = new FileReader();
            reader.addEventListener(
                "load",
                () => {
                    // this will then display a text file
                    console.log(reader.result);
                },
                false,
            );

            if (selectedFile) {
                reader.readAsText(selectedFile);
            }
            // document.body.remove(input);
        }
        // form.onsubmit = e => {
        //     e.preventDefault();
        //     const fd = new FormData();
        //     const props = {};
        //     for (let element of form.elements) {
        //         if (element.type !== "submit") {
        //             props[element.name] = element.value;
        //             fd.append(element.name, element.value);
        //         }
        //     }

        //     for (let [key, prop] of fd) {
        //         console.log(key, prop)
        //     }

        //     const json = JSON.stringify(props);
        //     console.log(json);
        // }
        // const openFileDialog = () => {
        //     document.querySelector("#uploadFileDia").click();
        // }
        // openFileDialog();
    }

    showMessage(msg) {
        console.log(msg);
        if (tools && tools.message && tools.message.showDefault) {
            tools.message.showDefault(msg, 10);
        }
    }

    clickEventOpen(e, htmlelement) {
        //event to open a document in the contentarea or in a neq window
        console.log("open: " + e);
        let docid = "";
        if (htmlelement && htmlelement.getAttribute("data-id") && mystore) {
            docid = htmlelement.getAttribute("data-id");
            if (e && (e.shiftKey || e.ctrlKey)) {
                console.log("open page " + docid);
                let url = new URL(location.href);
                url.hash = "";
                url.search = "";
                url.searchParams.set("docid", docid);
                window.open(url, "_blank");
                return;
            }
            mystore.openDocument(docid);
        }
    }
};


export function loadIndex(userid, docid) {
    window.mystore = new store(userid);
    window.mystore.loadIndexlist();
    if (docid) {
        window.mystore.openDocument(docid);
    }
}


//merge mystore object
// if(window.mystore){
// window.mystore={
// ...window.mystore,
// ...mystore
// }
// }else{
// window.mystore=mystore;
// }
