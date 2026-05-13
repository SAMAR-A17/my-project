<?php

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$email = $_POST['email'] ?? '';

if($email){

    $session = $redis->get("user_session:$email");

    if($session){

        $redis->del("session:$session");
        $redis->del("user_session:$email");

    }

}

echo "logout_success";

?>