const STATE = {
    _manualInputOctave: 0,
}

Object.defineProperty(STATE, "manualInputOctave", {
    get() {
        return this._manualInputOctave;
    },
    set(data) {
        if (data < 0) data = 0;
        else if (data > 6) data = 7;
        this._manualInputOctave = data;
    }
});

STATE.manualInputOctave = 4;

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
    "[": ["E#", 1],
    "'": ["F", 1],
};


const manualSynths = {};
for (let key of Object.keys(KEYMAP)) {
    const curSynth = new Tone.Synth().toDestination();
    curSynth.active = 0;
    manualSynths[key] = curSynth;
}

function manualPlay(e) {
    const key = e.key.toLowerCase();
    const curSynth = manualSynths[key];
    if (!curSynth) return undefined;
    else if (curSynth.active === 0) {
        curSynth.active = 1;
        const curSoundArray = KEYMAP[key];
        const curSoundName = `${curSoundArray[0]}${curSoundArray[1] + STATE.manualInputOctave}`;
        console.log(curSoundName);
        curSynth.triggerAttack(curSoundName);
        document.querySelector("#" + curSoundName.replaceAll("#", "_"))?.classList.add("pressed");
    }
}

function manualStop(e) {
    const key = e.key.toLowerCase();
    const curSynth = manualSynths[key];
    if (!curSynth) return undefined;
    curSynth.active = 0;
    const curSoundArray = KEYMAP[key];
    const curSoundName = `${curSoundArray[0]}${curSoundArray[1] + STATE.manualInputOctave}`;
    curSynth.triggerRelease();
    document.querySelector("#" + curSoundName.replaceAll("#", "_"))?.classList.remove("pressed");
}

window.addEventListener("keydown", manualPlay);
window.addEventListener("keyup", manualStop);
window.addEventListener("keypress", (e) => {
    if (e.key.toLowerCase() === "q") {
        STATE.manualInputOctave -= 1;
    } else if (e.key.toLowerCase() === "]") {
        STATE.manualInputOctave += 1;
    }
});