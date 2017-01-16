function showStudentInfo(e){
    document.cookie = "userid=" + e.id + "; ; path=/";
    document.getElementById("selectedStudent").style.visibility = "visible";
}

function enterRecord(){
    document.getElementById("submitType").value = "enterRecord";
    document.getElementById("studentForm").submit();
}

function selectRecords(){
    document.getElementById("submitType").value = "selectRecords";
    document.getElementById("studentForm").submit();
}

function deleteRecords(){
    document.getElementById("submitType").value = "deleteRecords";
    document.getElementById("studentForm").submit();
}

function selectData(e){
    e.parentNode.innerHTML = "<input type='text' size='20' name='updateData' value='" + e.innerText + "'>"
    + "<input type='button' value='update' onclick='updateRecord(" +  '"'+ e.id + '"' + ")';>";
}

function updateRecord(id){
    document.getElementById("submitType").value = id + "_updateRecord";
    document.getElementById("studentForm").submit();
}

