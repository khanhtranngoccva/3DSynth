import * as Piano from "@tonejs/piano";
import * as Tone from "tone";

const transport = Tone.Transport;

class SynthesizerPiano extends Piano.Piano {
    constructor(opts) {
        console.log("Piano activated.");
        super(opts).toDestination();
        this.load();
    }

    triggerAttack({note, midi, time, velocity}) {
        const curElement = document.getElementById(note.replace("#", "_"));
        if (curElement) {
            setTimeout(() => curElement.classList.add("pressed"), (time ?? 0) * 1000);
        }
        return super.keyDown({note, midi, time, velocity});
    }

    triggerRelease({note, midi, time, velocity}) {
        const curElement = document.getElementById(note.replace("#", "_"));
        if (curElement) {
            setTimeout(() => curElement.classList.remove("pressed"), (time ?? 0) * 1000);
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