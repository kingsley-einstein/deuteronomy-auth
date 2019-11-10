pipeline {
  agent any
  environment {
    GIT_URL = 'https://github.com/kingsley-einstein/deuteronomy-auth'
  }
  stages {
    stage("Clone Repo") {
      steps {
        git "${GIT_URL}"
      }
    }
    stage("Create Database") {
      steps {
        bat "psql -h localhost -p 5432 -U postgres -d postgres -c DROP DATABASE IF EXISTS JENKINSDEUTERONOMYTESTDB"
        bat "psql -h localhost -p 5432 -U postgres -d postgres -c CREATE DATABASE JENKINSDEUTERONOMYTESTDB"
      }
    }
  }
}