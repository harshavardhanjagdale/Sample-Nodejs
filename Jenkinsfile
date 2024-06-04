pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code from the Git repository
                git url: 'https://github.com/harshavardhanjagdale/Sample-Nodejs'
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

        stage('Start Application') {
            steps {
                // Start the application using npm
                sh 'npm start'
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
            echo 'Pipeline completed'
        }
    }
}
