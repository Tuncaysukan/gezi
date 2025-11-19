<?php
/**
 * Medya Dosyaları Listeleme API
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

// Yükleme dizini
$uploadDir = __DIR__ . '/../assets/uploads/';

// Dizin yoksa hata
if (!file_exists($uploadDir)) {
    jsonResponse(true, 'Henüz dosya yüklenmedi', []);
}

// Dosyaları listele
$files = [];
$iterator = new DirectoryIterator($uploadDir);

foreach ($iterator as $fileinfo) {
    if ($fileinfo->isDot() || $fileinfo->isDir()) {
        continue;
    }
    
    $filename = $fileinfo->getFilename();
    $filepath = $fileinfo->getPathname();
    $size = $fileinfo->getSize();
    $extension = strtolower($fileinfo->getExtension());
    
    // Dosya tipini belirle
    $type = 'file';
    $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    $videoExtensions = ['mp4', 'mpeg', 'avi', 'mov'];
    
    if (in_array($extension, $imageExtensions)) {
        $type = 'image';
    } elseif (in_array($extension, $videoExtensions)) {
        $type = 'video';
    }
    
    $files[] = [
        'id' => md5($filename),
        'name' => $filename,
        'type' => $type,
        'size' => $size < 1024 ? $size . ' B' : 
                 ($size < 1048576 ? round($size / 1024, 2) . ' KB' : 
                 round($size / 1048576, 2) . ' MB'),
        'url' => 'assets/uploads/' . $filename,
        'date' => date('Y-m-d H:i:s', $fileinfo->getMTime())
    ];
}

// Tarihe göre sırala (en yeni önce)
usort($files, function($a, $b) {
    return strtotime($b['date']) - strtotime($a['date']);
});

jsonResponse(true, 'Başarılı', $files);
?>
