import { getAnalytics, logEvent } from "firebase/analytics";

// https://firebase.google.com/docs/reference/js/analytics#logeventexport 
// 'add_payment_info' | 'add_shipping_info' | 'add_to_cart' | 'add_to_wishlist' 
// 'begin_checkout' | 'checkout_progress' | 'exception' | 'generate_lead' | 'login' 
// 'page_view' | 'purchase' | 'refund' | 'remove_from_cart' | 'screen_view' | 'search' 
// 'select_content' | 'select_item' | 'select_promotion' | 'set_checkout_option' | 'share' 
// 'sign_up' | 'timing_complete' | 'view_cart' | 'view_item' | 'view_item_list' | 'view_promotion' | 'view_search_results';

export function fbLogger(eventName, messageObj){
    logEvent(getAnalytics(), 
        eventName, //eventName (special cases in docu)
        messageObj            
    );
}


