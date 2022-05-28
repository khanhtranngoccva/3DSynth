NodeList.prototype.multiAssign = function(eventType, callback) {
    Array.from(this).forEach(element => {
        element.addEventListener(eventType, callback);
    });
};

console.log("Prototype manipulation complete.");