/**
 * @author Shlomo Glick
 * @since 2021-05
 */
const messages = [];
const users = new Map();
let ArrayOfUsers = [];
const { json } = require('body-parser');
const express = require('express');
const app = express();
app.use(express.json());
app.listen(2021, () => {
    console.log('server is up and listening on port 2021!');
});
app.get('/', (req, res) => {
    res.redirect('/index.html');
});
app.get('/messages', (req, res) => {
    const jsonMessags = JSON.stringify(messages);
    res.send(jsonMessags);
});
app.post('/', (req, res) => {
    messages.push(req.body);
    res.send("thanks for message");
});
app.post('/users', (req, res) => {
    let user = req.body;
    users.set(user.name, user);
    res.send("thanks for user");
});
app.get('/users', (req, res) => {
    ArrayOfUsers = getArrayFromMap(users);
    res.send(ArrayOfUsers);
});
app.use(express.static('static'));

function getArrayFromMap(map) {
    const ans = [];
    map.forEach((value, key) => {
        if (value.name !== "") ans.push(value);
    });
    return ans;
}
function updateUsers() {
    const deleted = [];
    const sec = getSeconds();
    users.forEach((value, key) => {
        if (value.lastConnectionTimeToServer < sec - 1) {
            deleted.push(value.name);
        }

    })
    deleted.forEach((value, key) => {
        users.delete(value);
    })
}
setInterval(updateUsers, 500);
function getSeconds() {
    const date = new Date();
    const seconds = date.getTime() / 1000;
    return seconds;
}




   









// *********************************
// let allMessage=[];
// let articipants=[];
// function addMessageToArray(){
    
// }
// function sendParticipantNamesToTheClient(){}
// function sendMessagesToTheClient(){}

