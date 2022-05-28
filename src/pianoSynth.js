import * as Piano from "@tonejs/piano";
import * as Tone from "tone";

const transport = Tone.Transport;

class SynthesizerPiano extends Piano.Piano {
    constructor(opts) {
        console.log("Piano activated.");
        super(opts).toDestination();
        this._keyElements = {};
        for (let element of document.querySelectorAll(".whiteKeyInner, .blackKeyInner")) {
            const keyName = element.id.replace("_", "#");
            this._keyElements[keyName] = element;
        }
        this.load();
    }

    triggerAttack({note, midi, time, velocity}) {
        const curElement = this._keyElements[note];
        if (curElement) {
            if (time) {
                setTimeout(() => curElement.classList.add("pressed"), time * 1000);
            } else {
                curElement.classList.add("pressed");
            }
        }
        return super.keyDown({note, midi, time, velocity});
    }

    triggerRelease({note, midi, time, velocity}) {
        const curElement = this._keyElements[note];
        if (curElement) {
            if (time) {
                setTimeout(() => curElement.classList.remove("pressed"), time * 1000);
            } else {
                curElement.classList.remove("pressed");
            }
        }
        return super.keyUp({note, midi, time, velocity});
    }

    stopAll() {
        for (let element of document.querySelectorAll(".whiteKeyInner, .blackKeyInner")) {
            element.classList.remove("pressed");
        }
        return super.stopAll();
    }

    playMidi(midi) {
        this.stopMidi();
        const tracks = midi.tracks;
        for (let track of tracks) {
            const {notes} = track;
            for (let note of notes) {
                const {name, time, velocity, duration} = note;
                transport.schedule(() => {
                    pianoSynth.triggerAttack({note: name, velocity: velocity});
                    pianoSynth.triggerRelease({note: name, time: "+" + duration, velocity: velocity});
                }, time);
            }
        }
        transport.start();
    }

    stopMidi() {
        transport.stop(0);
        transport.cancel(0);
        this.stopAll();
    }

    pauseMidi() {
        transport.pause();
        this.stopAll();
    }

    resumeMidi() {
        transport.start();
    }

    togglePlayPaused() {
        if (transport.state === "paused") {
            this.resumeMidi();
        } else if (transport.state === "started") {
            this.pauseMidi();
        }
    }
}

const pianoSynth = new SynthesizerPiano({
    velocities: 5,
});

export {pianoSynth};