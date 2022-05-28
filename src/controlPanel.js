import {toggleParallax} from "./DimensionCSS.js";

const browseButtons = document.querySelectorAll(".browseMIDI");
const browseButtonHidden = document.querySelector("#browseMIDIHidden");

browseButtons.multiAssign("click", function() {
    browseButtonHidden.click();
});

browseButtonHidden.addEventListener("input", async function() {
    console.log(this.files);
    if (this.files.length === 0) return;
    const curFile = this.files[0];
    this.value = "";
    const uploadData = new FormData();
    uploadData.set("midiFile", curFile);

    const result = await fetch("/api", {
        method: "POST",
        body: uploadData,
    });

    const json = await result.json();
    const newMidiEvent = new Event("midiPlay");
    newMidiEvent.midi = json.data;
    document.dispatchEvent(newMidiEvent);
});

const togglePauseButton = document.querySelectorAll(".toggleMIDIPause");
togglePauseButton.multiAssign("click", function() {
    const evt = new Event("toggleMIDIPause");
    document.dispatchEvent(evt);
});

const stopButtons = document.querySelectorAll(".stopMIDI");
stopButtons.multiAssign("click", function() {
    const evt = new Event("stopMIDI");
    document.dispatchEvent(evt);
});

const toggleParallaxButtons = document.querySelectorAll(".toggleParallax");
toggleParallaxButtons.multiAssign("click", function() {
    toggleParallax();
});

const perfModeButtons = document.querySelectorAll(".perfModeButton");
perfModeButtons.multiAssign("click", function() {
    document.body.classList.toggle("hideHeavyVisuals");
});

const reverseButtons = document.querySelectorAll(".rewind");
reverseButtons.multiAssign("click", function() {
    const evt = new Event("rewind");
    document.dispatchEvent(evt);
});

const fastForwardButtons = document.querySelectorAll(".fastForward");
fastForwardButtons.multiAssign("click", function() {
    const evt = new Event("fastForward");
    document.dispatchEvent(evt);
});

// Performance mode on by default if Chrome. Will be removed as soon as I can fix the 1400 elements lagging the app.
if (navigator.userAgent.match(/chrome/gi)) {
    document.body.classList.add("hideHeavyVisuals");
}