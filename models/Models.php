<?php
require_once __DIR__ . '/Model.php';

class Category extends Model {
    protected $table = 'categories';
    
    public function getActive() {
        $query = "SELECT * FROM {$this->table} WHERE is_active = 1 ORDER BY `order` ASC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}

class Post extends Model {
    protected $table = 'posts';
    
    public function getAllWithCategory() {
        $query = "SELECT p.*, c.name as category_name 
                  FROM {$this->table} p 
                  LEFT JOIN categories c ON p.category_id = c.id 
                  ORDER BY p.created_at DESC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    
    public function getFeatured() {
        $query = "SELECT * FROM {$this->table} WHERE is_featured = 1 AND is_active = 1 LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetch();
    }
    
    public function setFeatured($id) {
        // Önce tüm featured'ları kaldır
        $query = "UPDATE {$this->table} SET is_featured = 0";
        $this->db->prepare($query)->execute();
        
        // Yeni featured'ı ayarla
        $query = "UPDATE {$this->table} SET is_featured = 1 WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}

class Story extends Model {
    protected $table = 'stories';
}

class BreakingNews extends Model {
    protected $table = 'breaking_news';
}

class Hashtag extends Model {
    protected $table = 'hashtags';
}

class CategoryBox extends Model {
    protected $table = 'category_boxes';
}

class InfoCard extends Model {
    protected $table = 'info_cards';
}

class Notification extends Model {
    protected $table = 'notifications';
}

class Setting extends Model {
    protected $table = 'settings';
    
    public function get($key) {
        $query = "SELECT setting_value FROM {$this->table} WHERE setting_key = :key LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':key', $key);
        $stmt->execute();
        $result = $stmt->fetch();
        return $result ? $result['setting_value'] : null;
    }
    
    public function set($key, $value) {
        $query = "INSERT INTO {$this->table} (setting_key, setting_value) 
                  VALUES (:key, :value) 
                  ON DUPLICATE KEY UPDATE setting_value = :value";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':key', $key);
        $stmt->bindParam(':value', $value);
        return $stmt->execute();
    }
}
?>
