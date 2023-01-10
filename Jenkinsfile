pipeline {
   agent { docker 'node:19.3.0' }
   stages {
     stage('build') {
        steps {
           sh 'npm install'
           sh 'npm run build'
        }
     }
   }
}
