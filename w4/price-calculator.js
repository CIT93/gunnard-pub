const tShirt = 15; //define price of tShirt
const wrapped = 2; //define price of gift wrap

//export function for totalPrice
export const calculateTotal = function (orderData) {
    let totalPrice = orderData.qty * tShirt;
    if(orderData.giftWrap){
        totalPrice += wrapped; }

    return {totalPrice: totalPrice};
};