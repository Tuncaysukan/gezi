<?php
// Run dummy data SQL
$host = 'localhost';
$dbname = 'gezi_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Disable foreign key checks
    $pdo->exec('SET FOREIGN_KEY_CHECKS = 0');
    
    // Truncate tables
    echo "🗑️ Clearing existing data...\n";
    $pdo->exec('TRUNCATE TABLE posts');
    $pdo->exec('TRUNCATE TABLE categories');
    $pdo->exec('TRUNCATE TABLE breaking_news');
    $pdo->exec('TRUNCATE TABLE stories');
    $pdo->exec('TRUNCATE TABLE hashtags');
    $pdo->exec('TRUNCATE TABLE notifications');
    echo "✅ Tables cleared\n\n";
    
    // Read SQL file
    $sql = file_get_contents(__DIR__ . '/insert_dummy_data.sql');
    
    // Execute SQL
    echo "📝 Inserting dummy data...\n";
    $pdo->exec($sql);
    
    // Re-enable foreign key checks
    $pdo->exec('SET FOREIGN_KEY_CHECKS = 1');
    
    echo "✅ Dummy data inserted successfully!\n\n";
    
    // Show counts
    $counts = [
        'categories' => $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn(),
        'posts' => $pdo->query("SELECT COUNT(*) FROM posts")->fetchColumn(),
        'breaking_news' => $pdo->query("SELECT COUNT(*) FROM breaking_news")->fetchColumn(),
        'stories' => $pdo->query("SELECT COUNT(*) FROM stories")->fetchColumn(),
        'hashtags' => $pdo->query("SELECT COUNT(*) FROM hashtags")->fetchColumn(),
        'notifications' => $pdo->query("SELECT COUNT(*) FROM notifications")->fetchColumn(),
    ];
    
    echo "📊 Database Statistics:\n";
    echo "━━━━━━━━━━━━━━━━━━━━━━━━\n";
    foreach ($counts as $table => $count) {
        echo "  {$table}: {$count} records\n";
    }
    
} catch(PDOException $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
