
# Use Python version 3.9 as a base image for the backend
FROM python:3.9

# Set the working directory for the backend
WORKDIR /app/backend

# Copy requirements.txt to the working directory for the backend
COPY requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend project files to the working directory
COPY . .

# Expose port 8080 for the Python backend
EXPOSE 8080

# Command to run the Flask app
CMD ["python", "__main__.py"]
