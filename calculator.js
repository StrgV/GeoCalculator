document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('element-select').addEventListener('change', showInputs);
});

// Contains all elements with their respective input fields
const elements = {
    'square': [{ id: 'side', label: 'Seitenlänge' }],
    'rectangle': [{ id: 'length', label: 'Länge' }, { id: 'width', label: 'Breite' }],
    'triangle': [{ id: 'base', label: 'Grundlinie' }, { id: 'height', label: 'Höhe' }],
    'circle': [{ id: 'radius', label: 'Radius' }],
    'trapezoid': [{ id: 'base1', label: 'Grundlinie 1' }, { id: 'base2', label: 'Grundlinie 2' }, { id: 'height', label: 'Höhe' }],
    'cube': [{ id: 'side', label: 'Seitenlänge' }],
    'cuboid': [{ id: 'length', label: 'Länge' }, { id: 'width', label: 'Breite' }, { id: 'height', label: 'Höhe' }],
    'pyramid3': [{ id: 'base', label: 'Grundfläche' }, { id: 'height', label: 'Höhe' }],
    'pyramid4': [{ id: 'base', label: 'Grundfläche' }, { id: 'height', label: 'Höhe' }],
    'sphere': [{ id: 'radius', label: 'Radius' }]
};

// Update Inputs for the selected Element
function showInputs() {
    const inputContainer = document.getElementById('input-container');
    const operationContainer = document.getElementById('operation-container');
    const resultContainer = document.getElementById('result-container');
    const selectedElement = document.getElementById('element-select').value;

    inputContainer.innerHTML = operationContainer.innerHTML = resultContainer.innerHTML = '';

    (elements[selectedElement] || []).forEach(input => {
        inputContainer.innerHTML += `
            <div class="input-group">
                <label for="${input.id}">${input.label}</label>
                <input type="number" id="${input.id}" name="${input.id}" onfocus="removeError(event)">
            </div>`;
    });

    resultContainer.innerHTML = `
        <div class="input-group">
            <label for="result">Ergebnis</label>
            <input type="number" id="result" name="result" onfocus="removeError(event)">
        </div>`;

    operationContainer.innerHTML = `
        <button onclick="calculate()">Vorwärts berechnen</button>
        <button onclick="reverseCalculate()">Rückwärts berechnen</button>`;
}

// Make sure, that only valid inputs are calculated
function validateInputs(inputs) {
    let isValid = true;
    inputs.forEach(({ id, value }) => {
        const inputElement = document.getElementById(id);
        if (!value || value <= 0) {
            inputElement.classList.add('error');
            isValid = false;
        } else {
            inputElement.classList.remove('error');
        }
    });
    if (!isValid) alert("Bitte geben Sie positive Werte für alle Eingaben ein.");
    return isValid;
}

// calculate, normal direction
function calculate() {
    const selectedElement = document.getElementById('element-select').value;
    const inputs = elements[selectedElement].map(input => ({
        id: input.id,
        value: document.getElementById(input.id).value
    }));

    if (!validateInputs(inputs)) return;

    const values = Object.fromEntries(inputs.map(({ id, value }) => [id, parseFloat(value)]));
    let result;

    switch (selectedElement) {
        case 'square': result = values.side ** 2; break;
        case 'rectangle': result = values.length * values.width; break;
        case 'triangle': result = 0.5 * values.base * values.height; break;
        case 'circle': result = Math.PI * values.radius ** 2; break;
        case 'trapezoid': result = ((values.base1 + values.base2) / 2) * values.height; break;
        case 'cube': result = values.side ** 3; break;
        case 'cuboid': result = values.length * values.width * values.height; break;
        case 'pyramid3':
        case 'pyramid4': result = (1 / 3) * values.base * values.height; break;
        case 'sphere': result = (4 / 3) * Math.PI * values.radius ** 3; break;
    }

    document.getElementById('result').value = result;
}

// calculate the other way around
function reverseCalculate() {
    const selectedElement = document.getElementById('element-select').value;
    const result = parseFloat(document.getElementById('result').value);
    if (!result || result <= 0) {
        alert("Bitte geben Sie einen positiven Ergebniswert ein.");
        document.getElementById('result').classList.add('error');
        return;
    }
    document.getElementById('result').classList.remove('error');

    let values = {};

    switch (selectedElement) {
        case 'square': values = { side: Math.sqrt(result) }; break;
        case 'rectangle': values = { length: Math.sqrt(result), width: Math.sqrt(result) }; break;
        case 'triangle': values = { base: Math.sqrt(result * 2), height: Math.sqrt(result * 2) }; break;
        case 'circle': values = { radius: Math.sqrt(result / Math.PI) }; break;
        case 'trapezoid': {
            const heightTrapezoid = parseFloat(document.getElementById('height').value);
            if (!heightTrapezoid || heightTrapezoid <= 0) {
                alert("Bitte geben Sie die Höhe des Trapezes ein.");
                document.getElementById('height').classList.add('error');
                return;
            }
            document.getElementById('height').classList.remove('error');
            const baseSum = (result * 2) / heightTrapezoid;
            values = { base1: 0, base2: baseSum };
            break;
        }
        case 'cube': values = { side: Math.cbrt(result) }; break;
        case 'cuboid': {
            const side = Math.cbrt(result);
            values = { length: side, width: side, height: side };
            break;
        }
        case 'pyramid3':
        case 'pyramid4': {
            const baseHeight = Math.cbrt(result * 3);
            values = { base: baseHeight, height: baseHeight };
            break;
        }
        case 'sphere': values = { radius: Math.cbrt((3 * result) / (4 * Math.PI)) }; break;
    }

    for (const [id, value] of Object.entries(values)) {
        document.getElementById(id).value = value;
    }
}

function removeError(event) {
    event.target.classList.remove('error');
}

// Add CSS for error highlighting
const style = document.createElement('style');
style.innerHTML = `
    .error {
        border-color: red;
    }
`;
document.head.appendChild(style);