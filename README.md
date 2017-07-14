<a href="https://codeclimate.com/github/codeclimate/codeclimate"><img src="https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg" /></a>
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square)](
# PostIt App

## Introduction 
PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.

The link to the **API** hosted on heruko is  ""

## Installation

The steps outline will provide a walkthrough on how to install the app on your local machine

- Clone this repository
- From the terminal, changedirectory to postit app folder
- Ensure that you are on the **develop** branch. If on any other branch, run *git checkout develop* on the terminal.
-  Run **npm install** from your terminal in your project directory to install all dependencies

## Key Features

Based on project requirement, the features covered for the endpoints are:

- As a user, I should be able to create account
- As a user, I should be able to create group and add users to created group
- As a user, I should be able to post message to group created.
- As a user, I should be able to view messages posted in group I belong

## Usage
To test out the endpoints, follow the following steps
- Once all dependencies have beeen installed, run **npm start** on your terminal to test the endpoints
The app link for the hosted app on heroku is "".

**NOTE**

The route protection is done with jwt. So, to perform task like creating groups, adding users to group, posting messages and getting posted messages, you need to generate a token. This can be done by first signing in with a credential and then copy the generated token from your response body on postman.
You will use it in subsequent tasks.
To perform actions on protected route, use the generated *Token* and input it in your *HEAD* section on postman.
The content-type name will be **x-access-token** and the value the generated token.
### Account creation:
To create a new user account, on postman input this url ""/api/signup and the required form fields are **name**, **username**, **email** and **password**. 
### Login to created account
To login, use this url link ""/api/signin on postman and key in your username and password as the form values.

### Create a group as a registered user
To create a group as a registered user, use the link ""/api/group. The form fields on heroku are **groupName**, **description** and **userId**. The userId is to help identify the user that created the group. From the account creation, the **id** is the **userId**.

### Add group members 
To add new members to the group created, use the url ""/api/group/:groupId/user
where groupId is your id on creating group. The form fields are **userId** which is the id of the user you want to add, **admin** which is the id of the user adding.

### Post message to group
To post message to group created, use the link ""/api/group/:groupId/messages
The form fields are **message**, **priority**, and **userId**. The **priority** is optional field.

### Retrieve messages posted on group
To get all messages posted on the group, use the link ""/api/group/:groupId/messages. This is a **get** request.


