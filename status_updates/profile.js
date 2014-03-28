/* OLD (lab 5), I didn't want to get rid of the old work

function postUpdate() {
	var msg = document.getElementById("msg").value;
	var time = new Date();
	var updates = document.getElementById("updates");
	var new_update = document.createElement('li');
	new_update.appendChild(document.createTextNode((time.getMonth() 
		+ 1) + '/' + time.getDate() + '/' + time.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes() + ' - ' + msg));
	updates.insertBefore(new_update, updates.firstChild);
}*/

if(localStorage["posts"] == null) {
	localStorage["posts"] = "[]";
}

var posts

function store()
{
	posts = JSON.parse(localStorage["posts"]);
	txt = document.getElementById("msg").value;
	tmp = new Date();
	posts.push((tmp.getMonth() + 1) + '/' + tmp.getDate() + '/' + tmp.getFullYear() + ' ' + tmp.getHours() + ':' + tmp.getMinutes() + ' - ' + txt);
	localStorage["posts"] = JSON.stringify(posts);
	reload();
}

function reload()
{
	elem = document.getElementById("status")
	updates = "";
	for (i = 0; i < posts.length; i++) {
		updates = updates + "<p>" + posts[i] + "</p>\n";
	}
	elem.innerHTML = updates;
}