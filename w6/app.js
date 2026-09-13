import {getOrderInputs} from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js"; //import
import * as resultDisplay from './results-display.js';
import * as orderStorage from './order-storage.js';
import * as orderList from './order-list.js';

const orders = []; //initialize array

console.log('Hello from app.js! Your JavaScript is connected and running!');

const formElement = document.getElementById("order-form");
const orderSummaryElement = document.getElementById("order-summary");

const handleOrderSubmit = function (event) {

    event.preventDefault();
    let inputs = getOrderInputs();
    let calculatePrice = priceCalculator.calculateTotal(inputs);

    const newOrder = {
        ...inputs,  //order data
        ...calculatePrice,//price data
        timestamp: new Date().toISOString()
    }

    orders.push(newOrder);
    orderStorage.saveOrders(orders);

    console.log(orders)
    orderList.renderOrder(orders)
}

const init = function () {
    // attached submit event listener
    formElement.addEventListener("submit", handleOrderSubmit);
    console.log("App Initialized");

    const loadedOrders = orderStorage.loadOrders();

    if(loadedOrders.length > 0){
        orders.push(...loadedOrders);
        console.log('Entries loaded localStorage')
        orderList.renderOrder(orders); }
    else {
        console.log('No entries found in localStorage, starting fresh')
    }
}

document.addEventListener('DOMContentLoaded', init);{}
