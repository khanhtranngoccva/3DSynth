const path = require("path");

function getContentType(extension) {
    switch (extension) {
        case ".html":
            return "text/html";
        case ".js":
        case ".mjs":
            return "text/javascript";
        case ".css":
            return "text/css";
        case ".png":
            return "image/png";
        case ".jpg":
            return "image/jpeg";
        case ".svg":
            return "image/svg+xml";
        case ".webp":
            return "image/webp";
        case ".gif":
            return "image/gif";
        case ".json":
            return "json";
        default:
            return "application/octet-stream";
    }
}

module.exports = {getContentType}