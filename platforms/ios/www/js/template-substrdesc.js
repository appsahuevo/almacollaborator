Template7.registerHelper('substrdesc', function (length, data) {
    if (data && data.length > length) {
        while (true) {
            var caracter = data.substring(length, length + 1);

            if (caracter == " " || caracter == ".") {
                return data.substring(0, length) + '...';
            }
            else {
                length += 1;
            }
        }
        return data.substring(0, 15) + '...';
    } else {
        return data;
    }
});