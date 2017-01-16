<!DOCTYPE html>
<html>
    <head>
        <title>Teacher Questions</title>
        <link rel="stylesheet" href="../css/styleQuizList.css" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Delius+Swash+Caps|Itim|Raleway" rel="stylesheet">
        <script type="text/javascript" src="../js/scriptsManageQs.js"></script>
    </head>

    <script>
        function goHome() {
            window.location.assign("../html/teacherPage.html");
        }
        function logout() {
            window.location.assign("../php/home.php");
        }
    </script>

    <body>

        <div class="navButton" id="backButton" onclick="goHome()">
            <p>Back Home</p>
        </div>
        <div class="navButton" id="logoutButton" onclick="logout()">
            <p>Logout</p>
        </div>

        <div id="title">
            <h1>Sapling Academia</h1>
        </div>


        <form id="qaForm" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">

            <div id="selection">
            <p>Select Subject:
                <input type="radio" name="selectedSubject" value="All" checked> All &nbsp; &nbsp;
                <input type="radio" name="selectedSubject" value="english"> English &nbsp; &nbsp;
                <input type="radio" name="selectedSubject" value="math"> Math &nbsp; &nbsp;
                <input type="radio" name="selectedSubject" value="social"> Social &nbsp; &nbsp;
                <input type="radio" name="selectedSubject" value="science"> Science &nbsp; &nbsp;
                <input type="button" value="View Questions" onclick="selectRecords();">
                <input type="hidden" name="submitType" id="submitType" value="">
            </p>
            </div>

            <div id="placeholder">
                <p>(Select a subject to view questions)</p>
            </div>

            <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                //Set variables
                $servername = "localhost";
                $username = "cedrictstallwort";
                $password = "";
                $dbname = "RYOOdain";

                // Create connection
                $con=mysqli_connect($servername, $username, $password, $dbname);

                // Check connection
                if (mysqli_connect_errno())
                  {
                  	echo "Failed to connect to MySQL: " . mysqli_connect_error();
                  }

                //Enter Record
                if ($_POST["submitType"] == "enterRecord"){
                    //Set up the query
                    $grade = $_POST['grade'];
                    $subject = $_POST['subject'];
                    $question = $_POST['question'];
                    $answer = $_POST['answer'];
                    $sql = "INSERT INTO quizList (GRADE, SUBJECT, QUESTION, ANSWER)
                    VALUES ('". $grade . "', '" . $subject . "', '" . $question . "', '" . $answer . "')";

                    //Execute query and test
                    if (!mysqli_query($con, $sql)) {
                        echo "Error: " . $sql . "<br>" . mysqli_error($con);
                    }
                }

                //Update record
                if (strpos($_POST["submitType"], "updateRecord") !== false ){
                    $fieldQIDdata = explode("_",$_POST["submitType"]);
                    echo $fieldQIDdata[0];
                    echo $fieldQIDdata[1];
                    echo $fieldQIDdata[2];
                    $sql = "UPDATE quizList SET " . $fieldQIDdata[0] . "='" . $_POST["updateData"] . "' WHERE QID='" . $fieldQIDdata[1] ."'";
                    //Execute and test
                    if (!mysqli_query($con, $sql)) {
                        echo "Error updating record: " . mysqli_error($con);
                    }
                }

                //Delete checked records
                if ((count($_POST["QID"]) > 0) && ($_POST["submitType"]=="deleteRecords")) {
                    foreach($_POST["QID"] as $id){
                        $sql = "DELETE FROM quizList WHERE QID='" . $id . "'";
                        if (!mysqli_query($con, $sql)) {
                            echo "Error deleting record: " . mysqli_error($con);
                        }
                    }
                }

                //Select chosen records
                if (($_POST["submitType"] == "enterRecord") ||($_POST["submitType"] == "selectRecords") || ($_POST["submitType"]=="deleteRecords") || (strpos($_POST["submitType"], "updateRecord") !== false)){
                    //Set up query parts to search for user's selection

                    if ($_POST["selectedSubject"] == 'All'){
                        $subjectSearch = "";
                    } else {
                        $subjectSearch = "(SUBJECT = '" . $_POST["selectedSubject"] . "') ";
                    }

                    // //Assemble query string from query parts
                    if ($subjectSearch=="") {
                         $sql = "SELECT * FROM quizList";
                     } else {
                         $sql = "SELECT * FROM quizList  WHERE " . $subjectSearch ;
                    }

                    //Run selection Query
                    $result = mysqli_query($con, $sql);
                    ?>

                    <script>
                         document.getElementById('placeholder').style.display = 'none';
                    </script>

                    <?php

                    //Make output data table of selections
                    echo '<div id="allQs">';
                    //Table Headers
                    echo ' <table id="dataTable"> ';
                    echo ' <tr> ';
                    echo ' <th><input id="delButton" type="button" name="delButton" value="del" onclick="deleteRecords();"></th>';
                    echo ' <th>SUBJECT</th><th>QUESTION</th><th>ANSWER</th> ';
                    echo ' </tr> ';

                    //Fill in table data from query results
                    if (mysqli_num_rows($result) > 0) {
                        // output data of each row
                        while($row = mysqli_fetch_assoc($result)) {
                            echo '<tr>';
                            echo '<td>' . '<input type="checkbox" name="QID[' . $row["QID"] . ']" value="' . $row["QID"] .'">';
                            // echo '<td>' . $row["QID"] . '</td>';
                            // echo '<td>' . $row["GRADE"] . '</td>';
                            echo '<td>' . $row["SUBJECT"] . '</td>';
                            echo '<td><span id="QUESTION_' . $row["QID"] . '" onclick="selectData(this);">' . $row["QUESTION"] . '</span></td>';
                            echo '<td><span id="ANSWER_'. $row["QID"] . '" onclick="selectData(this);">' . $row["ANSWER"] . '</span></td>';
                            echo "</tr>";
                        }
                    } else {
                        echo "0 results";
                    }

                    //End table
                    echo ' </table> ';
                    echo '</div>';
                }

                //Close server connection
                mysqli_close($con);
            }
            ?>

            <div id="newQ">
                <p>Add a new question: </p>
                Subject:
                    <!--<input type="radio" name="subject" value="english"> English &nbsp; &nbsp;-->
                    <!--<input type="radio" name="subject" value="math"> Math &nbsp; &nbsp;-->
                    <!--<input type="radio" name="subject" value="science"> Science &nbsp; &nbsp;-->
                    <!--<input type="radio" name="subject" value="social"> Social Studies &nbsp; &nbsp;-->
                    <!--<br><br>-->
                    <select name="subject">
                        <option value="english">English</option>
                        <option value="math">Math</option>
                        <option value="science">Science</option>
                        <option value="social">History</option>
                    </select> &nbsp; &nbsp;
                Question: <input type="text" name="question" size="40"> &nbsp;
                Answer: <input type="text" name="answer" size="40"><br><br>
                <input type="button" value="Enter Question" onclick="enterRecord();">
            </div>


        </form>


    </body>
</html>
