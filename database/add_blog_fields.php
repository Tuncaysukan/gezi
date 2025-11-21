<?php
require_once __DIR__ . '/../config/database.php';

try {
    $database = new Database();
    $pdo = $database->getConnection();
    
    echo "Blog içerik alanları ekleniyor...\n\n";
    
    // Category Boxes için alanlar ekle
    $sql1 = "ALTER TABLE category_boxes
        ADD COLUMN IF NOT EXISTS blog_title VARCHAR(255) NULL AFTER description,
        ADD COLUMN IF NOT EXISTS blog_excerpt TEXT NULL AFTER blog_title,
        ADD COLUMN IF NOT EXISTS blog_content LONGTEXT NULL AFTER blog_excerpt,
        ADD COLUMN IF NOT EXISTS featured_image VARCHAR(255) NULL AFTER blog_content,
        ADD COLUMN IF NOT EXISTS view_count INT DEFAULT 0 AFTER featured_image,
        ADD COLUMN IF NOT EXISTS published_at TIMESTAMP NULL AFTER view_count";
    
    $pdo->exec($sql1);
    echo "✓ Category Boxes tablosuna blog alanları eklendi\n";
    
    // Info Cards için alanlar ekle
    $sql2 = "ALTER TABLE info_cards
        ADD COLUMN IF NOT EXISTS blog_title VARCHAR(255) NULL AFTER description,
        ADD COLUMN IF NOT EXISTS blog_excerpt TEXT NULL AFTER blog_title,
        ADD COLUMN IF NOT EXISTS blog_content LONGTEXT NULL AFTER blog_excerpt,
        ADD COLUMN IF NOT EXISTS featured_image VARCHAR(255) NULL AFTER blog_content,
        ADD COLUMN IF NOT EXISTS view_count INT DEFAULT 0 AFTER featured_image,
        ADD COLUMN IF NOT EXISTS published_at TIMESTAMP NULL AFTER view_count";
    
    $pdo->exec($sql2);
    echo "✓ Info Cards tablosuna blog alanları eklendi\n";
    
    echo "\n✅ Tüm alanlar başarıyla eklendi!\n";
    echo "\nŞimdi admin panelde bu alanları düzenleyebilirsiniz:\n";
    echo "- Blog Başlığı (blog_title)\n";
    echo "- Blog Özeti (blog_excerpt)\n";
    echo "- Blog İçeriği (blog_content)\n";
    echo "- Öne Çıkan Görsel (featured_image)\n";
    echo "- Görüntülenme Sayısı (view_count)\n";
    echo "- Yayın Tarihi (published_at)\n";
    
} catch (Exception $e) {
    echo "❌ Hata: " . $e->getMessage() . "\n";
}
