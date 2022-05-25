
const KEYMAP = {
    97: "C4",
    119: "C#4",
    115: "D4",
    101: "D#4",
    100: "E4",
    102: "F4",
    116: "F#4",
    103: "G4",
    121: "G#4",
    104: "A4",
    117: "A#4",
    106: "B4",
    107: "C5",
    111: "C#5",
    108: "D5",
    112: "D#5",
    59: "E5",
    91: "E#5",
    39: "F5",
}


const manualSynths = {};
for (let key of Object.keys(KEYMAP)) {
    manualSynths[key] = new Tone.Synth().toDestination();
}

function manualPlay(e) {
    const result = KEYMAP[e.keyCode];
    if (result) {
        manualSynths[e.keyCode].triggerAttack(result);
    }
}

function manualStop(e) {
    // if (KEYMAP[e.keyCode]) manualSynths[e.keyCode].triggerRelease()
}

window.addEventListener("keydown", manualPlay);
window.addEventListener("keyup", manualStop);