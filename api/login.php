<?php
/**
 * Login API
 */

session_start();

header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';

// POST verilerini al
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode([
        'success' => false,
        'message' => 'Kullanıcı adı ve şifre gerekli!'
    ]);
    exit;
}

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Kullanıcıyı bul
    $query = "SELECT * FROM users WHERE username = :username AND is_active = 1 LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    
    $user = $stmt->fetch();
    
    if ($user && password_verify($password, $user['password'])) {
        // Başarılı giriş
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_id'] = $user['id'];
        $_SESSION['admin_username'] = $user['username'];
        $_SESSION['admin_name'] = $user['full_name'];
        
        // Last login güncelle
        $updateQuery = "UPDATE users SET last_login = NOW() WHERE id = :id";
        $updateStmt = $db->prepare($updateQuery);
        $updateStmt->bindParam(':id', $user['id']);
        $updateStmt->execute();
        
        echo json_encode([
            'success' => true,
            'message' => 'Giriş başarılı!',
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'name' => $user['full_name']
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Kullanıcı adı veya şifre hatalı!'
        ]);
    }
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Bir hata oluştu: ' . $e->getMessage()
    ]);
}
?>
