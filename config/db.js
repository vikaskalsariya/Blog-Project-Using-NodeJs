// const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1/AdminPanel");

// const db = mongoose.connection;

// db.once('open', (err) =>{
//     if(err) 
//     {
//         console.log("Mongodbdb not connected");
//         return false;
//     }
//     console.log("mongodb is connected");
// })

// module.exports = db;

const mongoose = require('mongoose')

const url = `mongodb+srv://vrkalsariya2004:Ie5Mv8ohLrIntwNN@adminpanle.iuc0g92.mongodb.net/AdminPanle`;

 mongoose.connect(url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


// vrkalsariya2004
// Ie5Mv8ohLrIntwNN