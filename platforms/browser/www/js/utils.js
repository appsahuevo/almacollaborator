// var baseUrl = "http://kerappapiqa.azurewebsites.net/";
// const baseUrl = "http://localhost:28957/";
//const baseUrl = "http://mykerwebapi-appsvc-qa.azurewebsites.net/";
// const baseUrl = "https://mykerwebapi-appsvc-prd.azurewebsites.net/";
const baseUrl = "https://myalma-webapi.azurewebsites.net";
//const baseUrl = "http://192.168.1.9:28957";



var Util = {
    mapPath: function (path) {
        return baseUrl + '/' + path;
    },
    signIn: function (signinData, successCallback, errorCallback) {
console.log(signinData);
        app.request({
            url: Util.mapPath('api/SignIn'),
            method: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            processData: false,
            data: JSON.stringify(signinData),
            success: function (data, status, xhr) {

                if (status == 200) {
                    if (data.Status == true) {

                        // Util.initSignalR();

                        successCallback(data.Status, data.Message, data.ObjectReference);

                    } else {
                        successCallback(data.Status, data.Message, data.ObjectReference);
                    }
                }
            },
            error: function (xhr, status) {
                errorCallback();
            }
        });
    },
    authenticate: function (usr, pwd, internalId, callback) {
        var credentials = {
            user: usr,
            pwd: pwd,
            internalId: internalId
        };

        localforage.setItem('credentials-myker', credentials, function (err) {
            if (!err) {
                // app.router.navigate('/categories/', {});
                if (callback) {
                    callback();

                    if (window.plugins.OneSignal) {
                        window.plugins.OneSignal.sendTags({ internalId: internalId, username: usr, city: "Medellín" });
                    }
                }
            } else {
                console.log(err);
                alert("Error de almacenamiento");
            }
        });

        // if(window.plugins.OneSignal){
        //     window.plugins.OneSignal.sendTags({internalId:internalId, username: usr, city: "Medellín"});
        // }
    },
    signout: function (callback) {
        localforage.removeItem('credentials', function () {
            if (callback) {
                callback();
            }
        });
    },
    isValid: function (dom, containerEl) {
        var result = true;
        var self = this;
        var $ = dom;

        $(containerEl + " input.required").removeClass("error");

        $(containerEl + " input.required").each(function (index, element) {
            var val = $(this).val();
            var inputType = $(this).attr("type");

            if (val.trim().length == 0) {
                $(this).addClass("error");
                result = false;
            }

            if (inputType == "email") {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (re.test(val) == false) {
                    $(this).addClass("error");
                    result = false;
                }
            }
        });

        return result;
    },
    renderTemplate: function (dom, templateId, dstEl, data) {
        var $$ = dom;

        var templateSource = $$(templateId).html();
        var template = Template7.compile(templateSource);

        var renderedList = template(data);
        $$(dstEl).html(renderedList);
    },
    renderTemplate: function (dom, templateId, dstEl, data, emptyEl) {
        var $$ = dom;

        var templateSource = $$(templateId).html();
        var template = Template7.compile(templateSource);

        var renderedList = template(data);
        $$(dstEl).html(renderedList);

        if (data.length == 0) {
            $$(emptyEl).addClass("empty-state");
        } else {
            $$(emptyEl).removeClass("empty-state");
        }
    },
    renderTemplateToHtml: function (dom, templateId, data) {
        var $$ = dom;

        var templateSource = $$(templateId).html();
        var template = Template7.compile(templateSource);

        return template(data);
    },
    saveItem: function (key, value, callback) {
        localforage.setItem(key, value, function (err) {
            if (!err) {
                // app.router.navigate('/categories/', {});
                if (callback) {
                    callback();
                }
            } else {
                callback(err);
            }
        });
    },
    getItem: function (key, callback) {
        localforage.getItem(key, function (err, value) {
            // Run this code once the value has been
            // loaded from the offline store.
            callback(err, value);
        });
    },
    formatCurrency: function (numbr) {
        return '$ ' + parseInt(numbr).toLocaleString("es-CO");
    },
    formatDate: function (dte) {
        return moment(dte).format("MMMM DD YYYY, h:mm:ss a");
    },
    formatShortDate: function (dte) {
        return moment(dte).format("MMMM DD YYYY");
    },
    calculateSummaryCart: function (items) {

        var self = this;
        var $$ = self.$$;

        let cost = 0;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            cost += item.TotalCost;
        }

        return cost;
    },
    generateUUID: function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    },
    switchNavbarColor: function (dom, color) {
        var $$ = dom;

        $$(".navbar").attr('style', 'background: ' + color + ' !important');
    },
    initSignalR: function () {
        console.log("starting signalr...");

        // $.connection.hub.url = "http://localhost:7437/signalr";
        $.connection.hub.url = "http://alma-messagingapi.azurewebsites.net/signalr/hubs";

        // Grab the hub by name, the same name as specified on the server
        var hub = $.connection.messageHub;

        $.connection.hub.qs = { 'internalId': internalId };

        hub.client.messageReceived = function (msg) {
            console.log(msg);

            if (msg.evt == "order-taken") {

                $$("#available-" + msg.data.orderId).hide();

                console.log($$("listado aplicaciones:"));
                console.log($$("orders-appled-list li").length);

            } else if (msg.evt == "new-order") {

                var html = Util.renderTemplateToHtml($$, "#neworder-template", msg.data);

                $$("#orders-list ul").prepend(html);

                var notification = app.notification.create({
                    text: msg.data.Description,
                    title: 'Nueva pedido disponible',
                    closeButton: true,
                    closeTimeout: 5000,
                    closeOnClick: true
                });

                notification.open();

                navigator.vibrate(2000);

            } else if (msg.evt == "order-assigned") {

               

                $$("#available-" + msg.data.RowKey).remove();

                if($$("#orders-appled-list li").length == 0){
                    $("#applied-title").hide();
                }

                var notification = app.notification.create({
                    text: msg.data.Description,
                    title: 'Te asignamos un servicio de ' + msg.data.Description,
                    closeButton: true,
                    closeTimeout: 5000,
                    closeOnClick: true
                });

                notification.open();

                navigator.vibrate(2000);
            }
        }

        $.connection.hub.start().done(function () {
            console.log("SignalR Client ready!!");

            // setInterval(function () {
            //   console.log("set interval");

            //   navigator.geolocation.getCurrentPosition(function (pos) {
            //     console.log("traking");
            //     hub.server.trackCollaborator(internalId, pos.coords.latitude, pos.coords.longitude);
            //   }, function () {

            //   });

            // }, 60000);

        });

        $.connection.hub.disconnected(function () {
            console.log("SignalR Client disconnected...");

            if ($.connection.hub.lastError) { console.log("Disconnected. Reason: " + $.connection.hub.lastError.message); }

            setTimeout(function () {
                console.log("Restart connection...");
                $.connection.hub.start();
            }, 3000); // Restart connection after 5 seconds.
        });

    },
    showError: function (msg) {
        var toastWithCustomButton = app.toast.create({
            text: msg,
            closeButton: true,
            closeButtonText: 'Cerrar',
            closeButtonColor: 'red',
            closeTimeout: 3000,
        });

        toastWithCustomButton.open();
    },
    showMessage: function (msg) {
        var toastWithCustomButton = app.toast.create({
            text: msg,
            closeButton: true,
            closeButtonText: 'Cerrar',
            closeButtonColor: 'green',
            closeTimeout: 3000,
        });

        toastWithCustomButton.open();
    },
    closeApp: function () {
        location.reload();
        return;
    }
}