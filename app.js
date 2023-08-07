const express = require('express');
const app = express();

const mongoose = require("mongoose");
const {Sampling_Place} = require('./models/sampling_places')
const {Chemical_Index} = require('./models/chemical_indexes')

require('dotenv').config()


const PORT = 4000;

async function connectToDatabase() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database MongoDB connect successful");
        return connection;
    } catch (err) {
        console.log(`Something wrong with MongoDB ${err}`);
        return null;
    }
}

async function startServer() {
    try {
        const connection = await connectToDatabase();
        if (!connection) {
            console.log("Unable to connect to MongoDB. Exiting...");
            process.exit(1);
        }
        await app.listen(PORT);
        console.log(`Server has been started ${PORT}`);
    } catch (err) {
        console.log(`Error starting server: ${err}`);
        process.exit(1);
    }
}
//Middleware для обробки запитів
app.use(express.json());

//Routes
// Маршрут для отримання даних з MongoDB та їх відправлення на сторінку React
app.get('/api/places', async (req, res) => {
    try {
      const sampling_place = await Sampling_Place.find(); // Отримайте всі записи користувачів з MongoDB
      res.json(sampling_place); // Відправте дані на сторінку React у форматі JSON
    } catch (error) {
      console.error('Error fetching sampling_places:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

app.get('/api/chemical_indexes', async (req, res) => {
    try{
        const chemical_indexes = await Chemical_Index.find();
        res.json(chemical_indexes);
    } catch (error){
        console.error('Error fetching chimcal_indexes:', error);
        res.status(500).json({error: 'Server error'});
    }
});

startServer();

module.exports = {app, startServer};