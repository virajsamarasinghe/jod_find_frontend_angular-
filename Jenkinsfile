pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Name of the Node.js installation
    }

    environment {
        PATH = "/usr/local/bin:/opt/homebrew/bin:$PATH"
        MINIKUBE_HOME = "${env.WORKSPACE}/.minikube"
        DOCKER_IMAGE = 'angular-app:v1' // Local Minikube Image
        K8S_DEPLOYMENT = 'deployment.yaml'
        MINIKUBE_IP = '192.168.49.2' // Minikube IP Address
        SERVICE_PORT = '80' // Service Port
    }

    stages {
        stage('Check Docker and Minikube') {
            steps {
                script {
                    sh 'minikube delete || true' // Ensure a fresh Minikube start
                    def exitCode = sh(script: '''
                        minikube start --driver=docker --kubernetes-version=v1.28.0 --addons=default-storageclass=false,storage-provisioner=false
                    ''', returnStatus: true)

                    if (exitCode != 0) {
                        error "Minikube failed to start. Check logs for more details."
                    }

                    sh '''
                        echo "Docker Version:"
                        docker --version
                        echo "Minikube Status:"
                        minikube status
                    '''
                }
            }
        }

        stage('Verify Kubernetes API Server') {
            steps {
                script {
                    def retries = 3
                    for (int i = 0; i < retries; i++) {
                        def apiCheck = sh(script: 'kubectl cluster-info', returnStatus: true)
                        if (apiCheck == 0) {
                            echo "✅ Kubernetes API server is running."
                            break
                        } else {
                            echo "Retrying Kubernetes API server check ($i/$retries)..."
                            sleep(10)
                        }
                        if (i == retries - 1) {
                            error "❌ Kubernetes API server failed to start."
                        }
                    }
                }
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/virajsamarasinghe/jod_find_frontend_angular-.git'
            }
        }

        stage('Check Node Version') {
            steps {
                sh 'node -v'
                sh 'npm -v'
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
                    sh 'kubectl rollout status deployment/angular-app --context=minikube'
                }
            }
        }

        stage('Post-Deployment Tests') {
            steps {
                script {
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
        always {
            echo '🧹 Cleaning up Minikube...'
            sh 'minikube stop || true'
            sh 'minikube delete || true'
        }
    }
}
