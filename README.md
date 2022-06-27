# todo-app
a simple note-taking webapp

## set up
```sh
# clone repo
git clone https://github.com/mininmobile/todo-app
cd todo-app

# install database server
npm i -g json-server

# create database
echo '{ "notes": [], "tags": [] }' > db.json

# install dependencies
npm i
```

## running
open two terminals, one for `json-server -p 3001 db.json` and one for `npm start`
