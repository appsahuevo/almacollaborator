var PhoneGap = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.onBackKeyDown, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {

        cordova.plugins.autoStart.enable();

        PhoneGap.receivedEvent('deviceready');
    },    
    onBackKeyDown: function(){
        if (window.location.href !== firstPageUrl) {
            window.history.back();
        } else {
            Util.showMessage('back');
            return; // This will suspend the app
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        
        App7.init();     

        // initApp();
    }
};