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

class CategoryBoxPost extends Model {
    protected $table = 'category_box_posts';
    
    public function getAllWithCategoryBox() {
        $query = "SELECT p.*, cb.title as category_box_title 
                  FROM {$this->table} p 
                  LEFT JOIN category_boxes cb ON p.category_box_id = cb.id 
                  ORDER BY p.created_at DESC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}

class InfoCardPost extends Model {
    protected $table = 'info_card_posts';
    
    public function getAllWithInfoCard() {
        $query = "SELECT p.*, ic.title as info_card_title 
                  FROM {$this->table} p 
                  LEFT JOIN info_cards ic ON p.info_card_id = ic.id 
                  ORDER BY p.created_at DESC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }
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
                  ON DUPLICATE KEY UPDATE setting_value = :value2";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':key', $key);
        $stmt->bindParam(':value', $value);
        $stmt->bindParam(':value2', $value);
        return $stmt->execute();
    }
}

class Backup extends Model {
    protected $table = 'backups';
}
?>
