<?php
/**
 * Base Model Class
 * Tüm modeller bu sınıfı extend eder
 */

require_once __DIR__ . '/../config/database.php';

class Model {
    protected $db;
    protected $table;
    private $columnsCache = null;
    
    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }
    
    // Tümünü getir
    public function getAll($orderBy = 'id', $orderDir = 'DESC') {
        $query = "SELECT * FROM {$this->table} ORDER BY {$orderBy} {$orderDir}";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    
    // ID'ye göre getir
    public function getById($id) {
        $query = "SELECT * FROM {$this->table} WHERE id = :id LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }
    
    // Oluştur
    public function create($data) {
        $data = $this->filterDataByTableColumns($data, /*allowId*/ false);
        $columns = '`' . implode('`, `', array_keys($data)) . '`';
        $placeholders = ':' . implode(', :', array_keys($data));
        $query = "INSERT INTO {$this->table} ({$columns}) VALUES ({$placeholders})";
        $stmt = $this->db->prepare($query);
        foreach ($data as $key => $value) {
            $stmt->bindValue(':' . $key, $value);
        }
        return $stmt->execute();
    }
    
    // Güncelle
    public function update($id, $data) {
        $data = $this->filterDataByTableColumns($data, /*allowId*/ false);
        $set = [];
        foreach ($data as $key => $value) {
            $set[] = "`{$key}` = :{$key}";
        }
        $setString = implode(', ', $set);
        $query = "UPDATE {$this->table} SET {$setString} WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        foreach ($data as $key => $value) {
            $stmt->bindValue(':' . $key, $value);
        }
        return $stmt->execute();
    }
    
    // Sil
    public function delete($id) {
        $query = "DELETE FROM {$this->table} WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
    
    // Aktif/Pasif durumu değiştir
    public function toggleActive($id) {
        $query = "UPDATE {$this->table} SET is_active = NOT is_active WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
    
    // Sıra değiştir
    public function updateOrder($id, $order) {
        $query = "UPDATE {$this->table} SET `order` = :order WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':order', $order);
        return $stmt->execute();
    }

    private function getTableColumns() {
        if ($this->columnsCache !== null) {
            return $this->columnsCache;
        }
        $stmt = $this->db->prepare("DESCRIBE {$this->table}");
        $stmt->execute();
        $cols = $stmt->fetchAll();
        $this->columnsCache = array_map(function($c){ return $c['Field']; }, $cols);
        return $this->columnsCache;
    }

    private function filterDataByTableColumns($data, $allowId = false) {
        $columns = $this->getTableColumns();
        $filtered = [];
        foreach ($data as $key => $value) {
            if (!$allowId && $key === 'id') { continue; }
            if (in_array($key, $columns, true)) {
                $filtered[$key] = $value;
            }
        }
        return $filtered;
    }
}
?>
