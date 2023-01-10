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
                sh 'rm -rf /var/lib/jenkins/workspace/_main/node_modules'
		sh 'npm remove package-lock.json'
                sh 'npm install' 
            }
        }
    }
}
