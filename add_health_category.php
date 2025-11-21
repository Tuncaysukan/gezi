<?php
require_once 'config/database.php';

try {
    $database = new Database();
    $pdo = $database->getConnection();
    
    // Sağlık & Spor kategorisini ekle (zaten varsa update et)
    $sql = "INSERT INTO categories (name, slug, description, icon, post_count, `order`, is_active) 
            VALUES ('Sağlık & Spor', 'saglik-spor', 'Sağlıklı yaşam, egzersiz ve beslenme içerikleri', 'fa-solid fa-leaf', 0, 4, 1)
            ON DUPLICATE KEY UPDATE 
            description = 'Sağlıklı yaşam, egzersiz ve beslenme içerikleri',
            icon = 'fa-solid fa-leaf'";
    
    $pdo->exec($sql);
    echo "✅ 'Sağlık & Spor' kategorisi eklendi/güncellendi!\n";
    
    // Diğer kategori kutusu isimleriyle eşleşen kategorileri de ekle
    $categories = [
        ['name' => 'Kişisel Gelişim', 'slug' => 'kisisel-gelisim', 'desc' => 'Kişisel gelişim ve motivasyon', 'icon' => 'fa-solid fa-lightbulb', 'order' => 3],
        ['name' => 'Günlük Yaşam', 'slug' => 'gunluk-yasam', 'desc' => 'Günlük yaşam ipuçları', 'icon' => 'fa-solid fa-heart', 'order' => 2],
        ['name' => 'Seyahat & Keşif', 'slug' => 'seyahat-kesif', 'desc' => 'Seyahat ve keşif içerikleri', 'icon' => 'fa-solid fa-plane', 'order' => 5],
        ['name' => 'Eğlence & Kültür', 'slug' => 'eglence-kultur', 'desc' => 'Eğlence ve kültür içerikleri', 'icon' => 'fa-solid fa-palette', 'order' => 1]
    ];
    
    foreach ($categories as $cat) {
        $stmt = $pdo->prepare("INSERT INTO categories (name, slug, description, icon, post_count, `order`, is_active) 
                               VALUES (?, ?, ?, ?, 0, ?, 1)
                               ON DUPLICATE KEY UPDATE 
                               description = VALUES(description),
                               icon = VALUES(icon)");
        $stmt->execute([$cat['name'], $cat['slug'], $cat['desc'], $cat['icon'], $cat['order']]);
        echo "✅ '{$cat['name']}' kategorisi eklendi/güncellendi!\n";
    }
    
    echo "\n✅ Tüm kategoriler hazır!\n";
    echo "\nŞimdi admin panelden 'Sağlık & Spor' kategorisine blog yazıları ekleyebilirsin!\n";
    
} catch (Exception $e) {
    echo "❌ Hata: " . $e->getMessage() . "\n";
}
