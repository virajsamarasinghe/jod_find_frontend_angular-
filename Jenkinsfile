pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'angular-app:v1' // Local Minikube Image
        K8S_DEPLOYMENT = 'deployment.yaml'
        MINIKUBE_IP = '192.168.49.2' // Minikube IP Address
        SERVICE_PORT = '80' // Service Port
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/virajsamarasinghe/jod_find_frontend_angular-.git'
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
                script {
                    sh 'eval $(minikube docker-env)' // Use Minikube's Docker
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'kubectl apply -f $K8S_DEPLOYMENT --context=minikube'
                    sh 'kubectl rollout status deployment/angular-app --context=minikube' // Ensure deployment success
                }
            }
        }

        stage('Post-Deployment Tests') {
            steps {
                script {
                    // Test the deployed application
                    sh "curl -f http://${MINIKUBE_IP}:${SERVICE_PORT}" // Test the application
                }
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD Pipeline Execution Successful!'
        }
        failure {
            echo '❌ Pipeline Execution Failed!'
        }
    }
}
