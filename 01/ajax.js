var request;  /*переменная для хранения объекта запроса*/

function KeyPress(term) {
  request = new XMLHttpRequest();/*создаем новый объект запроса*/
  request.onreadystatechange = LoadResults;/*какая фукнция будет обрабатывать ответ сервера*/
  request.open("GET", "country.php?key="+term, true);//GET тк передаются серверному сценарию через url-адрес, асинхрнный режим
  request.send();/*запрос не содержит данных*/
}
function LoadResults() { //будет вызываться при каждом изменении статуса готовности запроса
  if (request.readyState == 4 && request.status == 200) {/*Проверяем состояние готовности(01234), статус запроса*/
      ShowDiv("searchresults"); 
      ClearResults();
      var array =  request.responseText.split(";"); 
      var div = document.getElementById("searchresults");
      var tbl = document.createElement("table"); 
      var tblbody = document.createElement("tbody");
      var tblRow, tblCell, tblNode;
      for (var i = 0; i < array.length; i++) { 
        tblRow = document.createElement("tr"); 
        tblCell = document.createElement("td");
        tblCell.onmouseover = function () { this.className = 'mouseOver'; };//задаем функции ячеек
        tblCell.onmouseout = function () { this.className = 'mouseOut'; };
        tblCell.onclick = function () { Replace(this); };
        tblNode = document.createTextNode(array[i]);
        tblCell.appendChild(tblNode);
        tblRow.appendChild(tblCell);
        tblbody.appendChild(tblRow);
      }
      tbl.appendChild(tblbody);//добавляем в таблицу ее тело
      div.appendChild(tbl);//помещаем таблицу в слой
  }
}
/*делаем слой с результатами видимым*/
function ShowDiv(id) {
  if (document.layers) document.layers[id].visibility = "show";
  else document.getElementById(id).style.visibility = "visible";
}
/*aвтозаполнение*/
function Replace(tblCell) {
  var inputbox = document.getElementById("country");
  inputbox.value = tblCell.firstChild.nodeValue;
  ClearResults();
}
/*очистка результатов*/
function ClearResults() {
  var div = document.getElementById("searchresults");// Удаление существующих строк из таблицы результатов
  var counter = div.childNodes.length;
  for (var i = counter - 1; i >= 0; i--) {
    div.removeChild(div.childNodes[i]);
  }
}