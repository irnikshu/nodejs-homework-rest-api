const mongoose = require("mongoose")


const app = require('./app')

const { DB_HOST } = process.env;


//oIHe8b9sZcH4utSi



mongoose.connect(DB_HOST)
  .then(() => app.listen(3000), console.log("Database connection successful"))
  .catch(error =>{
    console.log(error.message);
    process.exit(1);
  });



