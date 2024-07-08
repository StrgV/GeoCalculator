function createInput(labelText, inputId) {
    const label = document.createElement('label');
    label.setAttribute('for', inputId);
    label.textContent = labelText;

    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', inputId);
    input.setAttribute('name', inputId);

    return { label, input };
}

function showInputs() {
    const container = document.getElementById('input-container');
    const selectedElement = document.getElementById('element-select').value;

    container.innerHTML = ''; // Clear previous inputs 

    switch (selectedElement) {
        case 'quadrat':
            var squareSide = createInput('Seitenlänge:', 'square-side');
            container.appendChild(squareSide.label);
            container.appendChild(squareSide.input);
            break;
        case 'rechteck':
            var rectLength = createInput('Länge:', 'rect-length');
            var rectWidth = createInput('Breite:', 'rect-width');
            container.appendChild(rectLength.label);
            container.appendChild(rectLength.input);
            container.appendChild(document.createElement('br'));
            container.appendChild(rectWidth.label);
            container.appendChild(rectWidth.input);
            break;
        case 'dreieck':
            var triangleBase = createInput('Grundlinie:', 'triangle-base');
            var triangleHeight = createInput('Höhe:', 'triangle-height');
            container.appendChild(triangleBase.label);
            container.appendChild(triangleBase.input);
            container.appendChild(document.createElement('br'));
            container.appendChild(triangleHeight.label);
            container.appendChild(triangleHeight.input);
            break;
        case 'kreis':
            var circleRadius = createInput('Radius:', 'circle-radius');
            container.appendChild(circleRadius.label);
            container.appendChild(circleRadius.input);
            break;
        case 'viereck':
            var polygonSides = createInput('Anzahl der Seiten:', 'polygon-sides');
            var polygonLength = createInput('Seitenlänge:', 'polygon-length');
            container.appendChild(polygonSides.label);
            container.appendChild(polygonSides.input);
            container.appendChild(document.createElement('br'));
            container.appendChild(polygonLength.label);
            container.appendChild(polygonLength.input);
            break;
        case 'würfel':
            var cubeSide = createInput('Seitenlänge:', 'cube-side');
            container.appendChild(cubeSide.label);
            container.appendChild(cubeSide.input);
            break;
        case 'quader':
            var cuboidLength = createInput('Länge:', 'cuboid-length');
            var cuboidWidth = createInput('Breite:', 'cuboid-width');
            var cuboidHeight = createInput('Höhe:', 'cuboid-height');
            container.appendChild(cuboidLength.label);
            container.appendChild(cuboidLength.input);
            container.appendChild(document.createElement('br'));
            container.appendChild(cuboidWidth.label);
            container.appendChild(cuboidWidth.input);
            container.appendChild(document.createElement('br'));
            container.appendChild(cuboidHeight.label);
            container.appendChild(cuboidHeight.input);
            break;
        case 'pyramide':
            var pyramidBase = createInput('Grundlinie:', 'pyramid-base');
            var pyramidHeight = createInput('Höhe:', 'pyramid-height');
            container.appendChild(pyramidBase.label);
            container.appendChild(pyramidBase.input);
            container.appendChild(document.createElement('br'));
            container.appendChild(pyramidHeight.label);
            container.appendChild(pyramidHeight.input);
            break;
        case 'kugel':
            var sphereRadius = createInput('Radius:', 'sphere-radius');
            container.appendChild(sphereRadius.label);
            container.appendChild(sphereRadius.input);
            break;
    }
}