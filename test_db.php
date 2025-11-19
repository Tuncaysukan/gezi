<?php
require_once 'config/database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();
    
    echo "<h2>Database Test</h2>";
    
    // Tabloları listele
    $result = $conn->query("SHOW TABLES");
    $tables = $result->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h3>Tablolar:</h3><ul>";
    foreach ($tables as $table) {
        echo "<li>$table</li>";
    }
    echo "</ul>";
    
    // Categories tablosu varsa yapısını göster
    if (in_array('categories', $tables)) {
        echo "<h3>Categories Tablosu Yapısı:</h3>";
        $result = $conn->query("DESCRIBE categories");
        $columns = $result->fetchAll();
        
        echo "<table border='1' cellpadding='5'>";
        echo "<tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th></tr>";
        foreach ($columns as $col) {
            echo "<tr>";
            echo "<td>{$col['Field']}</td>";
            echo "<td>{$col['Type']}</td>";
            echo "<td>{$col['Null']}</td>";
            echo "<td>{$col['Key']}</td>";
            echo "<td>{$col['Default']}</td>";
            echo "</tr>";
        }
        echo "</table>";
        
        // Kayıt sayısı
        $count = $conn->query("SELECT COUNT(*) FROM categories")->fetchColumn();
        echo "<p><strong>Toplam kayıt:</strong> $count</p>";
    }
    
    echo "<hr><a href='admin/index.php'>Admin Panel</a>";
    
} catch (Exception $e) {
    echo "Hata: " . $e->getMessage();
}
?>
