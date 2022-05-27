const fs = require("fs");

function readFilePromise(path, options, callback) {
    options ??= {};
    callback ??= () => {};
    return new Promise(resolve => {
        fs.readFile(path, options, function (err, data) {
            callback(err, data);
            resolve(data);
        });
    });
}

function mkDirPromise(path, options, callback) {
    callback ??= () => {};
    options ??= {};
    return new Promise(resolve => {
       fs.mkdir(path, options, function (err) {
           callback(err);
           resolve();
       });
    });
}

function writeFilePromise(path, data, callback) {
    callback ??= () => {};
    return new Promise(resolve => {
        fs.writeFile(path, data, function (err) {
            callback(err);
            resolve();
        });
    });
}

function rmPromise(path, options, callback) {
    options = {};
    callback ??= () => {};
    return new Promise(resolve => {
        fs.rm(path, options, function(err) {
            callback(err);
            resolve();
        });
    })
}

module.exports = {readFilePromise, mkDirPromise, writeFilePromise, rmPromise};
