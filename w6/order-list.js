const orderHistorySection = document.getElementById('order-history-section');

const formatDisplayDate = function (timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString(`en-US`, {
        year: `numeric`, month: `short`, day: `numeric`
    });
};


export const renderTable = function (orders){
    const tbody = document.getElementById(`order-table-body`)
    tbody.innerHTML = ``;

    for(const  order of orders){
        const row = orderHistorySection.createElement('tr');

        row.innerHTML = `
        <td>${formatDisplayDate(order.timestamp)}</td>
        <td>${order.qty}</td>
        <td>${order.size}</td>
        <td>${order.total}</td>`;

       tbody.appendChild(row)
        }
    }

