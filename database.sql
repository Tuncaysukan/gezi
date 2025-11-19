-- Gezi Blog Database Schema
-- MySQL 5.7+

CREATE DATABASE IF NOT EXISTS gezi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gezi_db;

-- Kategoriler
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    post_count INT DEFAULT 0,
    `order` INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Gönderiler
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(255),
    category_id INT,
    view_count INT DEFAULT 0,
    is_featured TINYINT(1) DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Hikayeler (Stories)
CREATE TABLE IF NOT EXISTS stories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    short_title VARCHAR(10) NOT NULL,
    image VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    `order` INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    is_new TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Kayan Haberler
CREATE TABLE IF NOT EXISTS breaking_news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    `order` INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Etiketler (Hashtags)
CREATE TABLE IF NOT EXISTS hashtags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    url VARCHAR(255),
    `order` INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Kategori Kutuları (4'lü)
CREATE TABLE IF NOT EXISTS category_boxes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    icon VARCHAR(50),
    color VARCHAR(20),
    `order` INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bilgi Kartları (5'li)
CREATE TABLE IF NOT EXISTS info_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    color VARCHAR(20),
    `order` INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bildirimler
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    message VARCHAR(255) NOT NULL,
    time_text VARCHAR(50),
    url VARCHAR(255),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Site Ayarları
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Kullanıcılar (Admin)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    full_name VARCHAR(100),
    is_active TINYINT(1) DEFAULT 1,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Örnek Veriler
INSERT INTO categories (name, slug, description, icon, post_count) VALUES
('Doğa', 'doga', 'Doğa ve macera', 'fa-solid fa-tree', 24),
('Kültür', 'kultur', 'Kültür ve sanat', 'fa-solid fa-palette', 18),
('Macera', 'macera', 'Macera ve aktiviteler', 'fa-solid fa-hiking', 15);

INSERT INTO breaking_news (title, url, `order`, is_active) VALUES
('WordPress ile Sanal Mağaza Açarken Hızlı ve Kolay Entegrasyon Çözümleri', '#', 1, 1),
('Google PageSpeed Sonuçlarını İyileştirmek İçin WordPress\'te Yapılabilecek Optimizasyonlar', '#', 2, 1);

INSERT INTO hashtags (name, url, `order`) VALUES
('Softinays', '#', 1),
('Yapay Zeka', '#', 2),
('Pars Blog Teması', '#', 3),
('WordPress', '#', 4);

INSERT INTO category_boxes (title, description, icon, color, `order`) VALUES
('Başarıcağız Kutlu', 'Motivasyon ve başarı hikayeleri', 'fa-solid fa-book-open', 'blue', 1),
('Günlük Yaşam', 'Hayatınızı kolaylaştıran ipuçları', 'fa-solid fa-heart', 'pink', 2),
('Kişisel Gelişim', 'Kendinizi geliştirin', 'fa-solid fa-lightbulb', 'yellow', 3),
('Sağlık & Spor', 'Sağlıklı yaşam rehberi', 'fa-solid fa-leaf', 'green', 4);

INSERT INTO info_cards (title, description, color, `order`) VALUES
('Eğlence & Kültür', 'Desteklere ne için, nasıl başvurulur?', 'blue', 1),
('Günlük Yaşam', 'Başarılardan ne öğrenilir?', 'pink', 2),
('Kişisel Gelişim', 'Sivil Düşün nedir, neyi haber verir?', 'orange', 3),
('Sağlık & Spor', 'Neyin, nasıl parçası olunur?', 'teal', 4),
('Seyahat & Keşif', 'Nasıl bir ağ kuruyoruz?', 'purple', 5);

-- Admin kullanıcısı oluştur (username: admin, password: password)
INSERT INTO users (username, password, email, full_name) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@gezi.com', 'Admin User');
