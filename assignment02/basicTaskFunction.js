function submit() {
    var title = document.getElementById("title").value;
    if (title == null || title == ""){
        alert("Task Title cannot be empty");
        return;
    }
    var priorityList = document.getElementsByName("priority");
    var priority = "low";
    for (var i = 0; i < priorityList.length; i++) {
        if (priorityList[i].checked){
            priority = priorityList[i].value;
        }
    }

    var table = document.getElementById("taskList");
    var row = table.insertRow();
    row.id = table.length;
    row.insertCell().innerHTML = title;
    row.insertCell().innerHTML = priority;
    row.insertCell().innerHTML = '<button onclick="remove()">remove</button>';
}


function remove() {
    var target = event.target;
    target.parentElement.parentElement.remove();

}