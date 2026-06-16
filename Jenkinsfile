pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test -- --run'
      }
    }
    
    stage('Typecheck') {
      steps {
        sh 'npx tsc --noEmit'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    
  }
}