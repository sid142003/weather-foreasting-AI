const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const { DateTime } = require('luxon');

// Create an express app

const app = express();
const port = 5000;

app.use(cors());

// Middleware to parse JSON data
app.use(bodyParser.json());

const csvWriterInstance = csvWriter({
  path: 'data.csv',
  header: [
    { id: 'name', title: 'Name' },
    { id: 'date', title: 'Date' }, // Updated second column title to 'Date'
    { id: 'temp', title: 'Temp (°C)' }, // Changed temperature column title to 'Temp'
    { id: 'humidity', title: 'Humidity (%)' },
    { id: 'sealevelpressure', title: 'Sea Level Pressure (Pa)' }, // Changed pressure column title to 'Sea Level Pressure'
  ],
});

let latestTemperature = 0; 
let latestHumidity = 0;
let latestPressure = 0;
let latestMQ135AnalogValue = 0;
let weather = '';

let entryCount = 0;

// Route to handle POST requests from NodeMCU
app.post('/data', (req, res) => {
  const { temperature, humidity, pressure, mq135AnalogValue } = req.body;
  const currentDate = DateTime.now().toISO({ includeOffset: false });
  
  latestTemperature = temperature;
  latestHumidity = humidity;
  latestPressure = pressure;
  
  
  // Log the received data
  console.log('Received Data:');
  console.log(`Temperature: ${temperature} *C`);
  console.log(`Humidity: ${humidity} %`);
  console.log(`Pressure: ${pressure} Pa`);
  console.log(`MQ135 Analog Value: ${mq135AnalogValue}`);
  
  latestMQ135AnalogValue = mq135AnalogValue;

  entryCount++;
  if (entryCount > 24) {
    console.log('Entry count limit reached. Not writing to CSV file.');
    res.send('Entry count limit reached. Data not written to CSV file.');
    return; // Stop execution here
  }
  
    const data = [
      {
        name: 'Gandhinagar',
        date: currentDate,
        temp: temperature.toFixed(2), // Changed temperature field to 'temp'
        humidity: humidity.toFixed(2),
        sealevelpressure: pressure.toFixed(2), // Changed pressure field to 'sealevelpressure'
      },
    ];

    csvWriterInstance.writeRecords(data)
    .then(() => {
      console.log('Data written to CSV file');
      res.send('Data received successfully!');
    })
    .catch((error) => {
      console.error('Error writing data to CSV file:', error);
      res.status(500).send('Error writing data to CSV file');
    });
    
});


app.get('/temperature', (req, res) => {
  res.json({ temperature: latestTemperature , humidity: latestHumidity, pressure: latestPressure, mq135AnalogValue: latestMQ135AnalogValue  });
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
