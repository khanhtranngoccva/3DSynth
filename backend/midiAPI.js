const {handleResponseWith504} = require("./errors");
const busboy = require("busboy");
const path = require("path");
const fs = require("fs");
const { randomFillSync } = require('crypto');
const random = (() => {
    const buf = Buffer.alloc(16);
    return () => randomFillSync(buf).toString('hex');
})();
const midiParser = require("midi-parser-js");

async function midiAPI(req, res) {
    const method = req.method;
    if (method !== "POST") {
        const result = {message: "You need to use the POST method instead.", success: false};
        res.writeHead(404, {"Content-Type": "text/json"});
        res.end(JSON.stringify(result));
        return;
    }
    try {
        const fileName = random();
        const saveTo = path.join(__dirname, "MIDIs", `${fileName}.mid`);
        const bb = busboy({headers: req.headers});
        bb.on("file", (name, file, info) => {
            console.log("Saving...");
            file.pipe(fs.createWriteStream(saveTo));
        });
        bb.on("close", async () => {
            console.log("Saved.");
            fs.readFile(saveTo, (err, data) => {
                const result = {success: true, data: midiParser.parse(data)};
                res.writeHead(200, {"Content-Type": "text/json"});
                res.end(JSON.stringify(result));
            });
        });
        req.pipe(bb);
    } catch (e) {
        handleResponseWith504(res, e);
    }
}

module.exports = {midiAPI}
