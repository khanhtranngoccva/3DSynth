# DimensionCSS

A lightweight library that quickly makes shapes for your next 3D CSS artwork! 🎨


## Demo
![DimensionCSS Demo](https://raw.githubusercontent.com/khanhtranngoccva/DimensionCSS/main/DimensionCSSDemo.gif)

## Example Usage
```html
<div class="canvas">
    <div class="globalCamera">
        <div class="reusableBox"></div>
    </div>
</div>
```

```css
.reusableBox {
    --width: 110px;
    --height: 100px;
    --length: 120px;
    --topBackground: gold;
    --leftBackground: pink;
    --rightBackground: orange;
    --backBackground: lime;
    --frontBackground: #ff7474;
    --bottomBackground: purple;
}
```
Read the <a href="https://github.com/khanhtranngoccva/DimensionCSS/blob/main/DOCUMENTATION.md">documentation</a> file for more instructions.

## How it's made
**Tech used:**
<img src="https://img.shields.io/static/v1?label=|&message=HTML5&color=red&logo=html5&labelColor=white" alt="HTML5"/>
<img src="https://img.shields.io/static/v1?label=|&message=CSS3&color=dodgerblue&logo=css3&labelColor=white&logoColor=dodgerblue" alt="CSS3"/>
<img src="https://img.shields.io/static/v1?label=|&message=JAVASCRIPT&color=yellow&logo=javascript&labelColor=white&logoColor=yellow" alt="JavaScript"/>

## Optimizations/Changelog
- Decreased the strip per cylinder count and the cylinder per donut count to improve the performance with insignificant sacrifice of detail. 
- Built-in camera rotation has been implemented.

## Lessons learned
- Mastered CSS positioning.
- Gained hands-on experience with CSS transforms, transform-origin, transform-style and perspective properties.
- Used name mangling to reduce global CSS namespace pollution.

## To-dos
- PhotonJS was implemented in this repository once as a test, but has been removed because PhotonJS has no license. A new in-house lighting system will be built in its place, contributors welcome!
- Add cones and spheres based on cylinders.