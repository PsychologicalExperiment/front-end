node {
  stage('Build') {
      sh 'git clone git@github.com:PsychologicalExperiment/front-end.git'
      sh 'cd front-end'
      sh 'npm install'
      sh 'npm run build'
  }
  stage('Deploy') {
      sh 'cp -r dist/* /psychology/'
  }
}
