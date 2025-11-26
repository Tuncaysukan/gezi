<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    echo json_encode(['success' => true]);
    exit;
}

require_once __DIR__ . '/../models/Models.php';

function respond($ok, $msg, $data = null) {
    echo json_encode(['success' => $ok, 'message' => $msg, 'data' => $data]);
    exit;
}

try {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $subject = trim($input['subject'] ?? '');
    $message = trim($input['message'] ?? '');

    if ($name === '' || $email === '' || $subject === '' || $message === '') {
        respond(false, 'Lütfen gerekli alanları doldurun.');
    }

    // Basit email kontrolü
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(false, 'Geçerli bir e-posta giriniz.');
    }

    $model = new ContactMessage();

    // Tablo yoksa create() DESCRIBE sırasında hata verebilir.
    // Bu durumda kullanıcı database.sql içindeki contact_messages şemasını uygulamalıdır.
    $ok = $model->create([
        'full_name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message,
        'is_read' => 0,
        'created_at' => date('Y-m-d H:i:s')
    ]);

    if ($ok) {
        respond(true, 'Mesajınız kaydedildi.');
    } else {
        respond(false, 'Mesaj kaydı başarısız.');
    }
} catch (Throwable $e) {
    respond(false, 'Hata: ' . $e->getMessage());
}
