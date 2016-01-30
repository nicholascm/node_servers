//jsonDateServer

var http = require('http'); 
var url = require('url'); 
var portNumber = process.argv[2]; 


var server = http.createServer(function(req,res) {
    //parse the path and query
    var urlObject = url.parse(req.url);
    var urlPath = urlObject.pathname; 
    var urlQuery = urlObject.query; 
    
    //respond with the appropriate information in json string format
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(routePath(urlPath,urlQuery))); 
    res.end(); 
    
}); 

server.listen(portNumber); 

//route based on the path, pass in the query string to the appropriate route
function routePath(path, query) {
    if (path == "/api/parsetime") {
        return jsonTime(query); 
    }
    else if (path == "/api/unixtime") {
        return unixTime(query); 
    } 
    else {
        return {
            "message": "Try using /api/parsetime or /api/unixtime"
        }
    }
}    

//wrapper for json date conversion

function jsonTime(isoTime) {
    return convertDate(sliceQuery(isoTime), "json");
}


//wrapper for unix date conversion

function unixTime(isoTime) {
    return convertDate(sliceQuery(isoTime), "unix"); 
     
}

//where the actual work gets done provided the date string and type

function convertDate(aDateString, option) {
    var date = new Date(aDateString); 
    if (option == "json") {
        return {
            "hour": date.getHours(),
            "minute": date.getMinutes(),
            "second": date.getSeconds()
        }
    }
    else if (option == "unix") {
        return {
            "unixtime": date.getTime()
        }
    }
}

//utility for slicing the query string down to what is actually needed

function sliceQuery(queryString) {
    return queryString.slice(4,queryString.length-1); 
}


//instructions

//receive a get request to a path
// look for a key iso and iso format time like  /api/parsetime?iso=2013-08-10T12:10:15.474Z 
/* response

     {  
       "hour": 14,  
       "minute": 23,  
       "second": 15  
     }  
     
     */
     
//second endpoint for '/api/unixtime' with another querystringreturning the UNIX epoch time in milliseconds