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
        case 'rechteck':
            var rectLength = createInput('Länge:', 'rect-length');
            var rectWidth = createInput('Breite:', 'rect-width');
            container.appendChild(rectLength.label);
            container.appendChild(rectLength.input);
            container.appendChild(document.createElement('br'));
            container.appendChild(rectWidth.label);
            container.appendChild(rectWidth.input);
            break;
        case 'quadrat':
            var squareSide = createInput('Seitenlänge:', 'square-side');
            container.appendChild(squareSide.label);
            container.appendChild(squareSide.input);
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

function showValueWarning() {
    alert("Bitte gebe valide Werte für die Berechnung ein.");
}

function calculate() {
    const selectedElement = document.getElementById('element-select').value;
    let result = '';

    function validateInput(value) {
        return !(isNaN(value) || value <= 0);
    }

    switch (selectedElement) {
        case 'rechteck':
            const rectLength = parseFloat(document.getElementById('rect-length').value);
            const rectWidth = parseFloat(document.getElementById('rect-width').value);
            if (validateInput(rectLength) && validateInput(rectWidth)) {
                result = `Fläche des Rechtecks: ${rectLength * rectWidth}`;
            } else {
                showValueWarning();
                return;
            }
            break;
        case 'quadrat':
            const squareSide = parseFloat(document.getElementById('square-side').value);
            if (validateInput(squareSide)) {
                result = `Fläche des Quadrats: ${squareSide * squareSide}`;
            } else {
                showValueWarning();
                return;
            }
            break;
        case 'dreieck':
            const triangleBase = parseFloat(document.getElementById('triangle-base').value);
            const triangleHeight = parseFloat(document.getElementById('triangle-height').value);
            if (validateInput(triangleBase) && validateInput(triangleHeight)) {
                result = `Fläche des Dreiecks: ${(triangleBase * triangleHeight) / 2}`;
            } else {
                showValueWarning();
                return;
            }
            break;
        case 'kreis':
            const circleRadius = parseFloat(document.getElementById('circle-radius').value);
            if (validateInput(circleRadius)) {
                result = `Fläche des Kreises: ${Math.PI * circleRadius * circleRadius}`;
            } else {
                showValueWarning();
                return;
            }
            break;
        case 'viereck':
            const polygonSides = parseFloat(document.getElementById('polygon-sides').value);
            const polygonLength = parseFloat(document.getElementById('polygon-length').value);
            if (validateInput(polygonSides) && validateInput(polygonLength)) {
                result = `Umfang des Vierecks: ${polygonSides * polygonLength}`;
            } else {
                showValueWarning();
                return;
            }
            break;
        case 'würfel':
            const cubeSide = parseFloat(document.getElementById('cube-side').value);
            if (validateInput(cubeSide)) {
                result = `Volumen des Würfels: ${Math.pow(cubeSide, 3)}`;
            } else {
                showValueWarning();
                return;
            }
            break;
        case 'quader':
            const cuboidLength = parseFloat(document.getElementById('cuboid-length').value);
            const cuboidWidth = parseFloat(document.getElementById('cuboid-width').value);
            const cuboidHeight = parseFloat(document.getElementById('cuboid-height').value);
            if (validateInput(cuboidLength) && validateInput(cuboidWidth) && validateInput(cuboidHeight)) {
                result = `Volumen des Quaders: ${cuboidLength * cuboidWidth * cuboidHeight}`;
            } else {
                showValueWarning();
                return;
            }
            break;
        case 'pyramide':
            const pyramidBase = parseFloat(document.getElementById('pyramid-base').value);
            const pyramidHeight = parseFloat(document.getElementById('pyramid-height').value);
            if (validateInput(pyramidBase) && validateInput(pyramidHeight)) {
                result = `Volumen der Pyramide: ${(Math.pow(pyramidBase, 2) * pyramidHeight) / 3}`;
            } else {
                showValueWarning();
                return;
            }
            break;
        case 'kugel':
            const sphereRadius = parseFloat(document.getElementById('sphere-radius').value);
            if (validateInput(sphereRadius)) {
                result = `Volumen der Kugel: ${(4 / 3) * Math.PI * Math.pow(sphereRadius, 3)}`;
            } else {
                showValueWarning();
                return;
            }
            break;
    }

    document.getElementById('resultText').textContent = result;
}