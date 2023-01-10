node {
  stage('Build') {
      sh 'cd front-end'
      sh 'git pull'
      sh 'npm install'
      sh 'npm run build'
  }
  stage('Deploy') {
      sh 'cp -r front-end/dist/* /psychology/'
  }
}
