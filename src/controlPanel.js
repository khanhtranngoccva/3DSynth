const browseButton = document.querySelector("#browseMIDI");
const browseButtonHidden = document.querySelector("#browseMIDIHidden");
browseButton.addEventListener("click", function() {
    browseButtonHidden.click();
});
browseButtonHidden.addEventListener("input", async function() {
    console.log(this.files);
    const curFile = this.files[0];
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

const togglePauseButton = document.querySelector("#toggleMIDIPause");
togglePauseButton.addEventListener("click", function() {
    const evt = new Event("toggleMIDIPause");
    document.dispatchEvent(evt);
});

const stopButton = document.querySelector("#stopMIDI");
stopButton.addEventListener("click", function() {
    const evt = new Event("stopMIDI");
    document.dispatchEvent(evt);
});