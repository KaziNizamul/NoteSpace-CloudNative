# Build the Docker image
docker build -t notes-app-cloud-repo .

# Tag the Docker image
docker tag notes-app-cloud-repo:latest 058264221152.dkr.ecr.us-east-1.amazonaws.com/notes-app-cloud-repo:latest

# Push the Docker image
docker push 058264221152.dkr.ecr.us-east-1.amazonaws.com/notes-app-cloud-repo:latest
