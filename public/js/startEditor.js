// import * as sceditor from '../thirdparty/sceditor/sceditor.min.js';
// window.sceditor = sceditor;

export default class htmlEditorC{
    selectorEditor= ".contentText";
    active= false;
    config= "";
    
    getHtmlTextarea(){
        return $(this.selectorEditor);
    }
    
    startEditor(textareaSelector){
        if($(textareaSelector).length > 0){
            this.selectorEditor = textareaSelector;
        }
        if(this.getHtmlTextarea().length < 1){
            $(".contentContainer").append("<textarea class='contentText'></textarea>");
        }
        sceditor.create(this.getHtmlTextarea()[0], {
            format: 'xhtml',
            style: '../sceditor/themes/content/default.min.css'
        });
        this.active = true;
    }

    getHtmlContent(){
        return sceditor.instance(this.getHtmlTextarea()[0]).val();
    }
    
    isActive(){
        if(typeof sceditor.instance(this.getHtmlTextarea()[0]) == "undefined"){
            this.active=false;
        }
        return this.active;
    }
};
window.htmlEditor= new htmlEditorC();

export function startEditor(){
    window.htmlEditor.startEditor();
}

export function isActive(){
    window.htmlEditor.isActive();
}

export function getHtmlContent(){
    window.htmlEditor.getHtmlContent();
}