# DimensionCSS Manual

## Getting Started

### Setting up the canvas and the root camera
```html
<div class="canvas">
    <div class="globalCamera">
    </div>
</div>
```

### Add a 3D box
```html
<div class="canvas">
    <div class="globalCamera">
        <div class="reusableBox"></div>
    </div>
</div>
```

### Style the 3D box
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

## All available shapes and properties


### 3D box
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
    --frontBorderColor: #ff3a5d;
    --frontBorderStyle: solid;
    --frontBorderWidth: 10px 5px;
    --topBorderColor: black;
    --topBorderStyle: solid;
    --topBorderWidth: 10px 5px;
    --leftBorderColor: #009adc;
    --leftBorderStyle: solid;
    --leftBorderWidth: 10px 5px;
    --rightBorderColor: #ffe53a;
    --rightBorderStyle: solid;
    --rightBorderWidth: 10px 5px;
    --bottomBorderColor: white;
    --bottomBorderStyle: solid;
    --bottomBorderWidth: 10px 5px;
    --backBorderColor: blue;
    --backBorderStyle: solid;
    --backBorderWidth: 10px 5px;
    --topBorderImage: linear-gradient(#ff8d8d, pink) 1;
    transform: translateX(-300px);
}
```

### Cylinder
```html
<div class="canvas">
    <div class="globalCamera">
        <div class="reusableCylinder"></div>
    </div>
</div>
```

```css
.reusableCylinder {
    --radius: 75px;
    --height: 150px;
    --cylinderStripBackground: #d6ffc8;
    --cylinderTopBackground: red;
    --cylinderBottomBackground: blue;
}
```


### Thick cylinder
```html
<div class="canvas">
    <div class="globalCamera">
        <div class="reusableThickCylinder"></div>
    </div>
</div>
```

```css
.reusableThickCylinder {
    --thickness: 10px;
    --outerRadius: 50px;
    --height: 200px;
    --cylinderOuterStripBackground: gold;
    --cylinderInnerStripBackground: orange;
    --cylinderTopBackground: green;
    --cylinderBottomBackground: purple;
}
```

### Donut
```html
<div class="canvas">
    <div class="globalCamera">
        <div class="reusableDonut"></div>
    </div>
</div>
```

```css
.reusableDonut {
    --donutRadius: 100px;
    --thickness: 50px;
    --donutColor: pink;
    transform: translate(300px) rotateX(50deg) ;
}
```


## Advanced Styling

### Group of objects
You can create a group of 3D objects, for example a cup consisting of a CSS donut, a CSS cylinder and a thicker CSS cylinder.
Example:
```html
<div class="canvas">
    <div class="globalCamera">
        <div class="matcha">
            <div class="reusableThickCylinder cup"></div>
            <div class="reusableDonut cupHandle"></div>
            <div class="reusableCylinder cupBase"></div>
        </div>
    </div>
</div>
```
Note that a group can contain other groups.

You can also wrap a shape around a new parent group if you want to do make 3D translations on the object while also have a 3D rotation animation.
Apply the animation on the shape, and use translations on the outer group.

```html
<div class="canvas">
    <div class="globalCamera">
        <div class="reusableDonutWrapper">
            <div class="reusableDonut"></div>
        </div>
    </div>
</div>
```

```css
.reusableDonutWrapper {
    transform: translateX(300px);
}

.reusableDonut {
    --donutRadius: 100px;
    --thickness: 50px;
    --donutColor: pink;
    animation: _rotateYTest 2s infinite linear;
}
```


### Perspective and perspective origin
Use the perspective CSS property to configure how far you are from the center of the scene. 
If you set this value too low, the scene stretches out.
Example:
```css
.canvas {
    perspective: 700px;
}
```

The perspective-origin property of the object is set to the center of the canvas by default. 
If you want to look at the scene from above, use a negative value of --offsetPerspectiveY:
```css
.canvas {
    --offsetPerspectiveY: -200px;
}
```

If you want to look at the scene from below, use a positive value of --offsetPerspectiveY:
```css
.canvas {
    --offsetPerspectiveY: 200px;
}
```

If you want to look at the scene from the left, use a negative value of --offsetPerspectiveX:
```css
.canvas {
    --offsetPerspectiveX: -200px;
}
```

If you want to look at the scene from the right, use a positive value of --offsetPerspectiveX:
```css
.canvas {
    --offsetPerspectiveX: 200px;
}
```

### Center points of rotation

All shapes have their center points of rotation in the middle by default. 
If you want to set their center points of rotation to another position, use the transform-origin property. 

You can use it along with the dimension parameters like ```width```, ```height```, ```length```, ```radius```, and so on to align this point to the edges or corners of the 3D shape.
Example:

```css
.reusableBox {
    transform-origin: calc(var(--length) / 2) calc(var(--height) / 2) calc(var(--width) / 2);
}
```

All groups of objects has no width or height and have their center points of rotation at its own 0, 0, 0 point as well.
When you move objects around and spin the parent group, they revolve around this point.

However you can also change a group's center of rotation simply by using the transform-origin property.


### Camera auto rotate mode
Use the built-in animation keyframes to execute a camera rotation. When this happens, the view changes over time.
Leave the CSS class empty to use mouseover parallax scrolling.
```css
.globalCamera {
    animation: _rotateYTest 5s infinite linear;
}
```