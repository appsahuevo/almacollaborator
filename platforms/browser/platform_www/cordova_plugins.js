cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-autostart/www/auto-start.js",
        "id": "cordova-plugin-autostart.AutoStart",
        "pluginId": "cordova-plugin-autostart",
        "clobbers": [
            "cordova.plugins.autoStart"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-autostart": "2.3.0"
}
// BOTTOM OF METADATA
});