<?php
require 'db.php';

header('Content-Type: application/json');

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$email = $_POST['email'] ?? '';

if(isset($_POST['update'])){

    $stmt = $conn->prepare("
        UPDATE users SET 
        name=?, age=?, dob=?, contact=?, address=?, city=?, country=?, pincode=?
        WHERE email=?
    ");

    $stmt->bind_param(
        "sssssssss",
        $_POST['name'],
        $_POST['age'],
        $_POST['dob'],
        $_POST['contact'],
        $_POST['address'],
        $_POST['city'],
        $_POST['country'],
        $_POST['pincode'],
        $email
    );

    if($stmt->execute()){
        echo json_encode(["status" => "updated"]);
    } else {
        echo json_encode(["error" => "update_failed"]);
    }
    exit();
}


if(!$email){
    echo json_encode(["error" => "no_email"]);
    exit();
}

$session = $redis->get("user_session:$email");

if(!$session){
    echo json_encode(["error" => "unauthorized"]);
    exit();
}


$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

$user = $result->fetch_assoc();
unset($user['password']);

echo json_encode($user);
?>