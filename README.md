# Weather Forecasting System

## Overview
The **Weather Forecasting System** is an IoT-based solution designed to monitor and predict environmental conditions using a combination of hardware sensors and machine learning models. The system captures real-time data, such as temperature, humidity, air quality, and pressure, sends it to a server, and stores it in a CSV file. A machine learning model then predicts weather conditions for the next 6 hours based on historical data. The predicted data is displayed on the frontend via an API.

## Features
- **Real-time Data Collection:** The system collects environmental data every hour using various sensors connected to a NodeMCU.
- **Data Storage:** Collected data is sent to a server and stored in a CSV file for further analysis.
- **Weather Prediction:** A machine learning model trained on a one-month dataset from Gandhinagar predicts weather conditions for the next 6 hours.
- **API Integration:** Predicted data is served via an API and displayed on the frontend.
- **User Interface:** A responsive and user-friendly interface built with HTML, CSS, and JavaScript.

## Hardware Components
- **NodeMCU:** Microcontroller used to connect sensors and send data to the server.
- **BMP Sensor:** Measures atmospheric pressure.
- **MQ135 Sensor:** Measures air quality.
- **DHT11 Sensor:** Measures temperature and humidity.

## Software Components
- **Node.js:** Backend server to collect data, store it in CSV files, and handle API requests.
- **HTML/CSS/JavaScript:** Frontend technologies used to build the user interface.
- **Arduino:** Used to program the NodeMCU and interface with the sensors.

## Data Flow
1. **Data Collection:** Sensors connected to the NodeMCU collect environmental data every hour.
2. **Data Transmission:** The data is sent to a Node.js server and stored in a CSV file.
3. **Prediction:** A pre-trained machine learning model processes the collected data and predicts weather conditions for the next 6 hours.
4. **API:** The predicted data is served via an API endpoint.
5. **Frontend Display:** The data is displayed on the frontend using a responsive interface.

## Model Training
The machine learning model was trained using a one-month dataset from Gandhinagar. It focuses on predicting weather conditions for short-term intervals (6 hours). The model was developed and fine-tuned to ensure accurate predictions based on historical data patterns.

## How to Run the Project

### Prerequisites
- Node.js installed
- Arduino IDE installed

### Steps to Run

1. **Set Up Hardware:**
   - Connect the BMP, MQ135, and DHT11 sensors to the NodeMCU as per the circuit diagram.

2. **Upload Code to NodeMCU:**
   - Use the Arduino IDE to upload the sensor data collection code to the NodeMCU.

3. **Set Up Backend:**
   - Clone the repository.
   - Navigate to the backend directory.
   - Run `npm install` to install the dependencies.
   - Start the server using `node server.js`.

4. **Train the Model:**
   - If you want to retrain the model, run the model training script with the Gandhinagar dataset.

5. **Run the Frontend:**
   - Navigate to the frontend directory.
   - Open `index.html` in your preferred browser.

## API Endpoints
- **GET /api/latest-prediction:** Fetches the latest 6-hour weather predictions.
