const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Database name
const dbName = "GREENITS";
const connectdb = async () =>  {
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log(`Connected to the ${dbName} database.`);
    client.close();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = connectdb
