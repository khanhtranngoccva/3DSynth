const fs = require("fs");
const errors = require("./errors");
const contentType = require("./contentType");
const path = require("path");

function loadFile(response, publicURL) {
    fs.readFile(publicURL, {}, (err, data) => {
        if (err) {
            console.error(err);
            if (err.code === "ENOENT" || err.code === "EISDIR") {
                errors.handleResponseWith404(response);
            }
            else {
                errors.handleResponseWith504(response);
                // console.error(err);
            }
        } else {
            response.writeHead(200, {
                "Content-Type": contentType.getContentType(path.extname(publicURL)),
            });
            response.end(data);
        }
    });
}

module.exports = {loadFile};