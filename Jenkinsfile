pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-u root:root -p 9899:9899' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
		sh 'npm run build' 
            }
        }
    }
}
