#include <ESP8266WiFi.h>
#include <DHT.h>
#include <Adafruit_BMP085.h>
#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

// WiFi setup
const char* ssid = "iQOO"; // WiFi SSID
const char* password = "00000000"; // WiFi Password
const char* serverAddress = "192.168.113.229"; // Server IP address
const int serverPort = 5000; // Server Port

// DHT11 setup
#define DHTPIN 2 // DHT11 Pin
#define DHTTYPE DHT11 // DHT type
DHT dht(DHTPIN, DHTTYPE);

// BMP180 setup
Adafruit_BMP085 bmp;     

// MQ135 setup
const int MQ135_ANALOG_PIN = A0; // MQ135 Analog Pin

WiFiClient client;

void setup() {
  Serial.begin(9600); // Start Serial Communication
  WiFi.begin(ssid, password); // Connect to WiFi

  // Check WiFi connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP()); // Display the IP Address

  dht.begin(); // Initialize DHT sensor
  if (!bmp.begin()) { // Initialize BMP180
    Serial.println("Could not find a valid BMP180 sensor, check wiring!");
    while (1); // Stop execution if no sensor is found
  }
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    sendPostRequest(); // Send POST request if WiFi is connected
  } else {
    Serial.println("WiFi not connected!");
  }
  delay(10000); // Delay between POST requests
}

void sendPostRequest() {
  float humidity = dht.readHumidity(); // Read humidity
  float temperature = dht.readTemperature(); // Read temperature
  float pressure = bmp.readPressure(); // Read pressure
  int mq135AnalogValue = analogRead(MQ135_ANALOG_PIN); // Read MQ135 value

  // Check if any readings failed and exit early (optional)
  if (isnan(humidity) || isnan(temperature) || isnan(pressure)) {
    Serial.println("Failed to read from sensors!");
    return;
  }

  HTTPClient http; // Declare object of class HTTPClient
  String serverPath = "http://192.168.113.229:5000/data";

  http.begin(client, serverPath); // Specify request destination
  http.addHeader("Content-Type", "application/json"); // Specify content-type header

  // Create JSON document
  StaticJsonDocument<400> doc;
  doc["temperature"] = temperature;
  doc["humidity"] = humidity;
  doc["pressure"] = pressure / 100.0; // Convert pressure to hPa
  doc["mq135AnalogValue"] = mq135AnalogValue;

  String httpRequestData;
  serializeJson(doc, httpRequestData); // Serialize the JSON data
  Serial.println("Sending this JSON:");
  Serial.println(httpRequestData);

  // Send the POST request
  int httpResponseCode = http.POST(httpRequestData);

  if (httpResponseCode > 0) {
    String response = http.getString(); // Get the response
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    Serial.println("Response: ");
    Serial.println(response);
  } else {
    Serial.print("Error on sending POST: ");
    Serial.println(httpResponseCode);
  }

  http.end(); // Close connection
}
