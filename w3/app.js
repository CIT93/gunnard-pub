console.log('Hello from app.js! Your JavaScript is connected and running!');

// Imports the form handler module for processing form logic
import * as formHandler from './form-handler.js';

// Reference to the main carbon footprint form element
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// Reference to the household members input field within the form
const householdMembersInput = carbonFootprintForm.querySelector('#householdMemberse');

// Reference to the button used to clear the form
const clearFormButton = document.getElementById('clearFormButton');

// Handles the form submission event, prevents default reload, and processes form inputs
const handleFormSubmit = function (event) {
    event.preventDefault();
    console.log(event);
    formHandler.getFormInputs();
    const housHoldMembers= parseInt(householdMembersInput.value) || 1;
    console.log(typeof housHoldMembers);
    console.log(`Form submitted with houseHoldMembers ${housHoldMembers}`);
}

// Clears the form data, resets all form fields to default values, and resets household members to 1
const handleClearForm = function () {
    formHandler.clearForm();
    carbonFootprintForm.reset();
    householdMembersInput.value = 1;
    console.log('Clear button clicked');
}

// Initializes the application by setting up event listeners for form submission and clearing
const init = function () {
    console.log('App initialized: DOM is ready! submitting the form or clearing it.')
    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
};

// Triggers the initialization function once the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', init);