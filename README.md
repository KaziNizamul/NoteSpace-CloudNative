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
  <code><img width="50" height="40" src="https://unpkg.com/aws-icons@2.0.0/icons/architecture-service/AmazonCognito.svg" alt="AWS Icons" title="Cognito" /></code>

</div>

## Features

- **Frontend**: Built with React, utilizing libraries such as React Query for data fetching, Axios for HTTP requests, and React Router for navigation.
- **Backend**: Serverless architecture with AWS Lambda functions.
- **Authentication**: User authentication is handled through Amazon Cognito.
- **Database**: Notes are stored in AWS DynamoDB.
- **Infrastructure as Code**: AWS resources are defined and deployed using CloudFormation templates.

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
aws cloudformation deploy --template-file cloudformation/<template_name>.yaml --stack-name <stack_name>
```

4. **Set up Environment Variables**

Configure the necessary environment variables for the frontend to interact with the deployed AWS services. This includes API endpoints, Cognito User Pool IDs, etc.

5. **Run the Application Locally**

```bash
npm start
```

This command will start the development server using Vite, as configured in `vite.config.js`, and the application will be accessible at `http://localhost:80`.

### Docker Setup

To containerize the application, use the provided Dockerfile.

```bash
docker build -t termproject .
docker run -p 80:80 termproject
```

This will build a Docker image for the project and run it, exposing the application on port 80.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs, feature requests, or documentation improvements.

## License

Specify the license under which the project is made available.

---

This README provides a basic overview and setup instructions for the term project. Adjustments and additional details should be added as necessary to match the project's current state and future developments.
