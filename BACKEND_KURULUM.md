# Gezi Blog - Backend Kurulum Talimatları

## 📋 Gereksinimler
- PHP 7.4 veya üzeri
- MySQL 5.7 veya üzeri
- Apache/Nginx web sunucusu
- PDO PHP Extension

## 🚀 Kurulum Adımları

### 1. Veritabanı Oluşturma
```bash
# MySQL'e bağlan
mysql -u root -p

# database.sql dosyasını import et
mysql -u root -p < database.sql
```

VEYA phpMyAdmin kullanarak:
1. phpMyAdmin'e giriş yap
2. "Import" sekmesine tıkla
3. `database.sql` dosyasını seç
4. "Go" butonuna tıkla

### 2. Veritabanı Ayarları
`config/database.php` dosyasını düzenle:

```php
private $host = "localhost";
private $db_name = "gezi_db";  // Veritabanı adı
private $username = "root";     // MySQL kullanıcı adı
private $password = "";         // MySQL şifresi
```

### 3. Klasör Yapısı
```
gezi/
├── admin/              # Admin paneli
│   ├── css/
│   ├── js/
│   │   ├── admin.js
│   │   └── admin.crud.js  # CRUD işlemleri
│   └── index.html
├── api/                # API endpoints
│   └── crud.php        # Tüm CRUD işlemleri
├── config/             # Konfigürasyon
│   └── database.php
├── models/             # Model sınıfları
│   ├── Model.php       # Base Model
│   └── Models.php      # Tüm modeller
├── assets/             # Frontend assets
└── index.html          # Frontend
```

## 📊 CRUD Kullanımı

### JavaScript ile CRUD İşlemleri

```javascript
// LİSTELE - DataTable ile
CRUD.initDataTable('myTable', 'categories', [
    { data: 'id' },
    { data: 'name' },
    // ... diğer kolonlar
]);

// OLUŞTUR
CRUD.create('categories', {
    name: 'Yeni Kategori',
    slug: 'yeni-kategori',
    is_active: 1
}, function(response) {
    CRUD.reloadTable('myTable');
});

// GÜNCELLE
CRUD.update('categories', id, {
    name: 'Güncellenmiş Kategori'
}, function(response) {
    CRUD.reloadTable('myTable');
});

// SİL
CRUD.delete('categories', id, function(response) {
    CRUD.reloadTable('myTable');
});

// AKTİF/PASİF
CRUD.toggle('categories', id, function(response) {
    CRUD.reloadTable('myTable');
});
```

## 🎯 Kullanılabilir Tablolar

- `categories` - Kategoriler
- `posts` - Gönderiler
- `stories` - Hikayeler
- `breaking_news` - Kayan Haberler
- `hashtags` - Etiketler
- `category_boxes` - Kategori Kutuları
- `info_cards` - Bilgi Kartları
- `notifications` - Bildirimler
- `settings` - Ayarlar

## 📝 Örnek Sayfa Oluşturma

```javascript
function getMyPageTemplate() {
    return `
        <h2>Başlık</h2>
        
        <form id="myForm">
            <input type="text" name="field_name" required>
            <button type="submit">Kaydet</button>
        </form>
        
        <table id="myTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>İşlem</th>
                </tr>
            </thead>
        </table>
        
        <script>
        $(document).ready(function() {
            // DataTable başlat
            CRUD.initDataTable('myTable', 'table_name', [
                { data: 'id' },
                { data: 'name' },
                { 
                    data: null,
                    render: function(data, type, row) {
                        return \`
                            <button onclick="edit(\${row.id})">Düzenle</button>
                            <button onclick="remove(\${row.id})">Sil</button>
                        \`;
                    }
                }
            ]);
            
            // Form submit
            $('#myForm').on('submit', function(e) {
                e.preventDefault();
                const formData = CRUD.serializeForm('myForm');
                
                CRUD.create('table_name', formData, function() {
                    CRUD.reloadTable('myTable');
                    CRUD.resetForm('myForm');
                });
            });
        });
        
        function edit(id) {
            CRUD.get('table_name', id, function(data) {
                CRUD.fillForm('myForm', data);
            });
        }
        
        function remove(id) {
            CRUD.delete('table_name', id, function() {
                CRUD.reloadTable('myTable');
            });
        }
        </script>
    \`;
}
```

## 🔧 API Endpoints

Tüm işlemler tek bir endpoint üzerinden:

```
GET  /api/crud.php?action=list&table=categories
GET  /api/crud.php?action=get&table=categories&id=1
POST /api/crud.php?action=create&table=categories
POST /api/crud.php?action=update&table=categories&id=1
POST /api/crud.php?action=delete&table=categories&id=1
POST /api/crud.php?action=toggle&table=categories&id=1
POST /api/crud.php?action=order&table=categories&id=1&order=5
```

## ⚠️ Önemli Notlar

1. **SweetAlert2** tüm CRUD işlemlerinde otomatik gösterilir
2. **DataTables** Türkçe dil desteği dahil
3. **jQuery** tüm Ajax işlemlerinde kullanılır
4. Tüm formlar `CRUD.serializeForm()` ile JSON'a çevrilir
5. Checkbox değerleri otomatik 0/1 olarak işlenir

## 🎨 Kütüphaneler

- jQuery 3.7.1
- DataTables 1.13.7 (Excel, PDF, Print desteği)
- SweetAlert2 11
- Bootstrap 5.3.2
- FontAwesome 6.5.1
- Chart.js 4.4.0

## 📞 Destek

Herhangi bir sorun olursa:
1. Veritabanı bağlantısını kontrol edin
2. PHP error log'larını inceleyin
3. Browser console'u kontrol edin
