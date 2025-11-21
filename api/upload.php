<?php
/**
 * Image Upload Handler
 * Görselleri uploads/ klasörüne yükler
 */

header('Content-Type: application/json');

// Upload klasörü
$uploadDir = __DIR__ . '/../uploads/';

// Klasör yoksa oluştur
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Dosya kontrolü
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode([
        'success' => false,
        'message' => 'Dosya yüklenemedi!'
    ]);
    exit;
}

$file = $_FILES['image'];

// Dosya boyutu kontrolü (Max 5MB)
$maxSize = 5 * 1024 * 1024; // 5MB
if ($file['size'] > $maxSize) {
    echo json_encode([
        'success' => false,
        'message' => 'Dosya boyutu çok büyük! (Max 5MB)'
    ]);
    exit;
}

// İzin verilen dosya tipleri
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedTypes)) {
    echo json_encode([
        'success' => false,
        'message' => 'Geçersiz dosya tipi! (Sadece JPG, PNG, GIF, WEBP)'
    ]);
    exit;
}

// Dosya uzantısı
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

// Benzersiz dosya adı oluştur
$fileName = uniqid('img_', true) . '.' . $extension;
$targetPath = $uploadDir . $fileName;

// Dosyayı kaydet
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // Başarılı - URL'yi döndür
    $fileUrl = 'uploads/' . $fileName;
    
    echo json_encode([
        'success' => true,
        'message' => 'Görsel başarıyla yüklendi!',
        'url' => $fileUrl,
        'fileName' => $fileName
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Dosya kaydedilemedi!'
    ]);
}
?>
