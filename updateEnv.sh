#!/bin/bash

# Set default region
echo "VITE_AWS_REGION=us-east-1" >> .env
echo "VITE_SNS_TOPIC_ARN=arn:aws:sns:us-east-1:058264221152:notes-app-cloud-sns-topic" >> .env

# Extract credentials from AWS credentials file
aws_access_key_id=$(grep "aws_access_key_id" ~/.aws/credentials | cut -d "=" -f 2 | tr -d '[:space:]')
aws_secret_access_key=$(grep "aws_secret_access_key" ~/.aws/credentials | cut -d "=" -f 2 | tr -d '[:space:]')
aws_session_token=$(grep "aws_session_token" ~/.aws/credentials | cut -d "=" -f 2 | tr -d '[:space:]')

# Write the credentials to the .env file
echo "VITE_AKID=$aws_access_key_id" >> .env
echo "VITE_SAK=$aws_secret_access_key" >> .env
echo "VITE_ST=$aws_session_token" >> .env

echo "Credentials added to .env file."

#------ 



userPoolName="notesAppUserPool"
stageName="development"

# Execute the first AWS CLI command to list user pools and store the output in a variable
aws_output=$(aws cognito-idp list-user-pools --max-results 20)

pool_id=$(echo "$aws_output" | jq -r '.UserPools[] | select(.Name == "'"$userPoolName"'") | .Id')

# Check if pool_id is not empty
if [ -n "$pool_id" ]; then
    # Write the pool ID to the .env file
    echo "VITE_USERPOOL_ID=$pool_id" >> .env
    echo "Pool ID added to .env file."
    
    # Execute the second AWS CLI command to list user pool clients
    clients_output=$(aws cognito-idp list-user-pool-clients --user-pool-id "$pool_id")

    # Extract the Client ID from the output
    client_id=$(echo "$clients_output" | jq -r '.UserPoolClients[0].ClientId')

    # Check if client_id is not empty
    if [ -n "$client_id" ]; then
        # Write the client ID to the .env file
        echo "VITE_CLIENT_ID=$client_id" >> .env
        echo "Client ID added to .env file."

        # Execute the AWS CLI command to get the REST API with name "notes" and retrieve base URL
        base_url=$(aws apigateway get-rest-apis | jq -r '.items[] | select(.name == "notes") | "https://\(.id).execute-api.'us-east-1'.amazonaws.com/'"$stageName"'"')

        # Write the base URL to the .env file
        echo "VITE_BASE_URL=$base_url" >> .env
        echo "Base URL added to .env file."
    else
        echo "Client ID not found for the user pool."
    fi
else
    echo "User pool $userPoolName not found."
fi
