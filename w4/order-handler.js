const qtyInput = document.getElementById("qty");
const giftWrapCheckbox = document.getElementById("gift-wrap");
const sizeRadios = document.querySelectorAll('input[name="size"]');


const getSelectedRadioValue = function (radios) {
    for (const radio of radios) {
        if (radio.checked) {
            console.log(`${radio.value} has attribute of ${radio.checked}`);
            return radio.value;
        }
    }
    return null;
};

export const getOrderInputs = function() {
    return {
        qty: parseInt(qtyInput.value) || 1,
        size: getSelectedRadioValue(sizeRadios),
        giftWrap: giftWrapCheckbox.checked
    };
};
