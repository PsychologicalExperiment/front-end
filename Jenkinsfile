node {
  stage('Build') {
      sh 'npm install'
      sh 'npm run build'
  }
  stage('Deploy') {
      sh 'cp -r dist/* /psychology/'
  }
}
