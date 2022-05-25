function delay(ms) {
    return new Promise(r=>setTimeout(r, ms));
}

function timeIt(callback) {
    const t1 = performance.now();
    callback();
    const t2 = performance.now();
    console.log("Time taken:", (t2 - t1).toFixed(3), "ms")
}

HTMLElement.prototype.delegate = function(eventType, childSelector, callback) {
    this.addEventListener(eventType, function(e) {
        const targetElement = e.target;
        const closestParentElement = targetElement.closest(childSelector);
        if (closestParentElement && this.contains(closestParentElement)) {
            callback.call(closestParentElement, e);
        }
    });
};

NodeList.prototype.multiAssign = function(eventType, callback) {
    Array.from(this).forEach(element => {
        element.addEventListener(eventType, callback);
    });
};

async function play() {
    for (let sound of soundKeys) {
        sound.play();
        await delay(40);
    }
}

(function() {
    const whiteKeys = Array.from(document.querySelectorAll(".whiteKey"));
    const whiteKeyCount = whiteKeys.length;
    let counter = 0;
    if (whiteKeyCount % 2 === 0) {
        for (let i = -(whiteKeyCount - 1); i <= whiteKeyCount - 1; i+=2) {
            whiteKeys[counter].style.transform = `translateX(calc(var(--length) * ${i / 2}))`
            counter++;
        } 
    } else {
        for (let i = -Math.floor(whiteKeyCount / 2); i <= Math.floor(whiteKeyCount / 2); i++) {
            whiteKeys[counter].style.transform = `translateY(3px) translateX(calc(var(--length) * ${i} + ${i}px))`;
            counter++;
        }
    }
})();

(function() {
    const blackKeys = Array.from(document.querySelectorAll(".blackKey"));
    const blackKeysCount = blackKeys.length;
    let counter = 0;
    if (blackKeysCount % 2 === 0) {
        console.log("oof");
        for (let i = -(blackKeysCount - 1); i <= blackKeysCount - 1; i+=2) {
            blackKeys[counter].style.transform = `translateZ(-15px) translateY(-5px) translateX(calc(var(--bigKeyLength) * ${i / 2} + ${i / 2}px))`
            counter++;
        }
    } else {
        for (let i = -Math.floor(blackKeysCount / 2); i <= Math.floor(blackKeysCount / 2); i++) {
            blackKeys[counter].style.transform = `translateX(calc(var(--length) * ${i} + ${i}px))`;
            counter++;
        }
    }
    blackKeys.forEach((key, index) => {
        if (index % 7 === 2 || index % 7 === 6) {
            key.remove();
        }2245
    })
})();


(function() {
    let mousedown = 0;
    const keyboard = document.querySelector(".synthesizer");
    keyboard.delegate("mousedown", ".whiteKeyInner, .blackKeyInner", function(e) {
        mousedown = 1;
        this.classList.add("pressed");
    });
    keyboard.delegate("mouseup", ".whiteKeyInner, .blackKeyInner", function(e) {
        mousedown = 0;
        this.classList.remove("pressed");
    });
    keyboard.delegate("mouseout", ".whiteKeyInner, .blackKeyInner", function(e) {
        this.classList.remove("pressed");
    });
    keyboard.delegate("mouseover", ".whiteKeyInner, .blackKeyInner", function(e) {
        if (mousedown) this.classList.add("pressed");
    });
})();

(function() {
    const OCTAVES = [3, 4, 5, 6];
    const BASE_WHITE_NOTES = ["C", "D", "E", "F", "G", "A", "B"];
    const BASE_BLACK_NOTES = ["C_", "D_", "F_", "G_", "A_"];
    const WHITE_KEY_IDS = OCTAVES.flatMap(octave => BASE_WHITE_NOTES.map(baseNote => baseNote + octave));
    const BLACK_KEY_IDS = OCTAVES.flatMap(octave => BASE_BLACK_NOTES.map(baseNote => baseNote + octave));
    WHITE_KEY_IDS.push("C7");

    const whiteKeys = Array.from(document.querySelectorAll(".whiteKeyInner"));
    whiteKeys.map((whiteKey, index) => whiteKey.id = WHITE_KEY_IDS[index]);
    const blackKeys = Array.from(document.querySelectorAll(".blackKeyInner"));
    blackKeys.map((blackKey, index) => blackKey.id = BLACK_KEY_IDS[index]);
})();