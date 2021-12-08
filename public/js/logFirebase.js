import { getAnalytics, logEvent } from "firebase/analytics";

// https://firebase.google.com/docs/reference/js/analytics#logeventexport 
export function fbLogger(eventName, messageObj){
    logEvent(getAnalytics(), 
        eventName, //eventName (special cases in docu)
        messageObj            
    );
}


