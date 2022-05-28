import {pianoSynth} from "./pianoSynth";


(function() {
    let mousedown = 0;
    const keys = document.querySelectorAll(".whiteKeyInner, .blackKeyInner");
    keys.multiAssign("mousedown", function(e) {
        mousedown = 1;
        pianoSynth.triggerAttack({note: this.id.replace("_", "#")});
    });
    keys.multiAssign("mouseup", function(e) {
        mousedown = 0;
        pianoSynth.triggerRelease({note: this.id.replace("_", "#")});
    });
    keys.multiAssign("mouseleave", function(e) {
        pianoSynth.triggerRelease({note: this.id.replace("_", "#")});
    });
    keys.multiAssign("mouseover", function(e) {
        if (mousedown) pianoSynth.triggerAttack({note: this.id.replace("_", "#")});
    });
})();