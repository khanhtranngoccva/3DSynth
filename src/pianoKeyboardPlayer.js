import {pianoSynth} from "./pianoSynth";

const KEYMAP = {
    a: ["C", 0],
    w: ["C#", 0],
    s: ["D", 0],
    e: ["D#", 0],
    d: ["E", 0],
    f: ["F", 0],
    t: ["F#", 0],
    g: ["G", 0],
    y: ["G#", 0],
    h: ["A", 0],
    u: ["A#", 0],
    j: ["B", 0],
    k: ["C", 1],
    o: ["C#", 1],
    l: ["D", 1],
    p: ["D#", 1],
    ";": ["E", 1],
    "'": ["F", 1],
};
const STATE = {
    _minManualInputOctave: 1,
    _manualInputOctave: 4,
    _maxManualInputOctave: 7,
};

Object.defineProperty(STATE, "manualInputOctave", {
    get() {
        return this._manualInputOctave;
    },
    set(data) {
        if (data < this._minManualInputOctave) data = this._minManualInputOctave;
        else if (data > this._maxManualInputOctave) data = this._maxManualInputOctave;
        this._manualInputOctave = data;
    }
});

window.addEventListener("keypress", (e) => {
    if (e.key.toLowerCase() === "q") {
        STATE.manualInputOctave -= 1;
    } else if (e.key.toLowerCase() === "]") {
        STATE.manualInputOctave += 1;
    }
});

window.addEventListener("keydown", (e) => {
    const pianoKeyBinding = KEYMAP[e.key.toLowerCase()];
    if (!pianoKeyBinding) return undefined;
    const pianoKeyName = pianoKeyBinding[0] + (pianoKeyBinding[1] + STATE.manualInputOctave);
    pianoSynth.triggerAttack({note: pianoKeyName});
});

window.addEventListener("keyup", (e) => {
    const pianoKeyBinding = KEYMAP[e.key.toLowerCase()];
    if (!pianoKeyBinding) return undefined;
    const pianoKeyName = pianoKeyBinding[0] + (pianoKeyBinding[1] + STATE.manualInputOctave);
    pianoSynth.triggerRelease({note: pianoKeyName});
});