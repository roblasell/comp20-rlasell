/* OLD (lab 5)

function postUpdate() {
	var msg = document.getElementById("msg").value;
	var time = new Date();
	var updates = document.getElementById("updates");
	var new_update = document.createElement('li');
	new_update.appendChild(document.createTextNode((time.getMonth() 
		+ 1) + '/' + time.getDate() + '/' + time.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes() + ' - ' + msg));
	updates.insertBefore(new_update, updates.firstChild);
}*/

if(localStorage["dates"] == null) {
	localStorage["dates"] = "{}";
}

var dates

function store()
{
	dates = JSON.parse(localStorage["dates"]);
	txt = document.getElementById("msg").value;
	tmp = new Date();
	tmp2 = tmp.getTime();
	dates[tmp2] = (tmp.getMonth() + 1) + '/' + tmp.getDate() + '/' + tmp.getFullYear() + ' ' + tmp.getHours() + ':' + tmp.getMinutes() + ' - ';
	localStorage[tmp2] = txt;
	localStorage["dates"] = JSON.stringify(dates);
	reload();
}

function reload()
{
	elem = document.getElementById("status")
	updates = "";
	for (key in localStorage) {
		if (key != "dates") {
			updates = updates + "<p>" + dates[key] + localStorage[key] + "</p>\n";
		}
	}
	elem.innerHTML = updates;
}