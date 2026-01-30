<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Set the recipient email address (Your client's email)
    $to = "maxpreciousminerals@gmail.com"; 
    $subject = "New Contact Form Submission - Max's Precious Minerals";

    // 2. Get and sanitize form data
    $fname = strip_tags(trim($_POST["fname"]));
    $lname = strip_tags(trim($_POST["lname"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST["message"]));

    // 3. Prepare the email content
    $email_content = "First Name: $fname\n";
    $email_content .= "Last Name: $lname\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // 4. Build email headers
    $headers = "From: $fname $lname <$email>";

    // 5. Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        // Success code for JavaScript to read
        echo "success";
    } else {
        // Error code
        echo "error";
    }
} else {
    // Not a POST request
    header("Location: ../html/contact.html");
    exit;
}
?>