import * as orderForm from "./order-handler.js";

console.log('Hello from app.js! Your JavaScript is connected and running!');

const formElement = document.getElementById("order-form");
const orderSummaryElement = document.getElementById("order-summary");

const itemPrice = 15;

const handleOrderSubmit = function (event) {

    event.preventDefault();
    let summaryText = `Ordered ${inputs.qty} ${inputs.size} T-Shirt${inputs.qty}`;

    if (inputs.giftWrap) {
        summaryText += " (gift wrapped)";
    }
    orderSummaryElement.textContent = summaryText;
}

const init = function () {
    // Attach the submit event listener to the form
    formElement.addEventListener("submit", handleOrderSubmit);

    console.log("App Initialized");
}

document.addEventListener('DOMContentLoaded', init);