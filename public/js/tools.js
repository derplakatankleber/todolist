export class downloadTimer {
    maxtime = 0;
    interval = 0;
    elementid = "id";
    intervalId = "";
    callback = {};

    start(maxtime, interval, elementid, callback) {
        this.maxtime = maxtime;
        this.interval = interval;
        this.elementid = elementid;
        this.callback = callback;
        let elem = document.getElementById(this.elementid);
        elem.max = maxtime;
        elem.value = 0;
        this.intervalId = setInterval(this.counter, 1000, this);
    }

    counter(timer) {
        if (document.getElementById(timer.elementid).value >= timer.maxtime) {
            clearInterval(timer.intervalId);
            if (timer.callback && typeof timer.callback.callback == "function") {
                timer.callback.callback();
            }
        }
        document.getElementById(timer.elementid).value += timer.interval;
        // console.log("war hier");
    }
}

export class messageline {
    // message="";
    // timeToShow=10;//in seconds
    containerId = "";

    show(message, timeToShow, containerId, textspanId, progressId) {
        this.containerId = containerId;
        $("#" + textspanId).text(message);
        new downloadTimer().start(timeToShow, 1, progressId, this);
        $("#" + this.containerId).show();
    }

    showDefault(message, timeToShow) {//tools.message.showDefault("blabla", 10);
        this.show(message, timeToShow, "contentInfo", "contentInfoText", "progressBar");
    }

    callback() {//hide
        $("#" + this.containerId).hide();
    }
}

export class downloader {

    downloadJSON(content, filename) {
        if (typeof filename === "undefined") {
            filename = new Date().toISOString() + "_" + window.location.hostname;
        }
        if (filename) {
            filename = filename.trim().replace(/([^\dA-Za-z.]+)/ig, "_");
        }
        if (!filename.endsWith(".json")) {
            filename += ".json";
        }
        const a = document.createElement("a");
        a.href = "data:text/json;charset=utf-8," + encodeURIComponent(content);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}