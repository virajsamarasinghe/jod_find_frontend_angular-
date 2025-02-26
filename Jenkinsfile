pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'angular-app' // No need for Docker Hub for Minikube
        K8S_DEPLOYMENT = 'deployment.yaml'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'npm run build --configuration=production'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Use Minikube's Docker daemon
                sh 'eval $(minikube docker-env) && docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                // Apply the deployment using the Minikube context
                sh 'kubectl apply -f $K8S_DEPLOYMENT --context=minikube'
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline Execution Successful!'
        }
        failure {
            echo 'Pipeline Execution Failed!'
        }
    }
}
