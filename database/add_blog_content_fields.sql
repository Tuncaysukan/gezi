-- Kategori Kutuları ve Bilgi Kartları için Blog İçeriği Alanları
-- Bu alanlar sayesinde her kutu/kart için zengin blog yazısı yazılabilir

-- Category Boxes tablosuna blog alanları ekle
ALTER TABLE category_boxes
ADD COLUMN blog_title VARCHAR(255) NULL AFTER description,
ADD COLUMN blog_excerpt TEXT NULL AFTER blog_title,
ADD COLUMN blog_content LONGTEXT NULL AFTER blog_excerpt,
ADD COLUMN featured_image VARCHAR(255) NULL AFTER blog_content,
ADD COLUMN view_count INT DEFAULT 0 AFTER featured_image,
ADD COLUMN published_at TIMESTAMP NULL AFTER view_count;

-- Info Cards tablosuna blog alanları ekle
ALTER TABLE info_cards
ADD COLUMN blog_title VARCHAR(255) NULL AFTER description,
ADD COLUMN blog_excerpt TEXT NULL AFTER blog_title,
ADD COLUMN blog_content LONGTEXT NULL AFTER blog_excerpt,
ADD COLUMN featured_image VARCHAR(255) NULL AFTER blog_content,
ADD COLUMN view_count INT DEFAULT 0 AFTER featured_image,
ADD COLUMN published_at TIMESTAMP NULL AFTER view_count;
