<!DOCTYPE html>
<html>
    <head>
        <title>Student Management</title>
        <link rel="stylesheet" href="../css/styleClassList.css" type="text/css" />
        <link rel="stylesheet" href="../css/styleHome.css" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Delius+Swash+Caps|Itim|Raleway" rel="stylesheet">
        <script type="text/javascript" src="../js/scriptsManageClass.js"></script>
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

        <div id="rightContainer">
            <div id="addStudent">
                <p>Add a New Student:</p>
                 <form id="studentForm" method="post" enctype="multipart/form-data"  action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
                    First Name: <input type="text" name="fname"><br>
                    Last Name: <input type="text" name="lname"><br>
                    Password: <input type="text" name="password"><br>
                    Image: <input type="file" name="image"><br>
                    <input id="enter" type="button" value="Add New Student" onclick="enterRecord();">
                    <input type="hidden" name="submitType" id="submitType" value="">
                </form>
            </div>
        </div>

        <div class="tile row1 col1" id="teacher">

        </div>
    </body>
</html>

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


$sql = "SELECT * from studentsList ORDER BY LNAME ASC";
$results = mysqli_query($con,$sql) or die("Invalid query: " . mysqli_error());
$count = 0;
echo '<div id="listContainer">';

if ( mysqli_num_rows($results) > 0 ){
    while( $row = mysqli_fetch_assoc($results)){
        echo '<div class="listItem" id="' .$row['ID'] . '"onclick="showStudentInfo(this);">';
        if ($row['ROLE'] == "Student") {
            echo '<p class="listText">' . $row['FNAME'] . " " . $row['LNAME'] . '</p></div>';
        } else {
            echo '<p class="listText">' . $row['FNAME'] . " " . $row['LNAME'] . ' (Teacher) </p></div>';
        }

    }
}



echo '</div>';

//Check calling origin
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //Check to determine if "Enter Data" button was selected
    if ($_POST["submitType"] == "enterRecord"){
        //Inspect Data
        // echo '<pre>';
        // print_r($row["IMAGE"]); //$row["IMAGE"]
        // echo '</pre>';

        //Enter Data into Table
        //Set up the query
        $password = addslashes($_POST['password']);
        $fname = addslashes($_POST['fname']);
        $lname = addslashes($_POST['lname']);
        $imagename = addslashes($_FILES['image']['name']);
        $image = base64_encode(file_get_contents($_FILES['image']['tmp_name'])); //mysqli_real_escape_string($con, ;
        $sql = "INSERT INTO studentsList (PASSWORD, FNAME, LNAME, ROLE, IMAGENAME, IMAGE)
        VALUES ('$password', '$fname', '$lname', 'Student', '$imagename', '$image')";

        //Execute query and test
        if (!mysqli_query($con, $sql)) {
            echo "Error: " . $sql . "<br>" . mysqli_error($con);
        } else {
            // echo "Record Entered";
        }
    } else if ($_POST["submitType"] == "enterRecord"){

    }
}


//Close connection to server
mysqli_close($con);

?>