<?php
/**
 * API Test
 */

echo "<h2>API Test</h2>";

// 1. Database bağlantısını test et
echo "<h3>1. Database Test:</h3>";
try {
    require_once __DIR__ . '/../config/database.php';
    $database = new Database();
    $db = $database->getConnection();
    echo "✅ Database bağlantısı başarılı!<br>";
} catch (Exception $e) {
    echo "❌ Database hatası: " . $e->getMessage() . "<br>";
    exit;
}

// 2. Models dosyasını test et
echo "<h3>2. Models Test:</h3>";
try {
    require_once __DIR__ . '/../models/Models.php';
    echo "✅ Models yüklendi!<br>";
} catch (Exception $e) {
    echo "❌ Models hatası: " . $e->getMessage() . "<br>";
    exit;
}

// 3. Category model test et
echo "<h3>3. Category Model Test:</h3>";
try {
    $categoryModel = new Category();
    echo "✅ Category model oluşturuldu!<br>";
    
    // Kategorileri listele
    $categories = $categoryModel->getAll();
    echo "✅ Toplam kategori: " . count($categories) . "<br>";
    
    if (count($categories) > 0) {
        echo "<pre>";
        print_r($categories);
        echo "</pre>";
    }
} catch (Exception $e) {
    echo "❌ Category model hatası: " . $e->getMessage() . "<br>";
    exit;
}

// 4. CRUD API test et
echo "<h3>4. CRUD API Test:</h3>";
echo "<a href='crud.php?action=list&table=categories' target='_blank'>API'yi Test Et</a><br>";

echo "<hr>";
echo "<a href='../admin/index.php'>Admin Panel</a>";
?>
