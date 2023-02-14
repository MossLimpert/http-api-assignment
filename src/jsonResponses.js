// respond with json object
const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
    response.end();
};

// respond with json metadata
const respondJSONMeta = (request, response, status) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end();
};

// respond with xml object
const respondXML = (request, response, status, message, id) => {
    const xmlResponse = `<response><message>${message}</message><id>${id}</id></response>`;

    response.writeHead(status, {'Content-Type': 'text/xml'});
    response.write(xmlResponse);
    response.end();
}

// respond with xml metadata
const respondXMLMeta = (request, response, status) => {
    response.writeHead(status, {'Content-Type': 'text/xml'});
    response.end();
}

// /success with 200 status code --- DONE
// /badRequest with 400 status if missing ?valid=true --- DONE
// /badRequest with 200 status code if ?valid=true --- DONE
// /unauthorized with 401 if missing ?loggedIn=yes --- DONE
// /unauthorized with 200 if ?loggedIn=yes --- DONE
// /forbidden with 403 status code --- done
// /internal with 500 status code --- done
// /notImplemented with 501 status code --- done

const notFound = (request, response, types) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    }

    if (types === 'text/xml') {
        return respondXML(requst, response, 404, responseJSON.message, responseJSON.id);
    }
    return respondJSON(request, response, 404, responseJSON);
}

// SUCCESS
const success = (request, response, types) => {
    const responseJSON = {
        message: 'Successful response',
    }

    if (types === 'text/xml') {
        return respondXML(request, response, 200, "This is a successful response.");
    }

    return respondJSON(request, response, 200, responseJSON);
}
const successMeta = (request, response, types) => {
    if (types === 'text/xml') {
        return respondXMLMeta(request, response, 200);
    }
}
// BAD REQUEST
const badRequest = (request, response, types, params) => {
    const responseJSON = {
        message: 'This request has the required parameters',
    };

    if (!params.valid || params.valid !== 'true') {
        responseJSON.message = 'Missing valid query parameter set to true';
        responseJSON.id = 'badRequest';
        
        if (types === 'text/xml') {
            return respondXML(request, response, 400, responseJSON.message, responseJSON.id);
        }
        return respondJSON(request, response, 400, responseJSON);
    }
    return respondJSON(request, response, 200, responseJSON);
}
const badRequestMeta = (request, response, types, params) => {
    const responseJSON = {
        message: 'This request has the required parameters',
    };

    if (!params.valid || params.valid !== 'true') {
        responseJSON.message = 'Missing valid query parameter set to true';
        responseJSON.id = 'badRequest';
        
        if (types === 'text/xml') {
            return respondXMLMeta(request, response, 400, responseJSON.message, responseJSON.id);
        }
        return respondJSONMeta(request, response, 400, responseJSON);
    }
    return respondJSONMeta(request, response, 200, responseJSON);
}
// UNAUTHORIZED
const unauthorized = (request, response, types, params) => {
    const responseJSON = {
        message: 'You are authorized to view this page',
    };

    if (!params.loggedIn || params.loggedIn !== 'true') {
        responseJSON.message = 'Missing valid loggedIn parameter set to true.';
        responseJSON.id = 'unauthorized';
        
        if (types === 'text/xml') {
            return respondXML(request, response, 401, responseJSON.message, responseJSON.id);
        }
        return respondJSON(request, response, 401, responseJSON);
    }
    return respondJSON(request, response, 200, responseJSON);
}
const unauthorizedMeta = (request, response, types, params) => {
    const responseJSON = {
        message: 'You are authorized to view this page',
    };

    if (!params.loggedIn || params.loggedIn !== 'true') {
        responseJSON.message = 'Missing valid loggedIn parameter set to true.';
        responseJSON.id = 'unauthorized';
        
        if (types === 'text/xml') {
            return respondXMLMeta(request, response, 401, responseJSON.message, responseJSON.id);
        }
        return respondJSONMeta(request, response, 401, responseJSON);
    }
    return respondJSONMeta(request, response, 200, responseJSON);
}
// FORBIDDEN
const forbidden = (request, response, types) => {
    const responseJSON = {
        message: 'This page is forbidden',
        id: 'forbidden'
    };

    if (types === 'text/xml') {
        return respondXML(request, response, 403, responseJSON.message, responseJSON.id);
    }
    return respondJSON(request, response, 403, responseJSON);
}
const forbiddenMeta = (request, response, types) => {
    const responseJSON = {
        message: 'This page is forbidden',
    };

    if (types === 'text/xml') {
        return respondXMLMeta(request, response, 403, responseJSON.message, responseJSON.id);
    }
    return respondJSONMeta(request, response, 403, responseJSON);
}
// INTERNAL
const internal = (request, response, types) => {
    const responseJSON = {
        message: 'Internal server error',
        id: 'internal'
    };

  
    if (types === 'text/xml') {
        return respondXML(request, response, 500, responseJSON.message, responseJSON.id);
    }
    return respondJSON(request, response, 500, responseJSON);
}
const internalMeta = (request, response, types) => {
    const responseJSON = {
        message: 'Internal server error',
        id: 'internal'
    };

  
    if (types === 'text/xml') {
        return respondXMLMeta(request, response, 500, responseJSON.message, responseJSON.id);
    }
    return respondJSONMeta(request, response, 500, responseJSON);
}
// NOT IMPLEMENTED
const notImplemented = (request, response, types) => {
    const responseJSON = {
        message: 'Endpoint not implemented',
        id: 'notImplemented'
    };

  
    if (types === 'text/xml') {
        return respondXML(request, response, 501, responseJSON.message, responseJSON.id);
    }
    return respondJSON(request, response, 501, responseJSON);
}
const notImplementedMeta = (request, response, types) => {
    const responseJSON = {
        message: 'Internal server error',
        id: 'internal'
    };

  
    if (types === 'text/xml') {
        return respondXMLMeta(request, response, 500, responseJSON.message, responseJSON.id);
    }
    return respondJSONMeta(request, response, 500, responseJSON);
}

module.exports = {
    notFound,
    success,
    successMeta,
    badRequest,
    badRequestMeta,
    unauthorized,
    unauthorizedMeta,
    forbidden,
    forbiddenMeta,
    internal,
    internalMeta,
    notImplemented,
    notImplementedMeta
}