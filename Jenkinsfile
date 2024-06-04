pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code from the Git repository
                git 'https://github.com/yourusername/your-nodejs-project.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies using npm
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                // Run tests using npm
                sh 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                // Build the project (if needed)
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                // Deploy the application (if needed)
                // This could involve copying files to a server, pushing a Docker image, etc.
                // Replace this step with your actual deployment process
            }
        }
    }
    
    post {
        success {
            // This block is executed if the pipeline succeeds
            echo 'Pipeline succeeded!'
        }
        failure {
            // This block is executed if the pipeline fails
            echo 'Pipeline failed!'
        }
        always {
            // This block is executed regardless of the pipeline result
            // Clean up or perform any necessary actions here
        }
    }
}
