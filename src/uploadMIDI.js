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
    console.log(json);
});