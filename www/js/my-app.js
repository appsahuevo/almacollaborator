var $$ = Dom7;
let username;
let internalId;
let canceling;
let isCheckStatus = false;
let collaboratorName = "";
let tenantId = "528ec08e-4276-4e0f-8eb5-a7809ffeaab6";
var app;

var App7 = {

    init: function () {

        app = new Framework7({
            // App root element
            root: '#app',
            // App Name
            name: 'KerApp Professional',
            // App id
            id: 'co.ker.collaborator',
            // Enable swipe panel
            panel: {
                swipe: 'left',
            },
            // Add default routes
            routes: routes,
            // ... other parameters
            methods: {

            },
            statusbar: {
                iosOverlaysWebView: true,
                // iosBackgroundColor: "#273F4A"
                iosBackgroundColor: "#fff"
            },
            view: {
                iosSwipeBack: false,
            },
            init: true,
            initOnDeviceReady: true
        });
        moment.locale('es');

        var mainView = app.views.create('.view-main', {
            url: '/'
        });


        localforage.getItem('credentials-myker', function (err, value) {

            if (value) {

                username = value.user;
                internalId = value.internalId;
                collaboratorName = value.collaboratorName;

                var signinData = {
                    Email: value.user,
                    Password: value.pwd,
                    TenantId: tenantId
                };

                Util.signIn(signinData, function (status, msg, collaborator) {

                    if (status) {

                        localforage.setItem('collaborator', collaborator, function (err) {
                            if (!err) {
                                app.router.navigate('/main/', {});
                            }
                        });

                    } else {
                        app.router.navigate('/login/', {});
                    }

                }, function () {
                    app.router.navigate('/login/', {});
                });

                // Util.initSignalR();

                // app.request({
                //     url: Util.mapPath('/api/Collaborator?collaboratorId=' + username),
                //     method: 'GET',
                //     crossDomain: true,
                //     contentType: 'application/json',
                //     dataType: 'json',
                //     processData: false,
                //     success: function (data, status, xhr) {
                //         console.log(data);
                //         if (data) {
                //             localforage.setItem('collaborator', data, function (err) {
                //                 if (!err) {
                //                     app.router.navigate('/main/', {});
                //                 }
                //             });
                //         }
                //         else {
                //             app.router.navigate('/login/', {});
                //         }

                //     },
                //     error: function (xhr, status) {
                //         console.log("Ajax Error");
                //         console.log(status);
                //         console.log(xhr);
                //     }
                // });

                //app.router.navigate('/main/', {});

            } else {
                app.router.navigate('/login/', {});
            }
        });

        if (window.plugins.OneSignal) {

            window.plugins.OneSignal
                .startInit("36f0bc38-f515-48ea-b000-de8f6d874d30")
                .handleNotificationOpened(function (jsonData) {
                    //alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                    var json = jsonData.payload;

                    if (json.additionalData) {
                        //console.log(json);
                        if (json.additionalData.page != "") {

                            //app.router.navigate(json.additionalData.page, {});

                        }
                    }
                })
                .handleNotificationReceived(function (jsonData) {
                    // alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                    var json = jsonData.payload;

                    if (json.additionalData) {
                        //console.log(json);
                        if (json.additionalData.page != "") {

                            app.router.navigate(json.additionalData.page, {});

                        }
                    }
                })
                .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.None)
                .endInit();
        }

       

    }
};








