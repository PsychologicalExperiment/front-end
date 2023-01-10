pipeline {
   agent { docker 'node:19.3.0' }
   stages {
     stage('build') {
        steps {
           sh 'sudo chown -R 984:980 "/.npm"'
           sh 'npm install'
           sh 'npm run build'
        }
     }
   }
}
