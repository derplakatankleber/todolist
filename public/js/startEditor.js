// import * as sceditor from '../thirdparty/sceditor/sceditor.min.js';
// window.sceditor = sceditor;

export default class htmlEditorC {
    selectorEditor = ".contentText";
    active = false;
    config = {
        plugins: 'undo,plaintext',
        format: 'xhtml',
        //toolbar: 'bold,italic,underline|source',
        toolbarExclude: 'table,horizontalrule,image,email,emoticon,youtube,ltr,rtl',
        emoticonsRoot: '../thirdparty/sceditor/',
        emoticonsEnabled: 'false',
        style: '../thirdparty/sceditor/themes/content/default.min.css',
        id: 'myHtmlEditor',
    };

    getHtmlTextarea() {
        return $(this.selectorEditor);
    }

    startEditor(textareaSelector) {
        if ($(textareaSelector).length > 0) {
            this.selectorEditor = textareaSelector;
        }
        if (this.getHtmlTextarea().length < 1) {
            $(".contentContainer").append("<textarea class='contentText'></textarea>");
        }
        sceditor.create(this.getHtmlTextarea()[0], this.config);
        this.getSCEditorInstance().keyDown(this.shortcutAction);
        this.getSCEditorInstance().keyUp(this.shortcutAction);
        this.active = true;
    }

    shortcutAction(e) {
        let isKeyup = false;
        if (e.type && e.type == "keyup") {
            isKeyup = true;
        }
        if (e.key == "Tab") {
            e.preventDefault();
            e.stopPropagation();
            if (isKeyup && this && typeof this.insertText == "function") {
                //this == sceditorInstance
                this.insert("&nbsp;&nbsp;");
            }
        }
    }

    getHtmlContent() {
        return this.getSCEditorInstance().val();
    }

    getSCEditorInstance() {
        return sceditor.instance(this.getHtmlTextarea()[0]);
    }

    isActive() {
        if (typeof this.getSCEditorInstance() == "undefined") {
            this.active = false;
        }
        return this.active;
    }
};
window.htmlEditor = new htmlEditorC();

export function startEditor() {
    window.htmlEditor.startEditor();
}

export function isActive() {
    window.htmlEditor.isActive();
}

export function getHtmlContent() {
    window.htmlEditor.getHtmlContent();
}