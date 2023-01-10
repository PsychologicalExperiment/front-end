node {
  stage('Build') {
    steps {
      sh 'npm install'
      sh 'npm run build'
    }
  }
  stage('Deploy') {
    steps {
      sh 'cp -r dist/* /psychology/'
    }
  }
}
