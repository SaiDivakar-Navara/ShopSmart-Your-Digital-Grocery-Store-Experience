const mongoose = require("mongoose");
const db= 'mongodb+srv://nani:GxqCT1VPqTzjU1ub@shopsmart.nlqzspn.mongodb.net/?appName=ShopSmart'
// Connect to MongoDB using the connection string

mongoose.connect(db,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {   
  console.log(`No connection: ${e}`);   
});
