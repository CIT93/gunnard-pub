//--- Part 3: Implement the form-handler.js module ---

// This module handles getting input values from the form and clearing it.
// Simplified: Only focuses on Household Size input for now.

// Reference to the main carbon footprint form element
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// Reference to the household members input field within the form
const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// Home Size reference
const homeSquareFootageInput = carbonFootprintForm.querySelector('#homeSquareFootage');

// Apartment Checkbox reference
const isApartmentInput = carbonFootprintForm.querySelector('#isApartment');

// Food Choices reference (radio buttons - we need to query for all with the same 'name')
// this returns a node list, which is array "like"
// An Array is a list of items array[index]
const dietTypeRadios = carbonFootprintForm.querySelectorAll('input[name="dietType"]');
const foodPackagingRadios = carbonFootprintForm.querySelectorAll('input[name="foodPackaging"]');

// @param {NodeList} radioButtons - A NodeList (like an array) of radio button elements.
// @returns {string} The 'value' attribute of the selected radio button.
const getSelectedRadioValue = function (radioButtons) {
    // Loop over the node list to find the radio button checked (clicked)
    // for...of to loop over node list (array like)
    //let selectDietType = null
    for(const radio of radioButtons){
        // Code to be executed for each value
        if(radio.checked) {
            console.log(`${radio.value} has attribute of ${radio.checked}`);
            return radio.value;
        }
    }
};

export const  getFormInputs = function () {
    console.log('Get Form Inputs');

    return {
        householdMembers: parseInt(householdMembersInput.value) || 1,
        homeSquareFootage: parseInt(homeSquareFootageInput.value) || 0,
        isApartment: isApartmentInput.checked,
        dietType: getSelectedRadioValue(dietTypeRadio),
        foodPackaging: getSelectedRadioValue(foodPackagingRadios)
    };
};

// Clears all input fields in the form and resets default selections.
export const clearForm = function (){
    carbonFootprintForm.reset();
    householdMembersInput.value = 1;
    homeSquareFootageInput.value=0;
    dietTypeRadios[0].checked = true;
    foodPackagingRadios[0].checked = true;
    console.log('Clear Form');
};