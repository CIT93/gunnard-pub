const orderHistorySection = document.getElementById('order-history-section');
const clearAllDataButton = document.getElementById('clear-btn');

// order-list.js top of file
let moduleCallbacks = {};

/*
let currentConfirmingRowElement = null;
let currentConfirmTimeoutID = null;

const showDeleteConfirmingButtons = function (actionCell, id, onDeleteCallback){
    const editButton = actionCell.querySelector('.action-button.edit-btn');
    const deleteButton = actionCell.querySelector('.action-button.delete-btn');
    if (editButton) editButton.style.display = 'none';
    if (deleteButton) deleteButton.style.display = 'none';

    // Create and append confirmation buttons
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = "Confirm Delete";
    confirmBtn.classList.add('action-button', 'confirm'); // Add styling class
    confirmBtn.dataset.id = id;

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add('action-button', 'cancel'); // Add styling class
    cancelBtn.dataset.id = id;

    // update table with new confirmation buttons
    actionCell.appendChild(confirmBtn);
    actionCell.appendChild(cancelBtn);

    // Set timeout to revert button if no action

    currentConfirmTimeoutID = setTimeout(function () {
        resetRowConfirmationState();
    }, 3000)

    confirmBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        onDeleteCallback(id);
        resetRowConfirmationState();
    })

    cancelBtn.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
        resetRowConfirmationState();
    })
    console.log(`Asking for confirmation for row id ${id}`);
};

const hideDeleteConfirmationButtons = function () {
    const editButton = currentConfirmingRowElement.querySelector('.action-button.edit-btn');
    const deleteButton = currentConfirmingRowElement.querySelector('.action-button.delete-btn');
    const confirmButton = currentConfirmingRowElement.querySelector('.action-button.confirm');
    const cancelButton = currentConfirmingRowElement.querySelector('.action-button.cancel');
    if(editButton) editButton.style.display = 'inline-block';
    if(deleteButton) deleteButton.style.display = 'inline-block';
    if(confirmButton) confirmButton.remove();
    if(cancelButton) cancelButton.remove();
};

export const resetRowConfirmationState = function () {
    if (currentConfirmingRowElement){
        if(currentConfirmTimeoutID){
            clearTimeout(currentConfirmTimeoutID);
            currentConfirmTimeoutID = null;
        }
        hideDeleteConfirmationButtons();
        currentConfirmingRowElement = null;
    }
};
*/

const formatDisplayDate = function (timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString(`en-GB`, {
        year: `numeric`, month: `2-digit`, day: `2-digit`});

};

const formatGiftWrap = function (giftWrapCheckbox) {
    if(giftWrapCheckbox) {return `YES`}
    else {return `NO`}
};

const tableBody = document.getElementById('order-table-body');

tableBody.addEventListener('click', function(event) {
    const target = event.target;
    // 1. Get the ID from the button that was clicked
    const id = target.dataset.id;
    // const actionCell = target.closest('td');  // only needed by the confirm-delete feature

    // 2. Guard Clause: If they clicked a row (white space) but NOT a button,
    // there will be no ID. So we stop the function immediately.
    if(!id) {return;}

    if(target.classList.contains('delete-btn') && typeof moduleCallbacks.onDelete === 'function'){
        // currentConfirmingRowElement = actionCell;
        // showDeleteConfirmingButtons(actionCell, id, moduleCallbacks.onDelete);

        // w8 challenge version: call the delete callback directly
        moduleCallbacks.onDelete(id); }
    else if(target.classList.contains('edit-btn') && typeof moduleCallbacks.onEdit === 'function'){
        // Clear any pending delete confirmation before editing
        // resetRowConfirmationState();
        // Call the edit callback provided by app.js
        moduleCallbacks.onEdit(id);
        //console.log('edit will be coded later')
    }

});

export const renderOrders = function (orders, callbacks){
    const tbody = document.getElementById(`order-table-body`)
    // Save the callbacks for later
    moduleCallbacks = callbacks;
    tbody.innerHTML = '';



    for(const  order of orders){
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${formatDisplayDate(order.timestamp)}</td>
        <td>${order.qty}</td>
        <td>${order.size}</td>
        <td>${formatGiftWrap(order.giftWrap)}</td>
        <td>$${order.totalPrice}</td>
        <td class = "action-cell"> 
            <button class="action-button edit-btn" data-id="${order.id}">Edit</button>
            <button class="action-button delete-btn" data-id="${order.id}">Delete</button>
        </td>`;


        tbody.appendChild(row)
    }
}