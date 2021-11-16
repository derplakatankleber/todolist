window.htmlEditor = {
    selectorEditor: ".contentText",
    active: false,
    config: "",
    
    getHtmlTextarea: function(){
        return $(this.selectorEditor);
    },
    
    startEditor: function (textareaSelector){
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
        active = true;
    },

    getHtmlContent: function (){
        return sceditor.instance(this.getHtmlTextarea()[0]).val();
    },
    
    isActive: function(){
        return active;
    },
};