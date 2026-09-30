const LOCAL_STORAGE_KEY = 'tshirt_orders_data';

export const saveOrders = function(tshirt_orders_data){

    try{
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tshirt_orders_data)); }
    catch (error){
        console.error(`Error saving data to localStorage: ${error}`);
    }

};

export const loadOrders = function (){
    try{
        const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
        if(dataString) return JSON.parse(dataString)
        else return []; }
    catch (e){
        console.error(`Error loading entries from localStorage: ${e}`);
    }
};

export const clearAllEntries = function () {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    console.log('All entries cleared from localStorage')
}