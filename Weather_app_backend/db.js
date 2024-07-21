const mongoose = require('mongoose');

// Replace 'your_database_name' with the name of your database
const dbName = 'Weather-Forcasr';

// Replace 'your_mongodb_connection_string' with your actual MongoDB connection string
const mongoURI = 'mongodb+srv://siddhantrbl2016:MXDGVyapINj2r4dM@cluster0.to0xgjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Export mongoose to use it in other files
module.exports = mongoose;
