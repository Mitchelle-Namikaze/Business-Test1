<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Collect form data
    $fname = strip_tags(trim($_POST["fname"]));
    $lname = strip_tags(trim($_POST["lname"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // 2. Set your email address (where you want to receive messages)
    $recipient = "nyakehkamanda5@gmail.com"; 

    // 3. Create email content
    $subject = "New Contact from Max's Precious Minerals";
    $email_content = "Name: $fname $lname\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // 4. Create email headers
    $email_headers = "From: $fname <$email>";

    // 5. Send the email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        echo "success"; // This tells your JS it worked
    } else {
        echo "error";
    }
} else {
    echo "invalid_request";
}
?>