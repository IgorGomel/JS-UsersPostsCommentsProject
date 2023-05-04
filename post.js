var commentsArr = JSON.parse(sessionStorage.getItem("commentsArr"));
var postTitleData = sessionStorage.getItem("postTitle");
var postBodyData = sessionStorage.getItem("postBody");

let postTitle = document.getElementById("postTitle");
let postBody = document.getElementById("postBody");

postTitle.innerText = postTitleData;
postBody.innerText  = postBodyData;

const commentsEl = document.getElementById("comments");
commentsEl.innerHTML = "";
commentsArr.forEach(element => {
    const commentName = document.createElement("div");
    const commentEmail = document.createElement("div");
    const commentBody = document.createElement("div");
    commentName.classList.add("commentName");  
    commentEmail.classList.add("commentEmail"); 
    commentBody.classList.add("commentBody");  
    commentName.innerText = `${element.name}`;
    commentEmail.innerText = `${element.email}`;
    commentBody.innerText = `${element.body}`;

    commentsEl.appendChild(commentName);
    commentsEl.appendChild(commentEmail);
    commentsEl.appendChild(commentBody);

});

