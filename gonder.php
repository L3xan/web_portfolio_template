<?php
header('Content-Type: application/json; charset=utf-8');

$host = 'localhost';
$dbname = 'l3xan_portfolio';
$user = 'root';
$pass = '';

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $isim = htmlspecialchars(strip_tags(trim($_POST['name'])));
        $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
        $mesaj = htmlspecialchars(strip_tags(trim($_POST['message'])));

        if (empty($isim) || empty($email) || empty($mesaj)) {
            echo json_encode(["status" => "error", "message" => "Lütfen tüm alanları doldurun."]);
            exit;
        }

        $sorgu = $db->prepare("INSERT INTO mesajlar (isim, email, mesaj) VALUES (?, ?, ?)");
        if ($sorgu->execute([$isim, $email, $mesaj])) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Mesaj veritabanına kaydedilemedi."]);
        }
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Veritabanı bağlantı hatası."]);
}
?>