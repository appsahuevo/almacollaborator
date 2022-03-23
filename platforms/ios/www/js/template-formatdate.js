Template7.registerHelper('date', function (data) {
    var ret = moment(data).format("MMMM DD YYYY, h:mm:ss a");
    return ret;
});

Template7.registerHelper('shotdate', function (data) {
    var ret = moment(data).format("MMMM DD, h:mm a");
    return ret;
});

Template7.registerHelper('relativetime', function (data) {
    var ret = moment(data).fromNow();;
    return ret;
});

Template7.registerHelper('dayname', function (data) {
    var ret = moment(data).format('dddd');
    return ret;
});

Template7.registerHelper('shortdate', function (data) {
    var ret = moment(data).format('MMMM DD');
    return ret;
});

Template7.registerHelper('shorttime', function (data) {
    console.log(data);
    console.log(new Date(data));
    var ret = moment(data).format('hh:mm a');
    return ret;
});