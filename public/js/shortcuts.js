export class shortcuts {

    shortcutAction(e) {
        let isKeyup = false;
        if (e.type && e.type == "keyup") {
            isKeyup = true;
        }
        // if (e.key == "m") {
        //     alert("M key was pressed");
        // } else 
        if (e.ctrlKey) {
            if (e.key == "s") {
                if (mystore && typeof mystore.saveDocument == "function") {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isKeyup)
                        mystore.saveDocument();
                }
            } else if (e.key == "n") {
                if (mystore && typeof mystore.newDocument == "function") {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isKeyup)
                        mystore.newDocument();
                }
            } else if (e.key == "l") {
                if (myapp && typeof myapp.login == "function") {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isKeyup)
                        myapp.login();
                }
            } else if (e.altKey && e.shiftKey && e.key == "U") {
                alert("Ctrl + Alt + Shift + U shortcut combination was pressed");
            }
        }
        // if (e.key == "Tab") {
        //     e.preventDefault();
        //     e.stopPropagation();
        // }
    }
    addShortcut() {
        document.onkeydown = this.shortcutAction;
        document.onkeyup = this.shortcutAction;
    }
}