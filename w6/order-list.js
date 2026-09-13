const orderHistorySection = document.getElementById('order-history-section');

const formatDisplayDate = function (timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString(`en-GB`, {
        year: `numeric`, month: `2-digit`, day: `2-digit`});

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
        <td>$${order.totalPrice}</td>`;

       tbody.appendChild(row)
        }
    }



