import * as Piano from "@tonejs/piano";

class SynthesizerPiano extends Piano.Piano {
    constructor() {
        console.log("Piano activated.");
        super().toDestination();
        this.load();
    }

    triggerAttack({note, midi, time, velocity}) {
        const curElement = document.getElementById(note.replace("#", "_"));
        if (curElement) {
            curElement.classList.add("pressed");
        }
        return super.keyDown({note, midi, time, velocity});
    }

    triggerRelease({note, midi, time, velocity}) {
        const curElement = document.getElementById(note.replace("#", "_"));
        if (curElement) {
            curElement.classList.remove("pressed");
        }
        return super.keyUp({note, midi, time, velocity});
    }
}

const pianoSynth = new SynthesizerPiano();
export {pianoSynth};