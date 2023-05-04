import getData from './app.js';

const addressUsers = 'https://jsonplaceholder.typicode.com/users';

const usersData = await getData(addressUsers);

const usersEl = document.getElementById("users");
usersEl.innerHTML = "";

var myTable = document.createElement("table");
var row;
var cell;


var tHead = myTable.createTHead();
row = tHead.insertRow();
cell = row.insertCell();
cell.innerHTML = "id";

cell = row.insertCell();
cell.innerHTML = "name";

cell = row.insertCell();
cell.innerHTML = "email";

cell = row.insertCell();
cell.innerHTML = "website";

var tBody = myTable.createTBody();

let nameUser = document.querySelector('.nameUser');
let nameCompany = document.querySelector('.nameCompany');
let catchPhraseCompany = document.querySelector('.catchPhraseCompany');
let bsCompany = document.querySelector('.bsCompany');

usersData.forEach((objElement) => {

    row = tBody.insertRow();
    
    cell = row.insertCell();
    cell.innerHTML = objElement.id;

    cell = row.insertCell();
    cell.innerHTML = objElement.name;

    cell = row.insertCell();
    cell.innerHTML = objElement.email;

    cell = row.insertCell();
    cell.innerHTML = objElement.website;

    let btn = document.createElement("button");
    btn.innerHTML = "Info"
    btn.onclick = function () {
        document.querySelector('.modal-wrap').classList.add('modal-wrap--visible');
        document.querySelector('.modal-window').classList.add('modal-window--visible');

        nameUser.innerHTML = objElement.name; 
        nameCompany.innerHTML = `name: ${objElement.company.name}`;
        catchPhraseCompany.innerHTML = `catch phrase: ${objElement.company.catchPhrase}`;
        bsCompany.innerHTML = `bs: ${objElement.company.bs}`; 
    }
    btn.classList.add("btnInfoUser");    

    cell = row.insertCell();    
    cell.appendChild(btn);
});

//***************************************** кнопка закниття модального вікна************
let btnClose = document.querySelector('.btnClose');

btnClose.addEventListener('click', function () {
    document.querySelector('.modal-wrap').classList.remove('modal-wrap--visible');
    document.querySelector('.modal-window').classList.remove('modal-window--visible');
});
//**************************************************************************************

usersEl.appendChild(myTable);
 


