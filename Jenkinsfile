pipeline {
  agent any
  environment {
    GIT_URL = 'https://github.com/kingsley-einstein/deuteronomy-auth'
    PGPASSWORD = 'password'
    TEST_PORT = '6188'
    JWT_SECRET = 's3cr3t'
    DATABASE_TEST_NAME = 'jenkinsdeuttestdb'
    DATABASE_TEST_USER = 'postgres'
    DATABASE_TEST_PASS = 'password'
    DATABASE_TEST_HOST = '127.0.0.1'
    DATABASE_TEST_PORT = '5432'
    COVERALLS_REPO_TOKEN = credentials('repo_token_from_coveralls')
  }
  stages {
    stage("Clone Repo And Pull Changes") {
      steps {
        git "${GIT_URL}"
        bat 'git pull origin HEAD'
      }
    }
    stage("Create Database") {
      steps {
        bat 'psql -h 127.0.0.1 -p 5432 -d postgres -c "DROP DATABASE IF EXISTS JENKINSDEUTTESTDB;" -U postgres'
        bat 'psql -h 127.0.0.1 -p 5432 -d postgres -c "CREATE DATABASE JENKINSDEUTTESTDB;" -U postgres'
      }
    }
    stage("Install Dependencies") {
      steps {
        bat 'npm install'
      }
    }
    stage("Run Tests") {
      steps {
        bat 'npm run test:windows'
      }
    }
    stage("Run Coverage") {
      steps {
        bat 'npm run coverage'
      }
    }
  }
}