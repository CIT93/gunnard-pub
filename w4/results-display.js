const resultsContainer = document.getElementById('order-summary');

const totalCostDisplay = resultsContainer.querySelector('#display-total');
const qtyDisplay = resultsContainer.querySelector('#display-qty');
const sizeDisplay = resultsContainer.querySelector('#display-size');
const giftDisplay = resultsContainer.querySelector('#display-gift');

export const displayResults = function (newOrder){
    totalCostDisplay.textContent = `${newOrder.totalPrice.toFixed(1)}`
    qtyDisplay.textContent = `${newOrder.qty}`
    sizeDisplay.textContent = `${newOrder.size}`

    if (newOrder.giftWrap === false)  giftDisplay.textContent = `No`
    else giftDisplay.textContent = `Yes`

    resultsContainer.style.display = 'block';
}

export const hideResults = function () {
    resultsContainer.style.display = 'none';
}