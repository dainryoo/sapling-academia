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


$students = 'var allStudents = ["'; //Start array
$numStu = 0;
$sql = "SELECT FNAME from studentsList";
$results = mysqli_query($con,$sql) or die("Invalid query: " . mysqli_error());
$resultsCount = mysqli_num_rows($results);
if ( $resultsCount > 0 ){
    while( $row = mysqli_fetch_assoc($results) ){
        if ($row['ROLE'] != "Teacher") {
            if ($numStu > 0) {
            $students .= '", "';
            }
            $students .= $row['FNAME'];
            $students .= $row['ROLE'];
            $numStu = $numStu + 1;
        }
    }
    $students .= '"];' ; //End array
}

$all = 'var allScores = ["';
$numAll = 0;
$sql = "SELECT MATHCORRECT, MATHINCORRECT, SCICORRECT, SCIINCORRECT, ENGCORRECT, ENGINCORRECT, HISTCORRECT, HISTINCORRECT from studentsList";
$results = mysqli_query($con,$sql) or die("Invalid query: " . mysqli_error());
$resultsCount = mysqli_num_rows($results);
if ( $resultsCount > 0 ){
    while( $row = mysqli_fetch_assoc($results) ){
        if ($numAll > 0) {
        $all .= '", "';
        }
        $totalCorr = $row[MATHCORRECT]+$row[ENGCORRECT]+$row[SCICORRECT]+$row[HISTCORRECT];
        $currVal = ($totalCorr) / ($totalCorr + $row[MATHINCORRECT]+$row[ENGINCORRECT]+$row[SCIINCORRECT]+$row[HISTINCORRECT]) * 100;
        $all .= round($currVal, 0);
        $numAll = $numAll + 1;
    }
    $all .= '"];' ; //End array
}

$math = 'var mathScores = ["';
$numMath = 0;
$sql = "SELECT MATHCORRECT, MATHINCORRECT from studentsList";
$results = mysqli_query($con,$sql) or die("Invalid query: " . mysqli_error());
$resultsCount = mysqli_num_rows($results);
if ( $resultsCount > 0 ){
    while( $row = mysqli_fetch_assoc($results) ){
        if ($numMath > 0) {
        $math .= '", "';
        }
        $currVal = $row[MATHCORRECT] / ($row[MATHCORRECT] + $row[MATHINCORRECT]) * 100;
        $math .= round($currVal, 0);
        $numMath = $numMath + 1;
    }
    $math .= '"];' ; //End array
}

$eng = 'var engScores = ["';
$numEng = 0;
$sql = "SELECT ENGCORRECT, ENGINCORRECT from studentsList";
$results = mysqli_query($con,$sql) or die("Invalid query: " . mysqli_error());
$resultsCount = mysqli_num_rows($results);
if ( $resultsCount > 0 ){
    while( $row = mysqli_fetch_assoc($results) ){
        if ($numEng > 0) {
        $eng .= '", "';
        }
        $currVal = $row[ENGCORRECT] / ($row[ENGCORRECT] + $row[ENGINCORRECT]) * 100;
        $eng .= round($currVal, 0);
        $numEng = $numEng + 1;
    }
    $eng .= '"];' ; //End array
}

$sci = 'var sciScores = ["';
$numSci = 0;
$sql = "SELECT SCICORRECT, SCIINCORRECT from studentsList";
$results = mysqli_query($con,$sql) or die("Invalid query: " . mysqli_error());
$resultsCount = mysqli_num_rows($results);
if ( $resultsCount > 0 ){
    while( $row = mysqli_fetch_assoc($results) ){
        if ($numSci > 0) {
        $sci .= '", "';
        }
        $currVal = $row[SCICORRECT] / ($row[SCICORRECT] + $row[SCIINCORRECT]) * 100;
        $sci .= round($currVal, 0);
        $numSci = $numSci + 1;
    }
    $sci .= '"];' ; //End array
}

$hist = 'var histScores = ["';
$numHist = 0;
$sql = "SELECT HISTCORRECT, HISTINCORRECT from studentsList";
$results = mysqli_query($con,$sql) or die("Invalid query: " . mysqli_error());
$resultsCount = mysqli_num_rows($results);
if ( $resultsCount > 0 ){
    while( $row = mysqli_fetch_assoc($results) ){
        if ($numHist > 0) {
        $hist .= '", "';
        }
        $currVal = $row[HISTCORRECT] / ($row[HISTCORRECT] + $row[HISTINCORRECT]) * 100;
        $hist .= round($currVal, 0);
        $numHist = $numHist + 1;
    }
    $hist .= '"];' ; //End array
}

//Close connection to server<
mysqli_close($con);

if(($id = fopen('../js/arrStudentScoreInfo.js','w'))){
    fwrite($id,$students . "\n" . $all . "\n" . $math . "\n" . $eng . "\n" . $sci . "\n" . $hist);
    fclose($id);
}

?>