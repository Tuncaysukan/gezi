<?php
ini_set('display_errors', '1');
error_reporting(E_ALL);
/**
 * Database Test & Setup
 */

// Database bağlantı bilgileri
$host = "localhost";
$username = "root";
$password = "";
$dbname = "gezi_db";

try {
    // Önce veritabanı olmadan bağlan
    $conn = new PDO("mysql:host=$host", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ MySQL bağlantısı başarılı!<br><br>";
    
    // Veritabanını oluştur
    $sql = "CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
    $conn->exec($sql);
    echo "✅ Veritabanı '$dbname' oluşturuldu/var.<br><br>";
    
    // Veritabanını seç
    $conn->exec("USE $dbname");
    
    // SQL dosyasını oku ve çalıştır
    $sqlFile = file_get_contents(__DIR__ . '/database.sql');
    
    // SQL'i satırlara böl ve çalıştır
    $statements = array_filter(array_map('trim', explode(';', $sqlFile)));
    
    foreach ($statements as $statement) {
        if (!empty($statement) && substr($statement, 0, 2) !== '--') {
            try {
                $conn->exec($statement);
            } catch (PDOException $e) {
                // Tablo zaten varsa veya duplicate entry hatası görmezden gel
                if (strpos($e->getMessage(), 'already exists') === false && 
                    strpos($e->getMessage(), 'Duplicate entry') === false) {
                    // Diğer hataları göster
                    echo "⚠️ Uyarı: " . $e->getMessage() . "<br>";
                }
            }
        }
    }
    
    echo "✅ Tablolar oluşturuldu!<br><br>";
    
    // Tablo sayısını kontrol et
    $result = $conn->query("SHOW TABLES");
    $tables = $result->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h3>📊 Oluşturulan Tablolar (" . count($tables) . "):</h3>";
    echo "<ul>";
    foreach ($tables as $table) {
        // Kayıt sayısını al
        $count = $conn->query("SELECT COUNT(*) FROM $table")->fetchColumn();
        echo "<li><strong>$table</strong> - $count kayıt</li>";
    }
    echo "</ul>";
    
    echo "<br><h3>🎉 Kurulum Tamamlandı!</h3>";
    echo "<p>Admin paneline gidin: <a href='/admin/index.html' target='_blank'>Admin Panel</a></p>";
    echo "<p>Frontend'e gidin: <a href='/index.html' target='_blank'>Frontend</a></p>";
    
} catch(PDOException $e) {
    echo "❌ Hata: " . $e->getMessage();
}
?>
