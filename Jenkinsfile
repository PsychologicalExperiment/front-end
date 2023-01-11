node {
  stage('Build') {
      sh 'cd front-end'
      sh 'pwd'
      sh 'git pull origin main'
      sh 'npm install'
      sh 'npm run build'
  }
  stage('Deploy') {
      sh 'pwd'
      sh 'cp -r front-end/dist/* /psychology/'
  }
}
