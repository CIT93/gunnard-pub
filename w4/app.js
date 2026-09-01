import * as orderForm from "./order-handler.js";
import {getOrderInputs} from "./order-handler.js";

console.log('Hello from app.js! Your JavaScript is connected and running!');

const formElement = document.getElementById("order-form");
const orderSummaryElement = document.getElementById("order-summary");

const handleOrderSubmit = function (event) {

    event.preventDefault();
    let inputs = getOrderInputs();
    let summaryText = `Ordered ${inputs.qty} ${inputs.size} T-Shirt`;

    if (inputs.giftWrap) {
        summaryText += " (gift wrapped)";
    }
    orderSummaryElement.textContent = summaryText;
}

const init = function () {
    // attached submit event listener
    formElement.addEventListener("submit", handleOrderSubmit);

    console.log("App Initialized");
}

document.addEventListener('DOMContentLoaded', init);