<?php
$db = new PDO("mysql:host=localhost;dbname=l3xan_portfolio;charset=utf8", "root", "");
$sorgu = $db->query("SELECT * FROM mesajlar ORDER BY id DESC", PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Admin Paneli | L3xan</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body style="padding: 50px;">
    <h2 class="section-title">Gelen Mesajlar</h2>
    <div class="glass">
        <table width="100%" style="text-align: left; border-collapse: collapse; color: var(--light-text);">
            <tr style="border-bottom: 2px solid var(--primary-color);">
                <th style="padding: 15px;">Tarih</th>
                <th style="padding: 15px;">İsim</th>
                <th style="padding: 15px;">E-posta</th>
                <th style="padding: 15px;">Mesaj</th>
            </tr>
            <?php foreach($sorgu as $satir): ?>
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 15px;"><?= $satir['tarih'] ?></td>
                <td style="padding: 15px;"><?= $satir['isim'] ?></td>
                <td style="padding: 15px;"><?= $satir['email'] ?></td>
                <td style="padding: 15px;"><?= $satir['mesaj'] ?></td>
            </tr>
            <?php endforeach; ?>
        </table>
    </div>
</body>
</html>