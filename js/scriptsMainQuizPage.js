//Define Gloabl Variables
var totalNumOfQuestions = -1;
var correctAnswer;
var guessCount=0;
var questionCount = 0;


function setUpPage(){
    var subject = getCookie("subject")
    subject = subject.charAt(0).toUpperCase() + subject.substr(1);
    document.getElementById('subject').innerText = subject ;
    retrieveQuestionsFromDataTable();
}

function retrieveQuestionsFromDataTable(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            totalNumOfQuestions=questions.length;
            generateQuestions();
        }
    }
    xhttp.open("POST", "../php/getQuizFromDatabase.php" , true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}


function generateQuestions(){
    var questionBox = document.getElementById("allQuestions");
    for (var i = 0; i < totalNumOfQuestions; i++) {
        var newQ = document.createElement("p");
        var qText = document.createTextNode(questions[i].question);
        newQ.appendChild(qText);

        questionBox.appendChild(newQ);
        makeDropdown();
    }
}

function makeDropdown() {
    var answerBox = document.getElementById("allAnswers");

    var dropDown = document.createElement("select");
    for (var j = 0; j < totalNumOfQuestions; j++) {
        var opt = document.createElement("option");
        opt.value = questions[j].answer;
        opt.innerText = questions[j].answer;
        dropDown.appendChild(opt);
        dropDown.appendChild(document.createElement("p"));
    }

    answerBox.appendChild(dropDown);
}

function generateAnswerOptions(){
    var answerText = document.getElementById("quizContainer");

    for( var i=0; i<totalNumOfQuestions; i++){
        var opt = document.createElement("option");
        opt.value = questions[i].answer;
        opt.innerText = questions[i].answer;
        answerText.appendChild(opt);
        // try { console.log(questions[i].answer); } catch(err) { console.log(err); }
        // console.log(i);
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function submitQuiz() {
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("submitButton").style.display = "none";
    document.getElementById("endMessage").style.display = "block";
}