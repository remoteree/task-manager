const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const { Task } = require("./models/models")
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors({origin: '*'}))

const connectionString = process.env.DB_CONN_STRING

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, "MongoDB connection error"))
  db.once('open', () => {
    console.log('Connected to MongoDB successfully.');
  })
}  

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});


const server = app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

module.exports.app = app;
module.exports.server = server;