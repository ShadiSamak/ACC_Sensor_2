#FROM python:3.9-alpine


# WORKDIR /app/frontend
# RUN apk update && apk upgrade && \
#     apk add nodejs \
#     npm                       
    
# RUN npm install
# RUN npm run build

# WORKDIR /app/backend
# RUN pip install --no-cache-dir -r requirements.txt
# #RUN apk add r-base
# CMD ["python", "__main__.py"]







# Stage 1: Build the React.js frontend
FROM node:14 AS frontend-build

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining frontend project files to the working directory
COPY frontend/ ./

# Build the React app
RUN npm run build

# Stage 2: Build the Python backend
FROM python:3.9 AS backend-build

# Set the working directory in the container
WORKDIR /app/backend

# Copy requirements.txt to the working directory
COPY backend/requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the remaining backend project files to the working directory
COPY backend/ ./

# Expose port 8080 for the Python backend
EXPOSE 8080

# Run the Python backend
CMD ["python", "__main__.py"]