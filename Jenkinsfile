pipeline {
    agent any

    stages {
        stage('Example Stage') {
            steps {
                echo 'Hello, world!'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed'
        }
    }
}
