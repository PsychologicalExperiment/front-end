pipeline {
   agent { docker 'node:19.3.0' }
   stages {
     stage('build') {
        steps {
           sh 'npm cache clean --force'
           sh 'npm install'
           sh 'npm run build'
        }
     }
   }
}
