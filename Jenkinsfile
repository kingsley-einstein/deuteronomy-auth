pipeline {
  agent any
  environment {
    GIT_URL = 'https://github.com/kingsley-einstein/deuteronomy-auth'
    PGPASSWORD = 'password'
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
  }
}