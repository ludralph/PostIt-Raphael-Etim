[![Maintainability](https://api.codeclimate.com/v1/badges/b688742eac0ce874e8cb/maintainability)](https://codeclimate.com/github/ludralph/PostIt-Raphael-Etim/maintainability)
[![Build Status](https://travis-ci.org/ludralph/PostIt-Raphael-Etim.svg?branch=develop)](https://travis-ci.org/ludralph/PostIt-Raphael-Etim)
[![Coverage Status](https://coveralls.io/repos/github/ludralph/PostIt-Raphael-Etim/badge.svg)](https://coveralls.io/github/ludralph/PostIt-Raphael-Etim)

# PostIt App

## Introduction 
PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.


## API Documentation
The documentation for the Postit API can be found here [PostIt API Docs](https://ludralph.github.io/slate/)

## Features

Based on project requirement, the features covered for the endpoints are:

- Create accounts
- Create groups and add users to groups
- Post messages to created groups
- Email notifications for urgent and critical messages.

## Dependencies

To install Postit, you will need the following:
- Node
- PostgreSQL
- Other dependencies required are listed in the package.json file. Use **npm install** on the command line
- Environment variables are defined in a .env file. You can find a .sample.env file in the repository root to guide you on setting up your .env file.

## Installation

The steps outline will provide a walkthrough on how to install the app on your local machine

- Clone this repository
- From the terminal, change directory to postit app folder
- Ensure that you are on the **develop** branch. If on any other branch, run **git checkout develop** on the terminal.
-  Run **npm install** from your terminal in your project directory to install all dependencies
-  Then run the app with the command **npm start**


## Usage
To test out the endpoints, follow the following steps
- Once all dependencies have beeen installed, run **npm start** on your terminal to test the endpoints
The app link for the hosted app on heroku is "https://postit-app-ralph.herokuapp.com/#/".

## Limitations
- Currently, authenticated users can only create a group but cannot delete a group created.
- Users added to a group cannot be removed.
- Read messages by users are not being archived.
- Real-time in-app notification for message posted to a group was not handled.

## Frequently Asked Questions
- What is postIt app all about? 
  postIt app is a simple application that allows friends and colleagues create groups for notifications purpose. With this    app, members in a group can interact with each other by posting their messages in the group.
- What are the steps on how to use the app?
First, Sign up by creating a new account
Once account is created, proceed to create a group and add your prefered users to the group you created
Then you can post message to the group you created for all members of the group.

## How to contribute

Contributions are welcome and appreciated

- Fork this repository
- Open a terminal and execute the following command to make a local copy $ git clone git@github.com:your-username/Postit-Raphael-Etim
- Run cd Postit-Raphael-Etim to navigate into the folder
- Make your contributions to your local repo
- Add a connection to the original repo using $ git remote add repo_nickname git://github.com/ludralph/Postit-Raphael-Etim.git. Note: repo_nickname is a nickname you choose
- Run git $ remote -v to verify that the connection is established
- Make your contributions to your local copy of the project
- Run $ git add filename git commit -m "commit message" to add and commit your contributions
- Run $ git push origin proposed-feature-name to push your changes to your copy of the repository
- If you feel you've made a contribution that will improve the project, raise a Pull Request against develop branch.
- Be descriptive enough about your contributions so other contributors will understand what you've done

Pull Requests should:

- Contain code written in ES6 for Javascript files.
- Lint and adhere to the [Airbnb javascript style guide](https://github.com/airbnb/javascript).
- Ensure test cases are written for the feature being developed

## License

This project is available for use and modification under the ISC License. See the LICENSE file for more details.

## The DEV Team
- Raphael Etim
