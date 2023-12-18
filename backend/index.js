const express = require('express');
const mongoose = require('mongoose')
const {User} = require("./models/models")
require('dotenv').config()

const app = express();

const connectionString = process.env.DB_CONN_STRING

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection error"))
db.once('open', () => {
  console.log('Connected to MongoDB successfully.');
})

const createDummyUser = async () => {
  let user = new User({
    name: 'Reshad',
    age: 24
  })
  await user.save()
}

app.get('/dummy', async (req, res) => {
  await createDummyUser()
  res.send('Created User!');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
