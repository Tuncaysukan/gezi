<?php
require_once __DIR__ . '/config/database.php';

try {
    $db = getDBConnection();
    $db->exec("ALTER TABLE category_boxes ADD COLUMN url VARCHAR(255) AFTER color");
    echo "✅ URL kolonu başarıyla eklendi!";
} catch (PDOException $e) {
    if (strpos($e->getMessage(), 'Duplicate column') !== false) {
        echo "ℹ️ URL kolonu zaten mevcut.";
    } else {
        echo "❌ Hata: " . $e->getMessage();
    }
}
?>
