import {pianoSynth} from "./pianoSynth";

document.addEventListener("midiPlay", function(e) {
    pianoSynth.playMidi(e.midi);
});

document.addEventListener("toggleMIDIPause", function(e) {
    pianoSynth.togglePlayPaused();
});

document.addEventListener("stopMIDI", function(e) {
    pianoSynth.stopMidi();
});