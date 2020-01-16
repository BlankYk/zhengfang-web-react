#!/usr/bin/env groovy
pipeline {
    agent any
    environment {
        YARN = '/bin/yarn'
        DEPLOY_DIR = '/www/wwwroot/edu.css0209.cn/build'
    }
    stages {
          stage('Init') {
            steps {
                sh '$YARN install'
                sh '$YARN -version'
            }
        }
        stage('Build') {
            steps {
                sh '$YARN build'
                sh 'ls ./build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'rm -rf $DEPLOY_DIR'
                sh 'mv ./build $DEPLOY_DIR'
                sh 'echo "deploy on $DEPLOY_DIR"'
            }
        }
    }
}