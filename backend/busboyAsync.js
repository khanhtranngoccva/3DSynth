const busboy = require("busboy");
const {randomFillSync} = require('crypto');
const random = (() => {
    const buf = Buffer.alloc(16);
    return () => randomFillSync(buf).toString('hex');
})();
const path = require("path");
const fs = require("fs");
const fsPromise = require("./fsPromise.js");

async function getOneFileFromRequest(req, saveDir, ext, filename = random()) {
    await fsPromise.mkDirPromise(saveDir, {recursive: true});
    const filePath = path.join(saveDir, filename + ext);
    const bb = busboy({headers: req.headers});
    let fileReceived = 0;
    req.pipe(bb);
    return new Promise(resolve => {
        bb.on("file", async (name, file, info) => {
            if (!fileReceived) {
                fileReceived = 1;
                await fsPromise.writeFilePromise(filePath, "");
                file.pipe(fs.createWriteStream(filePath));
            } else {
                return new Error("You can only receive 1 file with this function.");
            }
        });
        bb.on("close", function() {
            setTimeout(() => resolve(filePath), 0);
        });
    });
}

module.exports = {getOneFileFromRequest};