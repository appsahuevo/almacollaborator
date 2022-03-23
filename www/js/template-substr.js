Template7.registerHelper('substr', function (data) {
    if(data && data.length > 15){
       return data.substring(0, 15) + '...';
   } else {
       return data;
   }
});