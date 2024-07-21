const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define MongoDB schema
const Schema = mongoose.Schema;

// Define the schema for each object in the array
const dataEntrySchema = new Schema({
    Temp: Number,
    Humidity: Number,
    Pressure: Number,
    Datetime: Date,
    
});

// Define the main schema containing an array of data entries
const predictionsSchema = new Schema({
    data: [dataEntrySchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model based on the schema
const Prediction = mongoose.model('Prediction', predictionsSchema);

// Route to handle POST requests
app.post('/api/predictions', (req, res) => {
    console.log('Received predictions:', req.body);
    
    // Create a new Prediction document
    const newPrediction = new Prediction({
        data: req.body
    });

    // Save the newPrediction document to the database
    newPrediction.save()
        .then(() => {
            console.log('Prediction data saved successfully');
            res.status(200).send('Data received and saved');
        })
        .catch((error) => {
            console.error('Error saving prediction data:', error);
            res.status(500).send('Error saving prediction data');
        });
});
app.get('/api/latest-prediction', async (req, res) => {
    try {
        // Fetch the latest document, assuming 'createdAt' is a timestamp in your schema
        const latestPrediction = await Prediction.findOne().sort({ createdAt: 'desc' });


        if (latestPrediction) {
            res.status(200).json(latestPrediction);
        } else {
            res.status(404).send('No predictions found');
        }
    } catch (error) {
        console.error('Error fetching latest prediction:', error);
        res.status(500).send('Error fetching latest prediction');
    }
});





app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
