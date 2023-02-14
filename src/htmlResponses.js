const fs = require('fs');   // file system module

// load index into memory
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// get index
const getIndex = (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(index);
    response.end();
};
// get css
const getCSS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css'});
    response.write(css);
    response.end();
};

module.exports = {
    getIndex,
    getCSS,
}