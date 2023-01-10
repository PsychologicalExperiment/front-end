pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 9899:9899' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'chown -R 984:980 "/.npm"'
                sh 'npm install' 
            }
        }
    }
}
