window.console = (function(oldCons){
    return {
        log: function(text){
            if(window.Screens) {
                window.Screens.postMessage("screensInternal.consoleMessage", "Console message: " + text);
            }
        },
        info: function (text) {
            oldCons.info(text);
        },
        warn: function (text) {
            oldCons.warn(text);
        },
        error: function (text) {
            oldCons.error(text);
        }
    };
}(window.console));

window.addEventListener('error', function(ev) {
	if (window.Screens) {
		window.Screens.postMessage('screensInternal.error', 'Error in file ' + window.currentFile + ': ' + ev.message);
	}
});

window.currentFile = "";

var screens = {
	screensScripts_: [],
	addScreensScript: function(screensScript) {
		this.screensScripts_.push(screensScript);
	},

	reloadScripts: function() {
		this.screensScripts_.forEach(function(scripts) {
		    scripts();
		});
	},

	postMessage: function(namespace, message) {
		android.postMessage(namespace, message);
	}
};

window.Screens = Object.create(screens);

window.Liferay.on('endNavigate', function() {
	window.Screens.reloadScripts();
});

setInterval(function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', window.location.origin + '/c/portal/extend_session');
    xhr.send();
}, 3 * 60 * 1000);