# todo-list-app

Simple todo list app with a NodeJS backend and a React Native app.

# Introduction

An ap and a server for a simple todo list app.
The backend is made with [Express.js](https://expressjs.com/) and the app is made with [React Native](https://reactnative.dev/), using [Expo](https://expo.io/).

# Server

## Install

> yarn install | npm install

This will install all the required modules for the server.

## Run

> yarn server

This will start up the server.

## Environment variables


> ```PORT``` - port used by the server (for example, 5000) <br>
> ```SECRET``` - secret used to sign the web token (for example, myawesomesecret) <br>
> ```DB_HOST``` - mysql database host address (a remote or local address, for example, localhost) <br>
> ```DB_USER``` - mysql database user <br>
> ```DB_PASSWORD``` - mysql database password <br>
> ```DB_NAME``` - mysql database name (for example, todolist) <br>
> ```DB_PORT``` - mysql database port <br>

# App

## Install

> yarn install | npm install

This will install all the required modules for running the app.

## Run

> yarn app

This will start up the app using expo.
