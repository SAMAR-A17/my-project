<?php

require 'db.php';

if(!file_exists('../vendor/autoload.php')){
    die("autoload NOT FOUND");
}

require '../vendor/autoload.php';



if(isset($_POST['check_email'])){

    $email = trim($_POST['email'] ?? '');

    $stmt = $conn->prepare(
        "SELECT id FROM users WHERE email=?"
    );

    $stmt->bind_param("s", $email);

    $stmt->execute();

    $stmt->store_result();

    if($stmt->num_rows > 0){

        echo "exists";

    }
    else{

        echo "available";

    }

    exit();

}



$email = filter_var(
    trim($_POST['email'] ?? ''),
    FILTER_SANITIZE_EMAIL
);

$name = trim($_POST['name'] ?? '');

$password = $_POST['password'] ?? '';

$age = trim($_POST['age'] ?? '');

$dob = trim($_POST['dob'] ?? '');

$contact = trim($_POST['contact'] ?? '');

$address = trim($_POST['address'] ?? '');

$city = trim($_POST['city'] ?? '');

$country = trim($_POST['country'] ?? '');

$pincode = trim($_POST['pincode'] ?? '');



if(!$email || !$password || !$name){

    echo "missing";
    exit();

}



if(!filter_var($email, FILTER_VALIDATE_EMAIL)){

    echo "invalid_email";
    exit();

}



$password = password_hash($password, PASSWORD_DEFAULT);



$check = $conn->prepare(
    "SELECT id FROM users WHERE email=?"
);

$check->bind_param("s", $email);

$check->execute();

$check->store_result();

if($check->num_rows > 0){

    echo "exists";
    exit();

}



$stmt = $conn->prepare(
    "INSERT INTO users
    (name,email,password,age,dob,contact,address,city,country,pincode)
    VALUES (?,?,?,?,?,?,?,?,?,?)"
);

$stmt->bind_param(
    "ssssssssss",
    $name,
    $email,
    $password,
    $age,
    $dob,
    $contact,
    $address,
    $city,
    $country,
    $pincode
);


if($stmt->execute()){

    $client = new MongoDB\Client(
        "mongodb://localhost:27017"
    );

    $collection = $client->mydb->users;

    $collection->insertOne([

        "email" => $email,
        "name" => $name,
        "age" => $age,
        "dob" => $dob,
        "contact" => $contact,
        "address" => $address,
        "city" => $city,
        "country" => $country,
        "pincode" => $pincode

    ]);

    echo "success";

}
else{

    echo "error";

}

?>