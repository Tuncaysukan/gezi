<?php
/**
 * Medya Dosya Yükleme API
 */

error_log('===== UPLOAD.PHP CALLED =====');
error_log('REQUEST_METHOD: ' . $_SERVER['REQUEST_METHOD']);
error_log('$_FILES: ' . print_r($_FILES, true));
error_log('$_POST: ' . print_r($_POST, true));

header('Content-Type: application/json');

function jsonResponse($success, $message, $data = null) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// Yükleme dizini
$uploadDir = __DIR__ . '/../assets/uploads/';

// Dizin yoksa oluştur
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Dosya yükleme kontrolü
if (!isset($_FILES['media_file'])) {
    // Debug log
    error_log('Upload error: media_file not found in $_FILES');
    error_log('$_FILES content: ' . print_r($_FILES, true));
    error_log('$_POST content: ' . print_r($_POST, true));
    jsonResponse(false, 'Dosya seçilmedi!');
}

$file = $_FILES['media_file'];
$description = $_POST['description'] ?? '';

// Hata kontrolü
if ($file['error'] !== UPLOAD_ERR_OK) {
    jsonResponse(false, 'Dosya yükleme hatası: ' . $file['error']);
}

// Dosya boyutu kontrolü (Max 5MB)
$maxSize = 5 * 1024 * 1024; // 5MB
if ($file['size'] > $maxSize) {
    jsonResponse(false, 'Dosya çok büyük! Maksimum 5MB olmalıdır.');
}

// İzin verilen dosya tipleri
$allowedTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/mpeg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

if (!in_array($file['type'], $allowedTypes)) {
    jsonResponse(false, 'Geçersiz dosya tipi! Sadece resim, video ve döküman yüklenebilir.');
}

// Güvenli dosya adı oluştur
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$safeName = uniqid('media_') . '.' . $extension;
$targetPath = $uploadDir . $safeName;

// Dosyayı taşı
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // Başarılı
    $fileUrl = 'assets/uploads/' . $safeName;
    
    jsonResponse(true, 'Dosya başarıyla yüklendi!', [
        'filename' => $safeName,
        'url' => $fileUrl,
        'size' => round($file['size'] / 1024, 2) . ' KB',
        'type' => $file['type']
    ]);
} else {
    jsonResponse(false, 'Dosya yüklenemedi!');
}
?>
