const qtyInput = document.getElementById("qty");
const giftWrapCheckbox = document.getElementById("gift-wrap");
const sizeRadios = document.querySelectorAll('input[name="size"]');


function getSelectedRadioValue(radios) {
    for (const radio of radios) {
        if (radio.checked) {
            console.log(`${radio.value} has attribute of ${radio.checked}`);
            return radio.value;
        }
    }
    return null;
}

export function getOrderInputs() {
    return {
        qty: parseInt(qtyInput.value, 10),
        size: getSelectedRadioValue(sizeRadios),
        giftWrap: giftWrapCheckbox.checked
    };
}
