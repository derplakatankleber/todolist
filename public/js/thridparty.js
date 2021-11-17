function loadJavascriptFile(targeturl, success){
    // $.getScript(targeturl, function( data, textStatus, jqxhr ) {
       // console.log("Script loaded. " + targeturl);
       // if(success && typeof success =="function"){
           // success();
       // }
    // });	
    // $("head").append('<script src="'+targeturl+'"></script>');
    requirejs.config({
        enforceDefine: false,
    });

    requirejs([targeturl], function(bla) {
       console.log("Script loaded. " + targeturl);
       if(success && typeof success =="function"){
           success();
       }
    }, function (err) {
        //The errback, error callback
        //The error has a list of modules that failed
        var failedId = err.requireModules && err.requireModules[0];
        console.log("error " + failedId);
        console.error(err);
    });	
}

// const loadJavascriptFile = src => {
  // return new Promise((resolve, reject) => {
    // const script = document.createElement('script')
    // script.type = 'text/javascript'
    // script.onload = resolve
    // script.onerror = reject
    // script.src = src
    // document.head.append(script)
  // })
// }

loadJavascriptFile("./thirdparty/bootstrap/bootstrap.min.js");
loadJavascriptFile("./thirdparty/sceditor/sceditor.min.js");	
loadJavascriptFile("./thirdparty/flexdatalist/jquery.flexdatalist.min.js");
// loadJavascriptFile("./thirdparty/jquery.flexdatalist.min.js").then(() => {
        // console.log("Script loaded. ");
  // }).catch((error) => console.error(error))
