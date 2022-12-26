//require the library
const mongoose = require('mongoose');

// from mongoose website
// main().catch(err => console.log(err));
// async function main() {
// await mongoose.connect('mongodb://localhost:8000/contacts_list_db');
// }

//connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection to check if it is successful
const db= mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open', function(){
    console.log('Successfully connected to the database');
});

