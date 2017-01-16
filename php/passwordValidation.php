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

//Check calling origin
$userid = $_COOKIE["userid"];
$userpwd = $_POST["userpwd"];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "SELECT PASSWORD, ROLE from studentsList WHERE ID='$userid'";
    $results = mysqli_query($con,$sql) or die("Invalid query: " . mysqli_error());

    if ( mysqli_num_rows($results) > 0 ){
        while( $row = mysqli_fetch_assoc($results)){
            if( ($row["PASSWORD"] == "$userpwd") && ($row["ROLE"]== "Student")){
                echo "student";
            } elseif( ($row["PASSWORD"] == "$userpwd") && ($row["ROLE"]== "Teacher")){
                echo "teacher";
            } else {
                echo "incorrect";
            }
        }
    }
}

//Close connection to server<
mysqli_close($con);
?>