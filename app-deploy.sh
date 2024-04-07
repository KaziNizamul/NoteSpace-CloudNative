#!/bin/bash

# Run the script to update environment variables
./updateEnv.sh

# Check if the updateEnv.sh script executed successfully
if [ $? -eq 0 ]; then
    echo "Environment variables updated successfully."
    # Run the script to deploy Docker containers
    ./docker-deploy.sh
else
    echo "Failed to update environment variables. Aborting Docker deployment."
fi