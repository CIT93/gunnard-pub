// --- Select Elements ---
const qtyInput = document.getElementById("qty");
const giftWrapCheckbox = document.getElementById("gift-wrap");
const sizeRadios = document.querySelectorAll('input[name="size"]');

// --- Helper Function: figure out which radio is checked ---
function getSelectedRadioValue(radios) {
    for (const radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null; // in case none are checked
}

// --- Main Exported Function ---
export function getOrderInputs() {
    return {
        qty: parseInt(qtyInput.value),
        size: getSelectedRadioValue(sizeRadios),
        giftWrap: giftWrapCheckbox.checked
    };
}