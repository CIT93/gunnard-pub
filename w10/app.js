import * as orderHandler from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
import * as orderStorage from './order-storage.js';
import * as resultDisplay from './results-display.js';
import * as orderList from './order-list.js';

const orders = []; //initialize array

console.log('Hello from app.js! Your JavaScript is connected and running!');

const formElement = document.getElementById("order-form");

const clearAllDataButton = document.getElementById('clear-btn');


let isConfirmingClearAll = false;
let clearAllTimeoutId = null;

const handleDelete = function(id) {
    /*
    //Find the index of the entry to delete in our in-memory array.
        const indexToDelete = orders.findIndex(function (entry) {
        console.log(entry);
        return entry.id === id;
    })
    if(indexToDelete !== -1){
        // 2. Remove the entry from the in-memory array using splice().
        orders.splice(indexToDelete, 1);
        console.log('Entry removed from memory');
        // 3. Save the modified (smaller) array back to localStorage.
        orderStorage.saveOrders((orders));
        // 4. Re-render the table to reflect the deletion.
        orderList.renderOrders(orders, {
            onEdit: handleEdit,
            onDelete: handleDelete,

        });
        // 5. If the table is now empty, hide the results section and clear the form.
        if(orders.length === 0){
            resultDisplay.hideResults();
            orderHandler.clearForm();
        }
        // Reset states even if entry not found (e.g., error case)
        resetAllUIStates();
    }
    else {
        console.log(`Entry with id ${id} not found for deletion`);
        resetAllUIStates();
    }
    */
    console.log("App.js: Requesting delete for order", id);
};

const handleEdit = function(id) {

    console.log("App.js: Requesting edit for order", id);
};


const resetClearAllButton = function () {
    console.log(clearAllTimeoutId);
    if(clearAllTimeoutId){
        clearTimeout(clearAllTimeoutId);
    }

    isConfirmingClearAll = false;
    clearAllDataButton.textContent = 'Clear All Save Data';
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirm-state');
    clearAllDataButton.classList.add('danger-button');
}

const resetAllUIStates = function (){
    resetClearAllButton();
}

const performClearAllData = function () {
    orders.length = 0;
    console.log("In-memory array cleared:", orders);
    orderStorage.clearAllEntries();
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit,
    });
    orderHandler.clearForm();
    resultDisplay.hideResults();
    resetAllUIStates();
};

const handleOrderSubmit = function (event) {

    event.preventDefault();
    let inputs = orderHandler.getOrderInputs();
    let calculatePrice = priceCalculator.calculateTotal(inputs);

    const newOrder = {
        id: Date.now().toString(),
        ...inputs,  //order data
        ...calculatePrice,//price data
        timestamp: new Date().toISOString()
    }

    orders.push(newOrder);
    orderStorage.saveOrders(orders);

    console.log(orders);
    resultDisplay.displayResults(newOrder);
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });
    orderHandler.clearForm();
    resetAllUIStates();
};

const init = function () {
    // attached submit event listener
    formElement.addEventListener("submit", handleOrderSubmit);
    console.log("App Initialized");

    const loadedOrders = orderStorage.loadOrders();

    if(loadedOrders.length > 0){
        orders.push(...loadedOrders);
        console.log('Entries loaded localStorage')
        orderList.renderOrders(orders); }
    else {
        console.log('No entries found in localStorage, starting fresh')
    }

    // app.js
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });

    clearAllDataButton.addEventListener('click', function (event){
        event.stopPropagation();
        if(isConfirmingClearAll) {
            performClearAllData(); }
        else {
            isConfirmingClearAll = true;
            clearAllDataButton.textContent = 'Are you sure? Click again';
            clearAllDataButton.classList.add('confirm-state');
            clearAllTimeoutId = setTimeout(function (){
                resetClearAllButton();
                console.log('Clear All confirmation timed out');
            }, 3000); // 3 seconds
        }

    });

    document.addEventListener('click', function (event) {
        console.log(event.target);
        if(isConfirmingClearAll && event.target !== clearAllDataButton){
            resetClearAllButton();
        }
    });
};

document.addEventListener('DOMContentLoaded', init);