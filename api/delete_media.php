<?php
/**
 * Medya Dosyası Silme API
 */

header('Content-Type: application/json');

function jsonResponse($success, $message, $data = null) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// ID (MD5 hash) al
$id = $_GET['id'] ?? null;
$filename = $_GET['filename'] ?? null;

if (!$id && !$filename) {
    jsonResponse(false, 'Dosya ID veya adı gerekli!');
}

// Yükleme dizini
$uploadDir = __DIR__ . '/../assets/uploads/';

// Dosyayı bul
$iterator = new DirectoryIterator($uploadDir);
$fileToDelete = null;

foreach ($iterator as $fileinfo) {
    if ($fileinfo->isDot() || $fileinfo->isDir()) {
        continue;
    }
    
    $currentFilename = $fileinfo->getFilename();
    $currentId = md5($currentFilename);
    
    if (($id && $currentId === $id) || ($filename && $currentFilename === $filename)) {
        $fileToDelete = $fileinfo->getPathname();
        break;
    }
}

if (!$fileToDelete) {
    jsonResponse(false, 'Dosya bulunamadı!');
}

// Dosyayı sil
if (unlink($fileToDelete)) {
    jsonResponse(true, 'Dosya silindi!');
} else {
    jsonResponse(false, 'Dosya silinemedi!');
}
?>
