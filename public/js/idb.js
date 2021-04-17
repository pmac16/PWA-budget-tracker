//create variable to hold db connection
let db;

//establish a connection to IndexedDB database called '_'
const request = indexedDB.open('budget', 1);

//this event will emit if the database version changes 
request.onupgradeneeded = function(event) {
    //save a reference to the database
    const db = event.target.result;
    //create an object store called `new_transaction`. set it to have an auto incrementing primary key
    db.createObjectStore('new_transaction', {autoIncrement: true})
};

//upon a successful

request.onsuccess = function(event) {
    //when db is successfully created with its object store
    db = event.target.result;

    //check if app is online, if yes run uploadTransaction() function 
    if (navigator.onLine) {
        //uploadTransaction();
    }
};

request.onerror = function(event) {
    //log error here
    console.log(event.target.errorCode);

}

//This function will be executed if we attempt to submit a transaction and there is no internet connection
function saveTransaction(record) {
    //open a new transaction with the database with read and write permissions
    const transaction = db.transaction(['new_transaction'], 'readwrite');

    //access the object store for 'new_transaction'
    const transactionObjectSTore = transaction.objectStore('new_transaction');

    //add record to your store with add method
    transactionObjectSTore.add(record);
}