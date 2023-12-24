export class terms {
    setTermsCookie() {
        document.cookie = "__session_terms=accepted;max-age=31536000;samesite=strict;secure;path=/;";
        alert("to start");
    }

    closeTab() {
        // not allowed
        // window.close();
    }
}
window.myterms = new terms();
window.setTermsCookie = myterms.setTermsCookie;
window.closeTab = myterms.closeTab;