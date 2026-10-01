const orderHistorySection = document.getElementById('order-history-section');
const clearAllDataButton = document.getElementById('clear-btn');

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

    // 2. Guard Clause: If they clicked a row (white space) but NOT a button,
    // there will be no ID. So we stop the function immediately.
    if (!id) return;

    // 3. Temporary Test: Log the ID to prove it works!
    console.log("Clicked button with ID:", id);
});

export const renderOrder = function (orders){
    const tbody = document.getElementById(`order-table-body`)
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
            <button class="action-button edit" data-id="${order.id}">Edit</button>
            <button class="action-button delete" data-id="${order.id}">Delete</button>
        </td>`;


        tbody.appendChild(row)
    }
}



