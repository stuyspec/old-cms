# cms
Content Management System. This time done right.

## Getting started

1. Clone the repo (default branch is `develop`): 
```
git clone https://github.com/stuyspec/cms
```
2. Enter the repo: 
```
cd cms
```
3. Install the node packages used in this project with **N**ode **P**ackage **M**anager: 
```
npm install
```
4. Build and begin a live reload server on `http://localhost:8080`: 
```
gulp
```

## Running the app

To set up the development data server, follow the instructions on our the README of our [API](https://github.com/stuyspec/stuy-spec-api).

## Admin Level

To be an **admin** in the database is to have a `security_level` of greater than 0 (there are only 0 and 1 currently). Only admins can POST, PATCH, and DELETE. Any user can GET. Since every user at creation is given a `security_level` of 0, developers must use `rails console` to change the `security_level` of any user.

The [Rails console](http://guides.rubyonrails.org/command_line.html#rails-console) lets you interact with the Rails API from the command line with Ruby. For instance:
```
> u = User.find_by(first_name: 'Jason')
> u.security_level = 1
> u.save
```
