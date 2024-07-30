const path = require("path");
const http = require("http");
const loadFile = require("./loadFile");
const publicDir = "./public";
const views = require("./views");
const PORT = process.env.PORT || 5000;

const server = http.createServer(async (request, response) => {
    if (path.normalize(decodeURIComponent(request.url)) !== decodeURIComponent(request.url)) {
        response.statusCode = 403;
        response.end();
        return;
    }
    const lookupFunction = views.get(request.url);
    // Case 1: In case we have a function in the views object, we execute it.
    if (typeof lookupFunction === "function") {
        lookupFunction(request, response);
        return;
    }
    // Case 2: If requested URL is "/", load the index.html file.
    if (request.url === "/") {
        loadFile.loadFile(response, path.join(publicDir, "index.html"));
        return;
    }
    // Case 3: In case we don't, look for the file. If ENOENT, return 404.
    const publicURL = path.join(publicDir, request.url);
    loadFile.loadFile(response, publicURL);
});

server.listen(PORT, () => "Listening at port " + PORT);
