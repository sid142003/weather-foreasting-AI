import pandas as pd

# Load the CSV data into a DataFrame
data = pd.read_csv("./data.csv")
# Assuming your model expects columns in the order: temperature, humidity, wind speed
# Adjust the column names as per your CSV file
input_data = data[['temp', 'humidity', 'sealevelpressure']].values.astype(np.float32)

# Check for missing values and handle them appropriately
input_data = np.nan_to_num(input_data)  # Replace NaN with zero

# Normalize or scale your data if the model expects it (example placeholder)
# input_data = (input_data - mean) / std  # mean and std should be the same as used during model training

# Reshape the data if the model expects a specific input shape, e.g., adding a batch dimension
input_data = np.expand_dims(input_data, axis=0)  # Use this if expecting one sample at a time

from huggingface_hub import from_pretrained_keras

# Load your Keras model from Hugging Face
model = from_pretrained_keras("siddhant-14/weather_new")

# Make predictions
predictions = model.predict(input_data)
print("Predicted output:", predictions)