(function() {
    const whiteKeys = Array.from(document.querySelectorAll(".whiteKey"));
    const whiteKeyCount = whiteKeys.length;
    let counter = 0;
    for (let i = -Math.floor(whiteKeyCount / 2); i <= Math.floor(whiteKeyCount / 2); i++) {
        whiteKeys[counter].style.transform = `translateY(calc(var(--unitSize) * 0.3)) translateX(calc(var(--length) * ${i} + var(--unitSize) * ${i / 10}))`;
        counter++;
    }
})();

(function() {
    const blackKeys = Array.from(document.querySelectorAll(".blackKey"));
    const blackKeysCount = blackKeys.length;
    let counter = 0;
    console.log("oof");
    for (let i = -(blackKeysCount - 1); i <= blackKeysCount - 1; i+=2) {
        blackKeys[counter].style.transform = `translateZ(calc(var(--unitSize) * -1.5)) translateY(calc(var(--unitSize) * -0.5)) translateX(calc(var(--bigKeyLength) * ${i / 2} + var(--unitSize) * ${i / 20}))`
        counter++;
    }
    blackKeys.forEach((key, index) => {
        if (index % 7 === 2 || index % 7 === 6) {
            key.remove();
        }
    })
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