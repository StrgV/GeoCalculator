document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('element-select').addEventListener('change', showInputs);
});

function showInputs() {
    const elementSelect = document.getElementById('element-select');
    const inputContainer = document.getElementById('input-container');
    const operationContainer = document.getElementById('operation-container');
    const resultContainer = document.getElementById('result-container');
    
    // Clear previous inputs
    inputContainer.innerHTML = '';
    operationContainer.innerHTML = '';
    resultContainer.innerHTML = '';
    
    const selectedElement = elementSelect.value;

    // Define input fields based on the selected element
    let inputs = [];
    switch (selectedElement) {
        case 'square':
            inputs = [
                { id: 'side', label: 'Seitenlänge' }
            ];
            break;
        case 'rectangle':
            inputs = [
                { id: 'length', label: 'Länge' },
                { id: 'width', label: 'Breite' }
            ];
            break;
        case 'triangle':
            inputs = [
                { id: 'base', label: 'Grundlinie' },
                { id: 'height', label: 'Höhe' }
            ];
            break;
        case 'circle':
            inputs = [
                { id: 'radius', label: 'Radius' }
            ];
            break;
        case 'trapezoid':
            inputs = [
                { id: 'base1', label: 'Grundlinie 1' },
                { id: 'base2', label: 'Grundlinie 2' },
                { id: 'height', label: 'Höhe' }
            ];
            break;
        case 'cube':
            inputs = [
                { id: 'side', label: 'Seitenlänge' }
            ];
            break;
        case 'cuboid':
            inputs = [
                { id: 'length', label: 'Länge' },
                { id: 'width', label: 'Breite' },
                { id: 'height', label: 'Höhe' }
            ];
            break;
        case 'pyramid3':
            inputs = [
                { id: 'base', label: 'Grundfläche' },
                { id: 'height', label: 'Höhe' }
            ];
            break;
        case 'pyramid4':
            inputs = [
                { id: 'base', label: 'Grundfläche' },
                { id: 'height', label: 'Höhe' }
            ];
            break;
        case 'sphere':
            inputs = [
                { id: 'radius', label: 'Radius' }
            ];
            break;
    }

    // Create input fields in the DOM
    inputs.forEach(input => {
        const div = document.createElement('div');
        div.classList.add('input-group');

        const label = document.createElement('label');
        label.setAttribute('for', input.id);
        label.textContent = input.label;

        const inputField = document.createElement('input');
        inputField.setAttribute('type', 'number');
        inputField.setAttribute('id', input.id);
        inputField.setAttribute('name', input.id);

        div.appendChild(label);
        div.appendChild(inputField);
        inputContainer.appendChild(div);
    });

    // Create result input field
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('input-group');

    const resultLabel = document.createElement('label');
    resultLabel.setAttribute('for', 'result');
    resultLabel.textContent = 'Ergebnis';

    const resultField = document.createElement('input');
    resultField.setAttribute('type', 'number');
    resultField.setAttribute('id', 'result');
    resultField.setAttribute('name', 'result');

    resultDiv.appendChild(resultLabel);
    resultDiv.appendChild(resultField);
    resultContainer.appendChild(resultDiv);

    // Create operation buttons
    const calcButton = document.createElement('button');
    calcButton.textContent = 'Vorwärts berechnen';
    calcButton.addEventListener('click', calculate);

    const reverseCalcButton = document.createElement('button');
    reverseCalcButton.textContent = 'Rückwärts berechnen';
    reverseCalcButton.addEventListener('click', reverseCalculate);

    operationContainer.appendChild(calcButton);
    operationContainer.appendChild(reverseCalcButton);
}

function calculate() {
    const elementSelect = document.getElementById('element-select');
    const selectedElement = elementSelect.value;
    
    let result;
    
    switch (selectedElement) {
        case 'square':
            const side = document.getElementById('side').value;
            result = side * side;
            break;
        case 'rectangle':
            const length = document.getElementById('length').value;
            const width = document.getElementById('width').value;
            result = length * width;
            break;
        case 'triangle':
            const base = document.getElementById('base').value;
            const height = document.getElementById('height').value;
            result = 0.5 * base * height;
            break;
        case 'circle':
            const radius = document.getElementById('radius').value;
            result = Math.PI * radius * radius;
            break;
        case 'trapezoid':
            const base1 = document.getElementById('base1').value;
            const base2 = document.getElementById('base2').value;
            const heightTrapezoid = document.getElementById('height').value;
            result = ((parseFloat(base1) + parseFloat(base2)) / 2) * heightTrapezoid;
            break;
        case 'cube':
            const sideCube = document.getElementById('side').value;
            result = sideCube * sideCube * sideCube;
            break;
        case 'cuboid':
            const lengthCuboid = document.getElementById('length').value;
            const widthCuboid = document.getElementById('width').value;
            const heightCuboid = document.getElementById('height').value;
            result = lengthCuboid * widthCuboid * heightCuboid;
            break;
        case 'pyramid3':
        case 'pyramid4':
            const basePyramid = document.getElementById('base').value;
            const heightPyramid = document.getElementById('height').value;
            result = (1/3) * basePyramid * heightPyramid;
            break;
        case 'sphere':
            const radiusSphere = document.getElementById('radius').value;
            result = (4/3) * Math.PI * Math.pow(radiusSphere, 3);
            break;
    }
    
    document.getElementById('result').value = result;
}

function reverseCalculate() {
    const elementSelect = document.getElementById('element-select');
    const selectedElement = elementSelect.value;
    
    const result = document.getElementById('result').value;
    
    switch (selectedElement) {
        case 'square':
            document.getElementById('side').value = Math.sqrt(result);
            break;
        case 'rectangle':
            document.getElementById('length').value = Math.sqrt(result);
            document.getElementById('width').value = Math.sqrt(result);
            break;
        case 'triangle':
            document.getElementById('base').value = Math.sqrt(result * 2);
            document.getElementById('height').value = Math.sqrt(result * 2);
            break;
        case 'circle':
            document.getElementById('radius').value = Math.sqrt(result / Math.PI);
            break;
        case 'trapezoid':
            case 'trapezoid':
            const heightTrapezoid = document.getElementById('height').value;
            if (heightTrapezoid) {
                const baseSum = (result * 2) / heightTrapezoid;
                const base1 = document.getElementById('base1').value || 0;
                const base2 = baseSum - base1;
                document.getElementById('base1').value = base1;
                document.getElementById('base2').value = base2;
            } else {
                alert("Bitte geben Sie die Höhe des Trapezes ein.");
            }
        case 'cube':
            document.getElementById('side').value = Math.cbrt(result);
            break;
        case 'cuboid':
            document.getElementById('length').value = Math.cbrt(result);
            document.getElementById('width').value = Math.cbrt(result);
            document.getElementById('height').value = Math.cbrt(result);
            break;
        case 'pyramid3':
        case 'pyramid4':
            document.getElementById('base').value = Math.cbrt(result * 3);
            document.getElementById('height').value = Math.cbrt(result * 3);
            break;
        case 'sphere':
            document.getElementById('radius').value = Math.cbrt((3 * result) / (4 * Math.PI));
            break;
    }
}
