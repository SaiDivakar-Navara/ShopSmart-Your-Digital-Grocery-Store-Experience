const mongoose = require("mongoose");
const db= 'Your MongoDB Connection String Here'
// Connect to MongoDB using the connection string

mongoose.connect(db,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {   
  console.log(`No connection: ${e}`);   
});
