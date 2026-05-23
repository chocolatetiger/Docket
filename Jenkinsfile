pipeline{
    agent {
        docker {
            image 'node:20-alpine'
        }
    }
    stages {
        stage('Install'){
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint'){
            steps {
                sh 'npm run lint'
            }
        }

        stage('Typecheck'){
            steps {
                sh 'npx tsc --noEmit'
            }
        }
        stage('Build'){
            steps {
                sh 'npm run build'
            }
        }
    }
}