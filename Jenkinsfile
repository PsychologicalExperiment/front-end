node {
  stage('Checkout') {
     git url: 'git@github.com:PsychologicalExperiment/front-end.git'
  }
  stage('Build') {
      sh 'npm install'
      sh 'npm run build'
  }
  stage('Deploy') {
      sh 'cp -r dist/* /psychology/'
  }
}
