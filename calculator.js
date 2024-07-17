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

// Update inputs for the selected element
function showInputs() {
    const inputContainer = document.getElementById('input-container');
    const selectedElement = document.getElementById('element-select').value;

    // Clear previous inputs
    inputContainer.innerHTML = '';

    // Create input fields for the selected element
    (elements[selectedElement] || []).forEach(input => {
        inputContainer.innerHTML += `
            <div class="input-group">
                <label for="${input.id}">${input.label}</label>
                <input type="number" id="${input.id}" name="${input.id}" onfocus="removeError(event)">
            </div>`;
    });
}

// Ensure only valid inputs are calculated
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

// Function to round results to 2 decimal places
function roundResult(value) {
    return Math.round(value * 100) / 100;
}

// Calculate the normal direction
function calculate() {
    const selectedElement = document.getElementById('element-select').value;
    const inputs = elements[selectedElement].map(input => ({
        id: input.id,
        value: document.getElementById(input.id).value
    }));

    // Validate inputs
    if (!validateInputs(inputs)) return;

    const values = Object.fromEntries(inputs.map(({ id, value }) => [id, parseFloat(value)]));
    let result;

    // Calculate based on the selected element
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

    document.getElementById('result').value = roundResult(result);
}

// Calculate in the reverse direction
function reverseCalculate() {
    const selectedElement = document.getElementById('element-select').value;
    const result = parseFloat(document.getElementById('result').value);

    // Validate the result input
    if (!result || result <= 0) {
        alert("Bitte geben Sie einen positiven Ergebniswert ein.");
        document.getElementById('result').classList.add('error');
        return;
    }
    document.getElementById('result').classList.remove('error');

    let values = {};

    // Calculate based on the selected element
    switch (selectedElement) {
        case 'square': values = { side: roundResult(Math.sqrt(result)) }; break;
        case 'rectangle': values = { length: roundResult(Math.sqrt(result)), width: roundResult(Math.sqrt(result)) }; break;
        case 'triangle': values = { base: roundResult(Math.sqrt(result * 2)), height: roundResult(Math.sqrt(result * 2)) }; break;
        case 'circle': values = { radius: roundResult(Math.sqrt(result / Math.PI)) }; break;
        case 'trapezoid': {
            const heightTrapezoid = parseFloat(document.getElementById('height').value);
            if (!heightTrapezoid || heightTrapezoid <= 0) {
                alert("Bitte geben Sie die Höhe des Trapezes ein.");
                document.getElementById('height').classList.add('error');
                return;
            }
            document.getElementById('height').classList.remove('error');
            const baseSum = (result * 2) / heightTrapezoid;
            values = { base1: 0, base2: roundResult(baseSum) };
            break;
        }
        case 'cube': values = { side: roundResult(Math.cbrt(result)) }; break;
        case 'cuboid': {
            const side = Math.cbrt(result);
            values = { length: roundResult(side), width: roundResult(side), height: roundResult(side) };
            break;
        }
        case 'pyramid3':
        case 'pyramid4': {
            const baseHeight = Math.cbrt(result * 3);
            values = { base: roundResult(baseHeight), height: roundResult(baseHeight) };
            break;
        }
        case 'sphere': values = { radius: roundResult(Math.cbrt((3 * result) / (4 * Math.PI))) }; break;
    }

    // Populate the calculated values into the input fields
    for (const [id, value] of Object.entries(values)) {
        document.getElementById(id).value = value;
    }
}

// Remove error class when input field is focused
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