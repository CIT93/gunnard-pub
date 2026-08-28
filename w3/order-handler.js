function getSelectedRadioValue(radios) {
    for (const radio of radios) {
        if (radio.checked) {
            console.log(`${radio.value} has attribute of ${radio.checked}`);
            return radio.value;
        }
    }
}

export function getOrderInputs() {
    console.log('Get inputs');
    const qtyInput = document.getElementById("qty");
    const giftWrapCheckbox = document.getElementById("gift-wrap");
    const sizeRadios = document.querySelectorAll('input[name="size"]');

    return {
        qty: parseInt(qtyInput.value) || 0,
        size: getSelectedRadioValue(sizeRadios),
        giftWrap: giftWrapCheckbox.checked
    };
}

// TEMPORARY TEST:
console.log(getOrderInputs());