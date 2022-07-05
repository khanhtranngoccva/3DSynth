# 3DCakeMaker
A full-stack synthesizer that plays your submitted MIDI files, inspired by the ASM Hydrasynth synthesizer!

**Fun fact**: I started creating this on one of my Twitch streams!

**Link to project:** https://css3dsynth.herokuapp.com/

![CSS 3D synthesizer](https://github.com/khanhtranngoccva/3DSynth/raw/main/img.png)

## How It's Made:

**Tech used:**
<img src="https://img.shields.io/static/v1?label=|&message=HTML5&color=red&logo=html5&labelColor=white" alt="HTML5"/>
<img src="https://img.shields.io/static/v1?label=|&message=CSS3&color=dodgerblue&logo=css3&labelColor=white&logoColor=dodgerblue" alt="CSS3"/>
<img src="https://img.shields.io/static/v1?label=|&message=JavaScript&color=yellow&logo=javascript&labelColor=white&logoColor=yellow" alt="JavaScript"/>
<img src="https://img.shields.io/static/v1?label=|&message=NodeJS&color=darkgreen&logo=nodedotjs&labelColor=white&logoColor=darkgreen" alt="NodeJS"/>
<img src="https://img.shields.io/static/v1?label=|&message=Webpack&color=dodgerblue&logo=webpack&labelColor=white&logoColor=dodgerblue" alt="Webpack"/>

* This app is made with the help of my homemade framework DimensionCSS. I used this to construct basic boxes for all components of the piano and scrolling.
* I used Tone.js' native scheduler to allow pausing/resuming MIDI tracks as well as rewinding and fast-forwarding.
* Each MIDI file that is sent to the API is converted to a Tone.js-friendly format using @tonejs/midi.
* @tonejs/piano was used to generate piano sounds.

## Optimizations
* Performance mode (with only piano keys shown) is enabled by default on Google Chrome because fully rendering the piano on this browser cripples playback. This problem does not exist on Mozilla Firefox.

## Lessons Learned:
* Gained solid experience in NodeJS and Webpack.
* Learned to use ToneJS and some of its submodules.
* Reviewed advanced CSS techniques like CSS variables, CSS calculations, and 3D CSS transforms.
* Reviewed advanced JS concepts like OOP and class extension.

## Note:
* This is an experimental app to showcase advanced CSS. Due to performance constraints of CSS rendering, this app is not meant for production use.