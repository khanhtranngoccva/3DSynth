const fs = require("fs");
const path = require("path");

const curFile = path.join(__dirname, "styles.css");

fs.readFile(curFile, handleMe);

function handleMe(err, data) {
    const processMe = data.toString();
    const matches = processMe.match(/-?\d+px/g);
    const newString = processMe.replace(/-?\d+px/g, function(substringToReplace) {
        const pixelValue = parseInt(substringToReplace);
        // return `calc(var(--unitSize) * ${pixelValue / 10})`;
        return pixelValue / 10 * 1.5 + "vmin";
    });
    fs.writeFile(path.join(__dirname, "newStyles2.css"), newString, () => {
    });
}