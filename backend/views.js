const APIs = require("./midiAPI.js")

const views = new Map();
views.set("/api", APIs.midiAPI);

module.exports = views;
