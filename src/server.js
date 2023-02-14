// Moss Limpert
// IGME 430
// 02/12/23
// Http api assignment 1

const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// load client page as home page
// load css into client page as text/css
// load urls with fetch when hitting send button
// /success with 200 status code
// /badRequest with 400 status if missing ?valid=true
// /badRequest with 200 status code if ?valid=true
// /unauthorized with 401 if missing ?loggedIn=yes
// /unauthorized with 200 if ?loggedIn=yes
// /forbidden with 403 status code
// /internal with 500 status code
// /notImplemented with 501 status code
// any other page with 404 

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  index: htmlHandler.getIndex,
}

// server checks accept header for correct media type
// in fetch requests, client should send accept header for correct media type
// client should parse xml or json and put them on page
// responses should default to JSON
// json successes should have message tag
// json failures should have message and id set to status code name
// xml successes should have a <message> tag
// xml failures should have a message tag and id tag set to status code name
// print JSON or XML to console before parsing



// parse body (NEEDS UPDATE FOR XML)
const parseBody = (request, response, handlerFunction) => {
    // re-assemble data
    // acquire it
    const body = [];
  
    // event handler
    request.on('error', (err) => {
      console.dir(err); // works better when logging an obj
      response.statusCode = 400;
      response.end();
    });
    // data event gets fired in order, even if data doesnt arrive in order
    request.on('data', (chunk) => {
      body.push(chunk);
    });
  
    request.on('end', () => {
      // application/x-www-form-urlencoded <-- data type
      //name=value&name2=value2 <-- data format
      const bodyString = Buffer.concat(body).toString();  // takes contents of a buffer, slamo together
  
      let bodyParams;
      if (request.headers['content-type'] === 'application/json') {
        bodyParams = JSON.parse(bodyString);
      } else {
        bodyParams = query.parse(bodyString);               // now is a js object
      }
      
      handlerFunction(request, response, bodyParams);
    });
}

// handle post requests
const handlePost = (request, response, parsedUrl) => {
    if (parsedUrl.pathname === '/addUser') {
      // body could come in several pieces
      // parse body
      parseBody(request, response, jsonHandler.addUser);
    }
};

// handle get requests
const handleGet = (request, response, parsedUrl) => {
    if (parsedUrl.pathname === '/style.css') {
      htmlHandler.getCSS(request, response);
    } else if (parsedUrl.pathname === '/getUsers') {
      jsonHandler.getUsers(request, response);
    } else {
      htmlHandler.getIndex(request, response);
    }
};

// on request made to the server
const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const acceptedTypes = request.headers.accept.split(',');
    
    if (request.method === 'POST') {
      handlePost(request, response, parsedUrl);
    } else {
      handleGet(request, response, parsedUrl);
    }
};

//
// begin server!
//
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
  });