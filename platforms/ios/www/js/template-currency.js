Template7.registerHelper('currency', function (data) {
    var ret = '$ ' + parseInt(data).toLocaleString("es-CO");
    return ret;
});