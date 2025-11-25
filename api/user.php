<?php
/**
 * User Profile API
 */
session_start();
header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';

$action = $_GET['action'] ?? '';

function respond($success, $message, $data = null) {
    echo json_encode(['success' => $success, 'message' => $message, 'data' => $data]);
    exit;
}

try {
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        respond(false, 'Yetkisiz erişim.');
    }

    $database = new Database();
    $db = $database->getConnection();
    $adminId = (int)($_SESSION['admin_id'] ?? 0);

    if ($action === 'get_me') {
        $stmt = $db->prepare('SELECT id, username, email, full_name, last_login, created_at FROM users WHERE id = :id LIMIT 1');
        $stmt->bindParam(':id', $adminId);
        $stmt->execute();
        $user = $stmt->fetch();
        if (!$user) respond(false, 'Kullanıcı bulunamadı.');
        respond(true, 'OK', $user);
    }

    // Read JSON body
    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    if ($action === 'update_profile') {
        $full_name = trim($input['full_name'] ?? '');
        $email = trim($input['email'] ?? '');
        if ($full_name === '' || $email === '') {
            respond(false, 'Ad Soyad ve Email gerekli.');
        }
        $stmt = $db->prepare('UPDATE users SET full_name = :full_name, email = :email, updated_at = NOW() WHERE id = :id');
        $stmt->bindParam(':full_name', $full_name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':id', $adminId);
        $ok = $stmt->execute();
        if ($ok) {
            $_SESSION['admin_name'] = $full_name;
            respond(true, 'Profil güncellendi.');
        } else {
            respond(false, 'Profil güncellenemedi.');
        }
    }

    if ($action === 'change_password') {
        $current = (string)($input['current_password'] ?? '');
        $new = (string)($input['new_password'] ?? '');
        $confirm = (string)($input['confirm_password'] ?? '');
        if ($new === '' || $confirm === '' || $current === '') {
            respond(false, 'Tüm alanlar gerekli.');
        }
        if ($new !== $confirm) {
            respond(false, 'Yeni şifre ile doğrulama eşleşmiyor.');
        }
        $stmt = $db->prepare('SELECT password FROM users WHERE id = :id');
        $stmt->bindParam(':id', $adminId);
        $stmt->execute();
        $row = $stmt->fetch();
        if (!$row || !password_verify($current, $row['password'])) {
            respond(false, 'Mevcut şifre hatalı.');
        }
        $hash = password_hash($new, PASSWORD_BCRYPT);
        $upd = $db->prepare('UPDATE users SET password = :p, updated_at = NOW() WHERE id = :id');
        $upd->bindParam(':p', $hash);
        $upd->bindParam(':id', $adminId);
        $ok = $upd->execute();
        if ($ok) respond(true, 'Şifre güncellendi.');
        respond(false, 'Şifre güncellenemedi.');
    }

    respond(false, 'Geçersiz işlem.');
} catch (Throwable $e) {
    respond(false, 'Hata: ' . $e->getMessage());
}
