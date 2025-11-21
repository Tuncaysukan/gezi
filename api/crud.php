<?php
/**
 * Generic CRUD API Handler
 * Tüm tablolar için ortak CRUD işlemleri
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../models/Models.php';

// JSON çıktı fonksiyonu
function jsonResponse($success, $message, $data = null) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// POST verilerini al
$input = json_decode(file_get_contents('php://input'), true);
$action = $_GET['action'] ?? '';
$table = $_GET['table'] ?? '';

// Model eşleştirme
$modelMap = [
    'categories' => 'Category',
    'posts' => 'Post',
    'stories' => 'Story',
    'breaking_news' => 'BreakingNews',
    'hashtags' => 'Hashtag',
    'category_boxes' => 'CategoryBox',
    'info_cards' => 'InfoCard',
    'category_box_posts' => 'CategoryBoxPost',
    'info_card_posts' => 'InfoCardPost',
    'notifications' => 'Notification',
    'settings' => 'Setting',
    'backups' => 'Backup'
];

// Model kontrolü
if (!isset($modelMap[$table]) && $action !== 'update_setting' && $action !== 'get_setting') {
    jsonResponse(false, 'Geçersiz tablo!');
}

if (isset($modelMap[$table])) {
    $modelClass = $modelMap[$table];
    $model = new $modelClass();
}

// CRUD İşlemleri
try {
    switch ($action) {
        
        // LİSTELE (DataTables için)
        case 'list':
            $data = $model->getAll();
            jsonResponse(true, 'Başarılı', $data);
            break;
        
        // TEK KAYIT GETİR
        case 'get':
            $id = $_GET['id'] ?? null;
            if (!$id) {
                jsonResponse(false, 'ID gerekli!');
            }
            $data = $model->getById($id);
            jsonResponse(true, 'Başarılı', $data);
            break;
        
        // OLUŞTUR
        case 'create':
            if (!$input) {
                jsonResponse(false, 'Veri gönderilmedi!');
            }
            
            $result = $model->create($input);
            if ($result) {
                jsonResponse(true, 'Başarıyla oluşturuldu!');
            } else {
                jsonResponse(false, 'Oluşturma başarısız!');
            }
            break;
        
        // GÜNCELLE
        case 'update':
            $id = $_GET['id'] ?? $input['id'] ?? null;
            if (!$id) {
                jsonResponse(false, 'ID gerekli!');
            }
            
            // ID'yi input'tan çıkar
            unset($input['id']);
            
            $result = $model->update($id, $input);
            if ($result) {
                jsonResponse(true, 'Başarıyla güncellendi!');
            } else {
                jsonResponse(false, 'Güncelleme başarısız!');
            }
            break;
        
        // SİL
        case 'delete':
            $id = $_GET['id'] ?? $input['id'] ?? null;
            if (!$id) {
                jsonResponse(false, 'ID gerekli!');
            }
            
            $result = $model->delete($id);
            if ($result) {
                jsonResponse(true, 'Başarıyla silindi!');
            } else {
                jsonResponse(false, 'Silme başarısız!');
            }
            break;
        
        // AKTİF/PASİF
        case 'toggle':
            $id = $_GET['id'] ?? $input['id'] ?? null;
            if (!$id) {
                jsonResponse(false, 'ID gerekli!');
            }
            
            $result = $model->toggleActive($id);
            if ($result) {
                jsonResponse(true, 'Durum değiştirildi!');
            } else {
                jsonResponse(false, 'Durum değiştirme başarısız!');
            }
            break;
        
        // SIRA GÜNCELLE
        case 'order':
            $id = $_GET['id'] ?? $input['id'] ?? null;
            $order = $_GET['order'] ?? $input['order'] ?? null;
            
            if (!$id || $order === null) {
                jsonResponse(false, 'ID ve sıra gerekli!');
            }
            
            $result = $model->updateOrder($id, $order);
            if ($result) {
                jsonResponse(true, 'Sıra güncellendi!');
            } else {
                jsonResponse(false, 'Sıra güncelleme başarısız!');
            }
            break;
        
        // SETTINGS İÇİN ÖZEL İŞLEMLER
        case 'update_setting':
            if (!$input || !isset($input['key']) || !isset($input['value'])) {
                jsonResponse(false, 'Key ve value gerekli!');
            }
            
            $settingModel = new Setting();
            $result = $settingModel->set($input['key'], $input['value']);
            
            if ($result) {
                jsonResponse(true, 'Ayar kaydedildi!');
            } else {
                jsonResponse(false, 'Ayar kaydetme başarısız!');
            }
            break;
        
        case 'get_setting':
            $key = $_GET['key'] ?? $input['key'] ?? null;
            if (!$key) {
                jsonResponse(false, 'Key gerekli!');
            }
            
            $settingModel = new Setting();
            $value = $settingModel->get($key);
            jsonResponse(true, 'Başarılı', ['value' => $value]);
            break;
        
        default:
            jsonResponse(false, 'Geçersiz işlem!');
    }
    
} catch (Exception $e) {
    jsonResponse(false, 'Hata: ' . $e->getMessage());
}
?>
