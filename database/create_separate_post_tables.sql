-- Kategori Kutuları için blog yazıları tablosu
CREATE TABLE IF NOT EXISTS category_box_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_box_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(255),
    view_count INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_box_id) REFERENCES category_boxes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bilgi Kartları için blog yazıları tablosu
CREATE TABLE IF NOT EXISTS info_card_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    info_card_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(255),
    view_count INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (info_card_id) REFERENCES info_cards(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ülke olmayan kategorileri sil (sadece ülkeler kalsın)
DELETE FROM categories WHERE name NOT IN (
    'Türkiye', 'Almanya', 'Fransa', 'İtalya', 'İspanya', 'Birleşik Krallık',
    'Hollanda', 'Belçika', 'İsviçre', 'Avusturya', 'Yunanistan', 'Portekiz',
    'İsveç', 'Norveç', 'Danimarka', 'Finlandiya', 'Polonya', 'Çekya',
    'Macaristan', 'Romanya', 'Bulgaristan', 'Hırvatistan', 'İrlanda',
    'İzlanda', 'Lüksemburg', 'Malta', 'Slovenya', 'Slovakya', 'Estonya',
    'Letonya', 'Litvanya', 'Kıbrıs', 'Karadağ', 'Sırbistan', 'Arnavutluk',
    'Makedonya', 'Bosna-Hersek', 'Moldova', 'Ukrayna', 'Belarus'
);
