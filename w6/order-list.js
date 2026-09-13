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
        <td>$${order.totalPrice}</td>`;

       tbody.appendChild(row)
        }
    }



