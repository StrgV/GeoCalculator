// Function to change the border color of given elements
function markBordersInColor(elements, color) {
    elements.forEach(element => {
        element.style.borderColor = color;
    });
}

// Function to mark section borders with a specific color and style
function markSectionBorders(element, color = 'red') {
    element.style.border = '3px solid ' + color;
    element.style.borderRadius = "15px";
}

// Function to clear all markings and reset borders to default
function clearMarkings() {
    // Reset the border color of all elements with class 'eq_Title'
    let elements = document.querySelectorAll('div.eq_Title');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");

    // Reset the border color of all elements with class 'eq_Equation'
    elements = document.querySelectorAll('div.eq_Equation');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");

    // Reset the border color of all elements with class 'eq_Image'
    elements = document.querySelectorAll('div.eq_Image');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");

    // Remove the border of the 2D grid
    let element = document.getElementById('_2dGrid');
    if (element) element.style.border = 'none';

    // Remove the border of the 3D grid
    element = document.getElementById('_3dGrid');
    if (element) element.style.border = 'none';
}

// Functions to mark specific shapes with a red border
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

function markCircle() {
    let elements = document.querySelectorAll('div.circle');
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

// Functions to mark entire sections (2D and 3D) with a red border and rounded corners
function mark2D() {
    let element = document.getElementById('_2dGrid');
    markSectionBorders(element);
}

function mark3D() {
    let element = document.getElementById('_3dGrid');
    markSectionBorders(element);
}