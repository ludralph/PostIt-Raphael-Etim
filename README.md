[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)
[![Build Status](https://travis-ci.org/ludralph/PostIt-Raphael-Etim.svg?branch=develop)](https://travis-ci.org/ludralph/PostIt-Raphael-Etim)
[![Test Coverage](https://codeclimate.com/github/codeclimate/codeclimate/badges/coverage.svg)](https://codeclimate.com/github/codeclimate/codeclimate/coverage)
# PostIt App

## Introduction 
PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.


## API Documentation
The documentation for the Postit API can be found here

## Features

Based on project requirement, the features covered for the endpoints are:

- Create accounts
- Create groups and add users to groups
- Post messages to created groups
- Email notifications for urgent and critical messages.

## Dependencies

To install Postit, you will need the following:
- Node
- Git
- PostgreSQL
- Other dependencies required are listed in the package.json file. Use **npm install** on the command line
- Environment variables are defined in a .env file. You can find a .sample.env file in the repository root to guide you on setting up your .env file.

## Installation

The steps outline will provide a walkthrough on how to install the app on your local machine

- Clone this repository
- From the terminal, change directory to postit app folder
- Ensure that you are on the **develop** branch. If on any other branch, run **git checkout develop** on the terminal.
-  Run **npm install** from your terminal in your project directory to install all dependencies
-  Then run the app with the command ** npm start**


## Usage
To test out the endpoints, follow the following steps
- Once all dependencies have beeen installed, run **npm start** on your terminal to test the endpoints
The app link for the hosted app on heroku is "https://postit-app-ralph.herokuapp.com/#/".

## How to contribute
To contribute to the development of PostIt, Check out the [issues](https://github.com/ludralph/PostIt-Raphael-Etim/issues) page, and let us know in the comments.

Pull Requests should:

- Contain code written in ES6 for Javascript files.
- Lint and adhere to the [Airbnb javascript style guide](https://github.com/airbnb/javascript).
- Pass existing tests, and tests you include for your contribution.

## Tests
Test can be run on the terminal with the command  **npm test**
If you discover a bug, please [create an issue](https://github.com/ludralph/PostIt-Raphael-Etim/issues/new)

## The DEV Team
- Raphael Etim
