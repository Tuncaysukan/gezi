<?php
/**
 * Backup Model
 */

require_once __DIR__ . '/BaseModel.php';

class Backup extends BaseModel {
    protected $table = 'backups';
    
    protected $fillable = [
        'filename',
        'type',
        'size',
        'compressed',
        'created_at'
    ];
}
?>
