var commentsArr; 

async function getData(address) {
	const response = await fetch(address);
	const data = await response.json();
	return data; 
}

export default getData;

function getCommentsByPostId(postId, arrComments) {
	var resArr = arrComments.filter((item) => {
		return item.postId == postId;
	})
	return resArr;
}

// отримуємо і експортуємо максильльний id з масиву обєктів постів
const addressPosts = 'https://jsonplaceholder.typicode.com/posts';
const postsData = await getData(addressPosts);
var maxElId = postsData.reduce(function(prev, cur) {
	return cur.id > prev.id ? cur : prev;
}, {id:-Infinity});

var maxId = maxElId.id;	
export {maxId};


async function main() {
	const addressComments = 'https://jsonplaceholder.typicode.com/comments'
	
	const commentsData = await getData(addressComments);

	if(postsData == false) return;

	let currentPage = 1;
	let rows = 10;

	function displayList(arrData, rowPerPage, page) {
		const postsEl = document.querySelector('.posts');
		postsEl.innerHTML = "";
		page--; // зменшуємо page на 1

		const start = rowPerPage * page;
		const end = start + rowPerPage;
		const paginatedData = arrData.slice(start, end);

		paginatedData.forEach((el) => {
			const postEl = document.createElement("div");
			postEl.classList.add("post");
			postEl.innerText = `${el.title}`;
						
			postEl.addEventListener('click', () => {
				commentsArr = getCommentsByPostId(el.id, commentsData);
				sessionStorage.setItem("commentsArr", JSON.stringify(commentsArr));
				sessionStorage.setItem("postTitle", el.title);
				sessionStorage.setItem("postBody", el.body);
				location.href = "Post.html";							
			});

			postsEl.appendChild(postEl);
		})
	}


	function displayPagination(arrData, rowPerPage) {
		const paginationEl = document.querySelector('.pagination');
		const pagesCount = Math.ceil(arrData.length / rowPerPage);
		const ulEl = document.createElement("ul");
		ulEl.classList.add('pagination_list');

		for (let i = 0; i < pagesCount; i++) {
			const liEl = displayPaginationBtn(i + 1);
			ulEl.appendChild(liEl)
		}
		paginationEl.appendChild(ulEl)
	}

	function displayPaginationBtn(page) {
		const liEl = document.createElement("li");      
		liEl.classList.add('pagination_item')       
		liEl.innerText = page

		if(currentPage==page) liEl.classList.add('pagination_item--active')

		liEl.addEventListener('click', () => {
			currentPage = page
			displayList(postsData, rows, currentPage)

			let currentItemLi = document.querySelector('li.pagination_item--active');
			currentItemLi.classList.remove('pagination_item--active');

			liEl.classList.add('pagination_item--active');
		})

		return liEl;
	}

	displayList(postsData, rows, currentPage);
	displayPagination(postsData, rows);

	let container = document.getElementById("container");

	let usersButton = document.createElement("button");
	usersButton.type = 'button';
	usersButton.textContent = "Users";
	usersButton.classList.add('usersButton')
	usersButton.onclick = function () {
		location.href = "Users.html";	
	}

	container.appendChild(usersButton);

	let newPostsButton = document.createElement("button");
	newPostsButton.type = 'button';
	newPostsButton.textContent = "New Posts";
	newPostsButton.classList.add('usersButton')
	newPostsButton.onclick = function () {
		location.href = "NewPost.html";	
	}

	container.appendChild(newPostsButton);
}

main();

	