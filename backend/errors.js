function handleJSONResponseWith504(response, error) {
    response.writeHead(504, {
        "Content-Type": "text/json",
    });
    if (!error || !error.message) {
        error = "Unspecified";
    } else {
        error = error.message;
    }
    response.end(JSON.stringify({success: false, code: 504, error}));
    console.error(error);
}

function handleResponseWith404(response) {
    response.writeHead(404, {
        "Content-Type": "text/html",
    });
    response.end("404 Not Found");
}

function handleResponseWith504(response) {
    response.writeHead(504, {
        "Content-Type": "text/html",
    });
    response.end("504 Server Error");
}

module.exports = {handleResponseWith404, handleJSONResponseWith504, handleResponseWith504};
