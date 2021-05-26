/**
 * @author Shlomo Glick
 * @since 2021-05
 */
let User = function() {
    this.name = "";
    this.lastConnectionTimeToServer = 0;
    this.typing = false;
}
let Message = function(name, text, time, date) {
    this.name = name;
    this.text = text;
    this.time = time;
    this.date = date;
    this.sec = getSeconds();
}
const user = new User();
let WantToSeeHistory = false;
let isConnected = false;
let lestMessageTime = "";
let dateOfLastMessage = "";
let numberOfTheNextMessageToBeDisplayed = 0;

function endScreenLogin() {
    setUserName();
    deleteLoginScreen();
    openScreenDoYouWantToSeeHistoryׂׂ();
}
function setUserName() {
    user.name = userName.value;
}
function deleteLoginScreen() {
    loginScreen.remove();
}
function openScreenDoYouWantToSeeHistoryׂׂ() {
    document.getElementById('screenDoYouWantToSeeHistoryׂׂ').style.display = "block";;
}
function setWantToSeeHistory(choice) {
    WantToSeeHistory = choice;
}
function ChatLogin() {
    updateIsConnected();
    deleteScreenDoYouWantToSeeHistoryׂׂ();
    OpenChatWindow();
}
function updateIsConnected() {
    isConnected = true;
}
function deleteScreenDoYouWantToSeeHistoryׂׂ() {
    screenDoYouWantToSeeHistoryׂׂ.remove();
}
function OpenChatWindow() {
    document.getElementById('chatScreen').style.display = "block";
}
function updateData() {
    if (!isConnected) return;
    sendDataToServer();
    getDataFromTheServer();
}
function sendDataToServer() {
    updateIfTheUserTypes();
    sendUserToServer();
}
function getDataFromTheServer() {
    getUsersFromTheServer();
    updateMessageFromServer();
}
function updateIfTheUserTypes() {
    if (inputMessages.value === "") setTypingInTheUser(false);
    else setTypingInTheUser(true);
}
function setTypingInTheUser(flag) {
    user.typing = flag;
}
function sendUserToServer() {
    user.lastConnectionTimeToServer = getSeconds();
    jsonUser = JSON.stringify(user);
    fetch('http://localhost:2021/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonUser,
        })
        .then(response => response.text());
    // .then(data => console.log(data));
}
function getUsersFromTheServer() {
    fetch('http://localhost:2021/users')
        .then(response => response.text())
        .then(data => showUsers(data));
}
function showUsers(data) {
    let users = JSON.parse(data);
    users.sort(compare);
    let listOfParticipants = '<span style="color: brown">Participants:</span>';
    setTypingOnTheScreenׂׂ("");
    users.forEach((userCurrent, key) => {
        const nameCurrent = userCurrent.name;
        if (userCurrent.typing === true) {
            setTypingOnTheScreenׂׂ(`${nameCurrent} typing...`);
        }
        if (nameCurrent !== "") listOfParticipants += `<br>${nameCurrent},`;
    });
    setParticipantsOnTheScreen(listOfParticipants);
}
function compare(user1, uesr2) {
    if (user1.name < uesr2.name) return -1;
    return 1;
}
function deleteLastComma(str) {
    if (str[str - 1] === ',') return str.slice(0, -1);
    else return str;
}
function setTypingOnTheScreenׂׂ(nameType) {
    isTyping.innerHTML = nameType;
}
function setParticipantsOnTheScreen(listOfParticipants) {
    listOfParticipants = deleteLastComma(listOfParticipants);
    const Participate = document.getElementById('Participate');
    Participate.innerHTML = listOfParticipants;
}
function updateMessageFromServer() {
    fetch('http://localhost:2021/messages')
        .then(response => response.text())
        .then(data => showMessages(data));
}
function showMessages(data) {
    const messages = JSON.parse(data);
    if (!WantToSeeHistory) {
        numberOfTheNextMessageToBeDisplayed = messages.length;
        WantToSeeHistory = true;
    }
    for (let i = numberOfTheNextMessageToBeDisplayed; i < messages.length; i++) {
        const message = messages[i];
        showTime(message);
        const nameAndText = `<span style="color: brown">${message.name}:</span> ${message.text}`;
        showInChat(nameAndText);
    }
    numberOfTheNextMessageToBeDisplayed = messages.length;
}
function showTime(message) {
    let time = "";
    if (message.date !== dateOfLastMessage) {
        time = `date: ${message.date}`;
        dateOfLastMessage = message.date;
    }
    if (message.time !== lestMessageTime) {
        time += ` time:${message.time}`;
        lestMessageTime = message.time;
    }
    if (time !== "") {
        showInChat(`<mark>${time}</mark>`);
    }
}
function showInChat(message) {
    const newMessage = document.createElement('div');
    newMessage.innerHTML = message;
    messageWindow.appendChild(newMessage);

}
function sendMessageFromTheInput(messageFromInput){
    const dateCurrent = getDate();
    const timeCurrent = getTime();
    const newMessage = new Message(user.name, messageFromInput, timeCurrent, dateCurrent);
    sendsMessageToTheServer(newMessage);
    inputMessages.value = "";
}
function sendsMessageToTheServer(message) {
    jsonMessage = JSON.stringify(message);
    fetch('http://localhost:2021/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonMessage,
        })
        .then(response => response.text())
        .then(data => console.log(data));
}
function getDate() {
    const mytime = new Date();
    let month = mytime.getMonth() + 1;
    let date = mytime.getDate();
    date = addZero(date);
    month = addZero(month);
    const strTime = `${date}.${month}`;
    return strTime;
}
function getTime() {
    const mytime = new Date();
    let min = mytime.getMinutes();
    let hour = mytime.getHours();
    min = addZero(min);
    hour = addZero(hour);
    const strTime = `${hour}:${min}`;
    return strTime;
}
function addZero(num) {
    if (num < 10) {
        return "0" + num;
    } else return num;
}
function getSeconds() {
    const date = new Date();
    const seconds = date.getTime() / 1000;
    return seconds;
}
function sendEmoji(choice){
    switch(choice) {
        case 1:
            sendMessageFromTheInput('<img src="/images/emoji/a30.jpg" >');
            break;
        case 2:
            sendMessageFromTheInput('<img src="/images/emoji/b30.jpg" >');
            break;
        case 3:
            sendMessageFromTheInput('<img src="/images/emoji/c30.png" >');
            break;
        case 4:
            sendMessageFromTheInput('<img src="/images/emoji/d30.gif" >');
            break;
        case 5:
            sendMessageFromTheInput('<img src="/images/emoji/e30.jpg" >');
            break;
        case 6:
            sendMessageFromTheInput('<img src="/images/emoji/f30.jpg" >');
            break;
        case 7:
            sendMessageFromTheInput('<img src="/images/emoji/g30.jpg" >');
            break;
        case 8:
            sendMessageFromTheInput('<img src="/images/emoji/h30.png" >');
            break;
        case 9:
            sendMessageFromTheInput('<img src="/images/emoji/j30.jpg" >');
            break;
        default:
            break;
      }
}