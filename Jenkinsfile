pipeline {
  agent any
  environment {
    GIT_URL = 'https://github.com/kingsley-einstein/deuteronomy-auth'
    PGPASSWORD = 'password'
    TEST_PORT = '6188',
    JWT_SECRET = 'secret'
    DATABASE_TEST_NAME = 'JENKINSDEUTERONOMYTESTDB'
    DATABASE_TEST_USER = 'postgres'
    DATABASE_TEST_PASS = 'password'
    DATABASE_TEST_HOST = '127.0.0.1'
    DATABASE_TEST_PORT = '5432'
  }
  stages {
    stage("Clone Repo") {
      steps {
        git "${GIT_URL}"
      }
    }
    stage("Create Database") {
      steps {
        bat 'psql -c "DROP DATABASE IF EXISTS JENKINSDEUTERONOMYTESTDB;" -U postgres'
        bat 'psql -c "CREATE DATABASE JENKINSDEUTERONOMYTESTDB;" -U postgres'
      }
    }
    stage("Install Dependencies") {
      steps {
        bat 'npm install'
      }
    }
    stage("Run Tests") {
      steps {
        bat 'set NODE_ENV=test&& npm test'
      }
    }
    stage("Run Coverage") {
      steps {
        bat 'npm run coverage'
      }
    }
  }
}