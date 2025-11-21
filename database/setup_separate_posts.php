<?php
require_once __DIR__ . '/../config/database.php';

try {
    $database = new Database();
    $pdo = $database->getConnection();
    
    echo "=== Yeni Tablo Yapısı Oluşturuluyor ===\n\n";
    
    // SQL dosyasını oku ve çalıştır
    $sql = file_get_contents(__DIR__ . '/create_separate_post_tables.sql');
    
    // Her komutu ayrı ayrı çalıştır
    $commands = array_filter(array_map('trim', explode(';', $sql)));
    
    foreach ($commands as $command) {
        if (!empty($command)) {
            try {
                $pdo->exec($command);
                
                // Hangi komut çalıştı göster
                if (strpos($command, 'CREATE TABLE') !== false) {
                    preg_match('/CREATE TABLE.*?(\w+)\s*\(/i', $command, $matches);
                    if (isset($matches[1])) {
                        echo "✅ Tablo oluşturuldu: {$matches[1]}\n";
                    }
                } elseif (strpos($command, 'DELETE FROM') !== false) {
                    $stmt = $pdo->query("SELECT COUNT(*) as deleted FROM categories WHERE name NOT IN (
                        'Türkiye', 'Almanya', 'Fransa', 'İtalya', 'İspanya', 'Birleşik Krallık',
                        'Hollanda', 'Belçika', 'İsviçre', 'Avusturya', 'Yunanistan', 'Portekiz',
                        'İsveç', 'Norveç', 'Danimarka', 'Finlandiya', 'Polonya', 'Çekya',
                        'Macaristan', 'Romanya', 'Bulgaristan', 'Hırvatistan', 'İrlanda',
                        'İzlanda', 'Lüksemburg', 'Malta', 'Slovenya', 'Slovakya', 'Estonya',
                        'Letonya', 'Litvanya', 'Kıbrıs', 'Karadağ', 'Sırbistan', 'Arnavutluk',
                        'Makedonya', 'Bosna-Hersek', 'Moldova', 'Ukrayna', 'Belarus'
                    )");
                    $pdo->exec($command);
                    echo "✅ Ülke olmayan kategoriler temizlendi\n";
                }
            } catch (PDOException $e) {
                // Hata sadece tablo zaten varsa göz ardı et
                if (strpos($e->getMessage(), 'already exists') === false) {
                    echo "⚠️  Uyarı: " . $e->getMessage() . "\n";
                }
            }
        }
    }
    
    echo "\n=== ✅ Tablo Yapısı Hazır! ===\n\n";
    
    echo "📋 Oluşturulan Tablolar:\n";
    echo "  1. category_box_posts - Kategori Kutuları blog yazıları\n";
    echo "  2. info_card_posts - Bilgi Kartları blog yazıları\n\n";
    
    echo "🗑️  Categories tablosu temizlendi - Sadece ülkeler kaldı!\n\n";
    
    echo "📝 Şimdi yapabileceklerin:\n";
    echo "  • Admin panelden 'Kategori Kutuları Yazıları' ekle\n";
    echo "  • Admin panelden 'Bilgi Kartları Yazıları' ekle\n";
    echo "  • Her kutu/kart için sınırsız blog yazısı yaz!\n\n";
    
} catch (Exception $e) {
    echo "❌ Hata: " . $e->getMessage() . "\n";
    exit(1);
}
