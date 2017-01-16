function enterRecord(){
    document.getElementById("submitType").value = "enterRecord";
    document.getElementById("qaForm").submit();
}

function selectRecords(){
    document.getElementById("submitType").value = "selectRecords";
    document.getElementById("qaForm").submit();
}

function deleteRecords(){
    document.getElementById("submitType").value = "deleteRecords";
    document.getElementById("qaForm").submit();
}

function selectData(e){
    e.parentNode.innerHTML = "<input type='text' style='size:10' name='updateData' value='" + e.innerText + "'>"
    + "<input type='button' value='Ok' onclick='updateRecord(" +  '"'+ e.id + '"' + ")';>";
}

function updateRecord(id){
    document.getElementById("submitType").value = id + "_updateRecord";
    document.getElementById("qaForm").submit();
}

