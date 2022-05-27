const {handleResponseWith504} = require("./errors");
const fs = require("fs");
const busboyAsync = require("./busboyAsync.js");
const path = require("path");
const fsPromise = require("./fsPromise.js");
const {Midi} = require("@tonejs/midi");

async function midiAPI(req, res) {
    const method = req.method;
    if (method !== "POST") {
        const result = {message: "You need to use the POST method instead.", success: false};
        res.writeHead(404, {"Content-Type": "text/json"});
        res.end(JSON.stringify(result));
        return;
    }
    try {
        const saveTo = await busboyAsync.getOneFileFromRequest(req, path.join(__dirname, "userData", "MIDIs"), ".mid");
        const data = await fsPromise.readFilePromise(saveTo);
        const curMIDI = new Midi(data);
        const result = {success: true, data: curMIDI};
        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(JSON.stringify(result));
        await fsPromise.rmPromise(saveTo);
    } catch (e) {
        console.log(e);
        handleResponseWith504(res, e);
    }
}

module.exports = {midiAPI};