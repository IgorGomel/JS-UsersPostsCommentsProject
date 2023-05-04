import getData from './app.js';  
import {maxId} from './app.js';

const addressUsers = 'https://jsonplaceholder.typicode.com/users';

const usersData = await getData(addressUsers);

let selectUser = document.getElementById('selectUser');
let userId = document.getElementById('userId');
let idPost = document.getElementById('idPost');
let titlePost = document.getElementById('titlePost');
let bodyPost = document.getElementById('bodyPost');
let btnCreatePost = document.getElementById('btnCreatePost');
userId.disabled = true;

let arrPostsAdditional = [];

usersData.forEach(element => {
    var opt = document.createElement('option');
    opt.text = element.name;
    opt.id =   element.id; 
    selectUser.appendChild(opt);    
});

userId.value = selectUser.options[selectUser.selectedIndex].id;

selectUser.onchange = function () {
    userId.value = selectUser.options[selectUser.selectedIndex].id; 
}

btnCreatePost.onclick = function () {
    btnCreatePost.dataset.clicks = parseInt(btnCreatePost.dataset.clicks) + 1;
    let post = {};
    post.userId = userId.value;    
    post.id = maxId + parseInt(btnCreatePost.dataset.clicks);
    post.title = titlePost.value;
    post.body  = bodyPost.value;
    arrPostsAdditional.push(post);

    titlePost.value = "";
    bodyPost.value = "";

    console.log(arrPostsAdditional);  
}