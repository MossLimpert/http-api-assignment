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

const urlStruct = {
  'GET': {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/unauthorized': jsonHandler.unauthorized,
    '/forbidden': jsonHandler.forbidden,
    '/internal': jsonHandler.internal,
    '/notImplemented': jsonHandler.notImplemented,
    index: htmlHandler.getIndex,
  },
  'HEAD': {
    '/success': jsonHandler.successMeta,
    '/badRequest': jsonHandler.badRequestMeta,
    '/unauthorized': jsonHandler.unauthorizedMeta,
    '/forbidden': jsonHandler.forbiddenMeta,
    '/internal': jsonHandler.internalMeta,
    '/notImplemented': jsonHandler.notImplementedMeta,
  },
  notFound: jsonHandler.notFound
}

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

// on request made to the server
const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const acceptedTypes = request.headers.accept.split(',');
    const params = query.parse(parsedUrl.query);

    // if request using method we dont handle
    if (!urlStruct[request.method]) {
      urlStruct['HEAD'].notFound(request, response);
    }

    const methodHandlers = urlStruct[request.method];
    if (methodHandlers[parsedUrl.pathname]) {
      methodHandlers[parsedUrl.pathname](request, response, acceptedTypes[0], params)
    } else {
      urlStruct.notFound(request, response, params);
    }
};

//
// begin server!
//
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
  });