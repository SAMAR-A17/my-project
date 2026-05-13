<?php
require 'db.php';

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if(!$email || !$password){
    echo "missing";
    exit();
}


$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if($result && $result->num_rows > 0){

    $user = $result->fetch_assoc();

    if(password_verify($password, $user['password'])){

        $redis = new Redis();
        $redis->connect('127.0.0.1', 6379);

        $sessionId = bin2hex(random_bytes(16));

        $redis->set("session:$sessionId", $email);

        $redis->sAdd("sessions:$email", $sessionId);

        $redis->set("user_session:$email", $sessionId);

        echo "success";

    } else {
        echo "invalid";
    }

} else {
    echo "invalid";
}
?>