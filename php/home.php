<!DOCTYPE html>
<html>
    <head>
        <title>Home</title>
        <link rel="stylesheet" href="../css/styleHome.css" type="text/css"/>
        <script type="text/javascript" src="../js/scriptsHome.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Delius+Swash+Caps|Itim|Raleway" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    </head>

    <body>
        <div id="cover">
        <p id="welcome">Welcome to</p>
        <div id="inner">
            <p id="introTitle">Sapling Academia</p>
            <p class="intro" id="intro1">where students can thrive and grow</p>
            <p class="intro" id="intro2">and teachers nurture seeds of knowledge</p>
            <p id="continue">Click to begin your educational journey</p>
        </div>
        </div>

        <div id="title">
            <h1>Sapling Academia</h1>
        </div>

        <div id="placeholder">
            <p>Welcome!</p>
            <p>Please select an account<br> to log into</p>
        </div>

        <div id="passwordBox">
            <form method="GET" action="#">
                <div id="passwordBoxInfo">
                    <p id="greeting"></p>
                    <p id="passwordCheckReply">Enter Password:</p>
                    <input id="userpwd" type="text" name="userpwd" onkeydown="javascript: if(event.keyCode == 13){ checkPassword(); return false;}"/>
                    <input id="userid" type="hidden" name="userid"/>
                </div>
            </form>
        </div>


    </body>
</html>

<script>
    $(document).ready(function(){
        $("#cover").click(function(){
            $("#cover").slideUp("slow");
        });
        $("#title").click(function(){
            $("#cover").slideDown("slow");
        });
    });
</script>

<?php

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

//Extract images from data table to display on screen
$sql = "SELECT * from studentsList ORDER BY LNAME ASC"; // WHERE IMAGENAME='$imagename'";
$results = mysqli_query($con,$sql) or die("Invalid query: " . mysqli_error());
$count = 0;
echo '<div id="listContainer">';

if ( mysqli_num_rows($results) > 0 ){
    while( $row = mysqli_fetch_assoc($results)){
        echo '<div class="listItem" id="' .$row['ID'] . '"onclick="showPasswordEntry(this);">';
        if ($row['ROLE'] == "Student") {
            echo '<p class="listText">' . $row['FNAME'] . " " . $row['LNAME'] . '</p></div>';
        } else {
            echo '<p class="listText">' . $row['FNAME'] . " " . $row['LNAME'] . ' (Teacher) </p></div>';
        }

    }
}
echo '</div>';

//Close connection to server
mysqli_close($con);

?>