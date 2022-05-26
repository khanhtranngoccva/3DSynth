const path = require("path");

module.exports = {
    entry: "./src/mainScript.js",
    output: {
        filename: "index.js",
        path: path.join(__dirname, "public", "js"),
    },
    resolve: {
        fallback: {
            events: require.resolve("events/"),
        }
    },
    watch: true,
}