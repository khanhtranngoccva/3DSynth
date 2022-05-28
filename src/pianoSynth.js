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
        this._trackLength = 0;
        setInterval(() => this.checkSeek(), 200);
        this.load();
    }

    checkSeek() {
        if (transport.state === "started" && transport.seconds > this._trackLength) {
            this.pauseMidi(this._trackLength);
            transport.seconds = this._trackLength;
        }
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
        this._trackLength = midi.duration;
        console.log("Set duration to ", this._trackLength);
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
        console.log("Paused")
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

    rewind(time= 5) {
        if (!(time >= 0)) {
            throw new Error("Time must be a non-negative number.");
        }
        const newTime = transport.seconds - time;
        if (newTime < 0) {
            transport.seconds = 0;
        } else {
            transport.seconds = newTime;
        }
    }

    fastForward(time=5) {
        if (!(time >= 0)) {
            throw new Error("Time must be a non-negative number.");
        }
        const newTime = transport.seconds + time;
        if (newTime > this._trackLength) {
            transport.seconds = this._trackLength;
        } else {
            transport.seconds = newTime;
        }
    }
}

const pianoSynth = new SynthesizerPiano({
    velocities: 5,
});

export {pianoSynth};