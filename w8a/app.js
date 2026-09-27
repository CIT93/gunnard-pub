console.log('Hello from app.js! Your JavaScript is connected and running!');
// Week 5.1: Now save entries to localStorage after submission.
import * as formHandler from './form-handler.js';
import * as calculator from './calculator.js';
import * as resultDisplay from './results-display.js';
import * as storage from './storage.js';
import * as tableRenderer from './table-renderer.js';

// We will modify the handleFormSubmit function to trigger the table update after a new entry.
// We will modify the init function to render the table immediately on page load with any loaded data.


// Declare a 'const' array to hold all submitted carbon footprint entries in memory.
const carbonFootprintEntries = []; //Empty Array Literal - Global Variable

// Reference to the main carbon footprint form element
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// Reference to the household members input field within the form
const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// Reference to the button used to clear the form
const clearFormButton = document.getElementById('clearFormButton');

// Get reference to Clear All Data button
const clearAllDataButton = document.getElementById('clearAllDataButton');

// State variables for in-line confirmation of "Clear All Data" button.
let isConfirmingClearAll = false; // Tracks if the button is in a "confirming" state.
let clearAllTimeoutId = null; // Stores the ID returned by setTimeout, so we can cancel it.

// Resets the "Clear All Data" button to its original text and appearance.
const resetClearAllButton = function () {

    if(clearAllTimeoutId){
        // If a timeout is active (meaning the button is in a confirming state), clear it.
        clearTimeout(clearAllTimeoutId);
    }
    // Reset the confirmation state
    isConfirmingClearAll = false;
    // Restore original button text and remove any special styling class.
    clearAllDataButton.textContent = 'Clear All Save Data';
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirm-state');
    // Re-add danger-button if it was removed (it's part of initial styling)
    clearAllDataButton.classList.add('danger-button');
}

// Resets all UI-related confirmation states across the application.
const resetAllUIStates = function () {
    // This function is called when major actions (like form submit, clear, delete) occur, ensuring a clean UI state.
    //add to any function that updates DOM
    // This will be expanded in later weeks to include table row confirmations
    resetClearAllButton();
}

const handleFormSubmit = function (event) {
    event.preventDefault();
    const formData= formHandler.getFormInputs();
    const calculateResults = calculator.calculateFootprint(formData);

    const newEntry = {
        ...formData,
        ...calculateResults,
        id: storage.generateUniqueId(), // Now using storage.generateUniqueId() for our newEntry object literal
        timestamp: new Date().toISOString()
    }
    carbonFootprintEntries.push(newEntry);


    storage.saveEntries(carbonFootprintEntries);

    resultDisplay.displayResults(calculateResults);
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    resetAllUIStates();
};

const performClearAllData = function () {
    carbonFootprintEntries.length = 0;

    storage.clearAllEntries();
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    formHandler.clearForm();
    resultDisplay.hideResults();
    resetAllUIStates();
};

// Clears the form data, resets all form fields to default values, and resets household members to 1
const handleClearForm = function () {
    formHandler.clearForm();
    //carbonFootprintForm.reset();
    //householdMembersInput.value = 1;
    resultDisplay.hideResults();

    resetAllUIStates();
};

// Handles the "Delete" action for a specific entry.
const handleDeleteEntry = function (id){
    console.log(`Delete button clicked for ID:${id} functionality added in week 7`);
// 1. Find the index of the entry to delete in our in-memory array.
    const indexToDelete = carbonFootprintEntries.find(function (entry) {
        console.log(entry);
        return entry.id === id;
    })
    if(indexToDelete !== 1){
        // 2. Remove the entry from the in-memory array using splice().
        carbonFootprintEntries.splice(indexToDelete, 1);
        console.log('Entry removed from memory');
        // 3. Save the modified (smaller) array back to localStorage.
        storage.saveEntries((carbonFootprintEntries));
        // 4. Re-render the table to reflect the deletion.
        tableRenderer.renderTable(carbonFootprintEntries, {
            onEdit: handleEditEntry,
            onDelete: handleDeleteEntry,

        });
        // 5. If the table is now empty, hide the results section and clear the form.
        if(carbonFootprintEntries.length === 0){
            resultDisplay.hideResults();
            formHandler.clearForm();
        }
        // Reset states even if entry not found (e.g., error case)
        resetAllUIStates();
    }
    else {
        console.log(`Entry with id ${id} not found for deletion`);
        resetAllUIStates();
    }
};

// Handles the "Edit" action for a specific entry.
const handleEditEntry = function (id){
    console.log(`Delete button clicked for ID:${id} functionality added in week 7`);

    resetAllUIStates();
};

// Initializes the application by setting up event listeners for form submission and clearing
const init = function () {
    console.log('App initialized: DOM is ready! submitting the form or clearing it.')
    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
    resultDisplay.hideResults();
    // On startup, attempt to load any previously saved entries from localStorage.
    const loadedEntries = storage.loadEntries();
    if(loadedEntries.length > 0){
        // If no data is found in localStorage, return an empty array. carbonFootprintEntries array using spread operator
        carbonFootprintEntries.push(...loadedEntries);
        console.log('Entries loaded from LocalStorage'); }
    else {
        console.log('No entres found in localStorage starting fresh')
    }
    // 1. Find the index of the entry to delete in our in-memory array.
    // Render the table immediately on page load with any loaded data.
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    // init function - Event listener for "Clear All Data"
    clearAllDataButton.addEventListener('click', function (event){
        event.stopPropagation(); // Prevents this click from potentially triggering other global click listeners.
        if(isConfirmingClearAll) {
            // Second click: User confirms, so perform the action.
            performClearAllData(); }
        else {
            // First click: Ask for confirmation by changing button text and state.
            isConfirmingClearAll = true;
            clearAllDataButton.textContent = 'Are you sure? Click again';
            // Add a class to change its appearance (defined in style.css).
            clearAllDataButton.classList.add('confirm-state');
            // Set a timeout to automatically revert the button state if the user doesn't click again.
            clearAllTimeoutId = setTimeout(function (){
                resetClearAllButton();

            }, 3000); // 3 seconds
        }

    });

    // Global click listener to reset the "Clear All Data" button state
    // if the user clicks anywhere else on the page while confirmation is pending.
    // Only reset if we are in a confirming state AND the click was outside the button itself.
    document.addEventListener('click', function (event) {

        if(isConfirmingClearAll && event.target !== clearAllDataButton){
            resetClearAllButton();
        }
    });

};



// Triggers the initialization function once the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', init);