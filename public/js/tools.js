export class downloadTimer{
    maxtime=0;
    interval=0;
    elementid="id";
    intervalId="";
    callback={};
    
    start(maxtime,interval,elementid, callback){
        this.maxtime = maxtime;
        this.interval = interval;
        this.elementid = elementid;
        this.callback = callback;
        let elem = document.getElementById(this.elementid);
        elem.max= maxtime;
        elem.value = 0;
        this.intervalId = setInterval(this.counter, 1000, this);
    }
    
    counter(timer){
        if(document.getElementById(timer.elementid).value >= timer.maxtime){
            clearInterval(timer.intervalId);
            if(timer.callback && typeof timer.callback.callback == "function"){
                timer.callback.callback();
            }
        }
        document.getElementById(timer.elementid).value +=timer.interval;
        // console.log("war hier");
    }
}

export class messageline{
    // message="";
    // timeToShow=10;//in seconds
    containerId="";
    
    show(message,timeToShow, containerId, textspanId, progressId){
        this.containerId = containerId;
        $("#"+textspanId).text(message);
        new downloadTimer().start(timeToShow,1,progressId, this);
        $("#"+this.containerId).show();
    }
    
    showDefault(message,timeToShow){//tools.message.showDefault("blabla", 10);
        this.show(message, timeToShow, "contentInfo","contentInfoText","progressBar");
    }
    
    callback(){//hide
        $("#"+this.containerId).hide();
    }
}