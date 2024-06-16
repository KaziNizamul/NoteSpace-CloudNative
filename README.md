# ☁️ NoteSpace
### Cloud Native Notes Keeping App

<br>

## Overview

NoteSpace is a note-taking application built with React, designed to demonstrate a full-stack development setup including frontend, serverlebackend, and infrastructure as code. The application allows users to create, update, delete, and view notes. It integrates with AWS services such as Cognito for user authentication, DynamoDB for data storage, and Lambda for serverless backend logic.

<div align="center">
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/></code>
	<code><img width="50" src="https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png" alt="Vite" title="Vite"/></code>
  <code><img width="50" src="https://user-images.githubusercontent.com/25181517/190887795-99cb0921-e57f-430b-a111-e165deedaa36.png" alt="Ant Design" title="Ant Design"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" title="Docker"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183896132-54262f2e-6d98-41e3-8888-e40ab5a17326.png" alt="AWS" title="AWS"/></code>
</div>
<br>
<div align="center">
	<code><img width="50" height="40" src="https://unpkg.com/aws-icons@2.0.0/icons/architecture-service/AmazonCognito.svg" alt="AWS Cognito" title="Cognito" /></code>
  <code><img width="50" height="40" src="https://unpkg.com/aws-icons@2.0.0/icons/architecture-service/AmazonDynamoDB.svg" alt="AWS DynamoDB" title="DynamoDB" /></code>
  <code><img width="50" height="40" src="https://unpkg.com/aws-icons@2.0.0/icons/architecture-service/AWSLambda.svg" alt="AWS Lambda" title="Lambda" /></code>
  <code><img width="50" height="40" src="https://unpkg.com/aws-icons@2.0.0/icons/architecture-service/AmazonAPIGateway.svg" alt="AWS API Gateway" title="API Gateway" /></code>
  <code><img width="50" height="40" src="https://unpkg.com/aws-icons@2.0.0/icons/architecture-service/AmazonSimpleNotificationService.svg" alt="AWS SNS" title="Simple Notify Service" /></code>
  <code><img width="50" height="40" src="https://unpkg.com/aws-icons@2.0.0/icons/architecture-service/AmazonElasticContainerRegistry.svg" alt="AWS ECR" title="Elastic Container Registry" /></code>
  <code><img width="50" height="40" src="https://unpkg.com/aws-icons@2.0.0/icons/architecture-service/AmazonElasticContainerService.svg" alt="AWS ECS" title="Elastic Container Service" /></code>
  <code><img width="50" height="40" src="https://unpkg.com/aws-icons@2.0.0/icons/architecture-service/AWSCloudFormation.svg" alt="AWS Cloudformation" title="Cloudformation" /></code>
</div>

<br>
<br>

## Architecture Diagram

![notespace](https://github.com/KaziNizamul/NoteSpace-CloudNative/assets/19683035/701ed096-d0bd-4ed8-b9b7-190fd9648448)


<br>

## Features

- **Frontend**: Built with React, utilizing libraries such as React Query for data fetching, Axios for HTTP requests, and React Router for navigation.
- **Backend**: Serverless architecture with AWS Lambda functions.
- **Authentication**: User authentication is handled through Amazon Cognito.
- **Database**: Notes are stored in AWS DynamoDB.
- **Infrastructure as Code**: AWS resources are defined and deployed using CloudFormation templates.

## Demo

https://github.com/KaziNizamul/NoteSpace-CloudNative/assets/19683035/cfff0af2-bc86-413b-a877-70ab1930ee26



## Setup

### Prerequisites

- Node.js (v16)
- AWS CLI, configured with appropriate access rights
- Docker (for containerization)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/kazinizamul/termproject.git
cd termproject
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure AWS Resources**

Deploy the CloudFormation stacks located in the `/cloudformation` directory to set up the required AWS resources (API Gateway, Cognito, DynamoDB, SNS, ECS, ECR, and Lambda functions).

```bash
aws cloudformation deploy --template-file cloudformation/stack.yaml --stack-name <stack_name>
```

## Deployment Overview:

The deployment process involves two scripts, app-deploy.sh and updateEnv.sh, along with docker-deploy.sh for containerization.


`app-deploy.sh`: This script initiates the deployment process by first updating environment variables using updateEnv.sh. If successful, it proceeds to deploy Docker containers with docker-deploy.sh.

`updateEnv.sh`: This script automatically sets up our project's environment variables by extracting AWS resource details and credentials, then writes them to a .env file.
Here's what it does:

- Sets the AWS region and SNS topic ARN directly.
= Extracts AWS credentials (Access Key ID, Secret Access Key, Session Token) from the local AWS credentials file.
- Fetches the Cognito User Pool ID and Client ID by querying AWS services.
- Retrieves the API Gateway base URL for the "notes" service.
- Environment Variables Extracted:
	- VITE_AWS_REGION: The AWS region.
	- VITE_SNS_TOPIC_ARN: The ARN for an SNS topic.
	- VITE_AKID, VITE_SAK, VITE_ST: AWS credentials (Access Key ID, Secret Access Key, Session Token).
	- VITE_USERPOOL_ID: Cognito User Pool ID.
	- VITE_CLIENT_ID: Cognito User Pool Client ID.
	- VITE_BASE_URL: API Gateway base URL.

`docker-deploy.sh`: script is responsible for deploying the application using Docker. Here's a simplified breakdown of its steps:

Build the Docker Image: Creates a Docker image named notes-app-cloud-repo from the Dockerfile in the project. This image includes the application and all its dependencies.

```bash
docker build -t <repo-name> .
```
Tag the Docker Image: Tags the recently built image with the repository location in AWS Elastic Container Registry (ECR), specifying it as the latest version. This step prepares the image to be pushed to ECR.

```bash
docker tag <repo-name>:<tag> <ecr-docker-repo-url>
```
Push the Docker Image to ECR: Uploads the tagged image to AWS ECR, making it available for deployment on AWS services like ECS or EKS.

```bash
docker push <ecr-docker-repo-url>:<tag>
```
This script automates the process of building, tagging, and pushing the Docker image to AWS, simplifying the deployment of the application in a containerized environment.
This will build a Docker image for the project and run it, exposing the application on port 80.


<hr>

## Deployment & Access

The `docker-deploy.sh` script as mentioned above uploads our Docker image to `ECR`. This is our application's image repository.

`ECS` uses the Docker image stored in ECR to run instances of our application. The `cloudformation/stack.yml` CloudFormation template we have sets up the ECS cluster, service, and task definition needed for this. It specifies:

- ECS Cluster: A logical grouping of tasks or services.
- Task Definition: Describes how a Docker container should launch. It references the Docker image in ECR.
- Service: Ensures our application is running the specified number of instances as defined in the task definition.

Once deployed, ECS manages the instantiation of our application containers based on the task definition.
The ECS service is configured to use a load balancer, which distributes incoming traffic across the instances of our application.

<hr> 

`Accessing Deployed Application:` We can find the URL to access our deployed application in the ECS console. Under the "Tasks" section of our ECS service, we'll see the running instances of our task definition. 

The load balancer associated with our ECS service will have a public DNS name, which serves as the URL to access our application.
In summary, after our Docker image is pushed to ECR, ECS uses the configurations defined in our CloudFormation template (stack.yml) to deploy our application. The deployed application is accessible via a URL provided by the load balancer associated with our ECS service.


