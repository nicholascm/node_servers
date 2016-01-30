//get ordered data stream

var http = require('http'); 
var urls = [process.argv[2], process.argv[3], process.argv[4]]; 

var dataStore = []; 

urls.forEach(function(value) {
    http.get(value, function(response) {
        var fullData = ""; 
        response.setEncoding('utf8'); 
        
        response.on('data', function(data) {
            fullData = fullData+data; 
        });
        
        response.on('end', function() {
            dataStore.push({num: urls.indexOf(value), data: fullData}); 
            if(dataStore.length ==3){
                dataStore.sort(sortObjectsAscending).forEach(value => console.log(value.data)); 
            } 
        }); 
    });
}); 

function sortObjectsAscending(a,b) {
    if (a.num > b.num) {
        return 1; 
    }
    else if (a.num < b.num) {
        return -1; 
    }
    else if (a.num == b.num) {
        return 0; 
    }
}