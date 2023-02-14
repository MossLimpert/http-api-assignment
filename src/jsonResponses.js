// respond with json object
const respondJSON = (request, response, status, object) => {
    const jsonResponse = {};
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(jsonResponse));
    response.end();
};

// respond with json metadata
const respondJSONMeta = (request, response, status) => {
    
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end();
};

// 