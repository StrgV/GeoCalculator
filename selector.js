function markBordersInColor(elements, color) {
    elements.forEach(element => {
        element.style.borderColor = color;
    });
}

function markSectionBorders(element, color = 'red') {
    element.style.border = '3px solid ' + color;
    element.style.borderRadius = "15px";
}

function clearMarkings() {
    let elements = document.querySelectorAll('div.eq_Title');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");
    elements = document.querySelectorAll('div.eq_Equation');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");
    elements = document.querySelectorAll('div.eq_Image');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");
    let element = document.getElementById('_2dGrid');
    if (element) element.style.border = 'none';
    element = document.getElementById('_3dGrid');
    if (element) element.style.border = 'none';
}

function markSquare() {
    let elements = document.querySelectorAll('div.square');
    markBordersInColor(elements, "red");
}

function markRectangle() {
    let elements = document.querySelectorAll('div.rectangle');
    markBordersInColor(elements, "red");
}

function markTriangle() {
    let elements = document.querySelectorAll('div.triangle');
    markBordersInColor(elements, "red");
}

function markTrapezoid() {
    let elements = document.querySelectorAll('div.trapezoid');
    markBordersInColor(elements, "red");
}

function markCube() {
    let elements = document.querySelectorAll('div.cube');
    markBordersInColor(elements, "red");
}

function markCuboid() {
    let elements = document.querySelectorAll('div.cuboid');
    markBordersInColor(elements, "red");
}

function markPyramid3() {
    let elements = document.querySelectorAll('div.pyramid3');
    markBordersInColor(elements, "red");
}

function markPyramid4() {
    let elements = document.querySelectorAll('div.pyramid4');
    markBordersInColor(elements, "red");
}

function markSphere() {
    let elements = document.querySelectorAll('div.sphere');
    markBordersInColor(elements, "red");
}

function mark2D() {
    let element = document.getElementById('_2dGrid');
    markSectionBorders(element);
}

function mark3D() {
    let element = document.getElementById('_3dGrid');
    markSectionBorders(element);
}