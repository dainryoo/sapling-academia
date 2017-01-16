function checkPassword(){
    var userid = document.getElementById("userid").value;
    var userpwd = document.getElementById("userpwd").value;
    var reply = document.getElementById("passwordCheckReply");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            reply.innerHTML = this.responseText;
            if (this.responseText == "incorrect") {
                reply.innerHTML = "Incorrect password";
            } else if (this.responseText == "student") {
                reply.innerHTML = "Loading page...";
                setTimeout(function(){ window.location.assign("../html/studentPage.html"); }, 2000);
            } else if (this.responseText == "teacher") {
                reply.innerHTML = "Loading page...";
                setTimeout(function(){ window.location.assign("../html/teacherPage.html"); }, 2000);
            }
        }
    }

    xhttp.open("POST", "passwordValidation.php" , true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhttp.send("userid=" + userid + "&userpwd=" + userpwd);
    xhttp.send("userpwd=" + userpwd);

}

function showPasswordEntry(e){
    document.cookie = "userid=" + e.id + "; ; path=/";
    document.getElementById("passwordBox").style.visibility = "visible";
    document.getElementById("placeholder").style.visibility = "hidden";
    document.getElementById("greeting").innerHTML = "Hi " +  e.textContent + "!";
    document.getElementById("passwordCheckReply").textContent = "Enter password:";
    document.getElementById("userpwd").value = "";
    document.getElementById("userpwd").focus();
}

function hidePasswordEntry(){
    document.getElementById('passwordBox').style.visibility = 'hidden';
}