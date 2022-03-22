cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-autostart/www/auto-start.js",
        "id": "cordova-plugin-autostart.AutoStart",
        "pluginId": "cordova-plugin-autostart",
        "clobbers": [
            "cordova.plugins.autoStart"
        ]
    },
    {
        "file": "plugins/cordova-plugin-ionic-webview/src/www/util.js",
        "id": "cordova-plugin-ionic-webview.IonicWebView",
        "pluginId": "cordova-plugin-ionic-webview",
        "clobbers": [
            "Ionic.WebView"
        ]
    },
    {
        "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
        "id": "onesignal-cordova-plugin.OneSignal",
        "pluginId": "onesignal-cordova-plugin",
        "clobbers": [
            "OneSignal"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-autostart": "2.3.0",
    "cordova-plugin-ionic-webview": "4.2.1",
    "onesignal-cordova-plugin": "2.11.4",
    "cordova-plugin-ionic-keyboard": "2.2.0"
}
// BOTTOM OF METADATA
});