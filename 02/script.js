function Send() {
	request = new XMLHttpRequest();/*создаем новый объект запроса*/
	request.onreadystatechange = LoadResults;/*какая фукнция будет обрабатывать ответ сервера*/
	let	field = document.getElementById("comment").innerText; /*нужен текст*/
	console.log(field);
	request.open("GET", "comment.php?comment="+field, true);//GET тк передаются серверному сценарию через url-адрес, асинхрнный режим
	request.send();/*запрос не содержит данных*/
}

function LoadResults() {
	if (request.readyState == 4 && request.status == 200){
		cdiv = document.createElement("div"); 
		cdiv.id = 'comments' + Math.random();
		cdiv.classList.add("comments");
		cdiv.innerHTML=request.responseText; 
		cdiv.ondblclick = MakeEditable;
		var resDIV= document.getElementById("time");
		resDIV.appendChild(cdiv);
	}
}

function MakeEditable() { 
	this.setAttribute('contenteditable', true);
	EditComment();
}

function EditComment() {
	request = new XMLHttpRequest();
	request.onreadystatechange = LoadEditResults;
	let	field = document.getElementById("comment").innerText;
	console.log( field);
	request.open("GET", "comment.php?comment="+field, true);
	request.send();
}

function LoadEditResults() {
	if (request.readyState == 4 && request.status == 200){
		let newcomment = document.getElementById(document.activeElement.id);
		newcomment.innerText = request.responseText;
	}
}
