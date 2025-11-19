// ========================================
// Admin Panel JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === SIDEBAR TOGGLE ===
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileToggle = document.getElementById('mobileToggle');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });
    
    
    // === PAGE NAVIGATION ===
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    const contentPages = document.querySelectorAll('.content-page');
    const pageTitle = document.querySelector('.page-title');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const page = this.dataset.page;
            
            // Update active nav
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            this.closest('.nav-item').classList.add('active');
            
            // Update page title
            pageTitle.textContent = this.querySelector('span').textContent;
            
            // Load page content
            loadPage(page);
            
            // Close mobile sidebar
            if (window.innerWidth <= 991) {
                sidebar.classList.remove('show');
            }
        });
    });
    
    function loadPage(page) {
        // Clear all content first
        const pageContent = document.getElementById('pageContent');
        
        // Remove all existing pages
        pageContent.innerHTML = '';
        
        // Create and show new page
        const newPage = createPage(page);
        pageContent.appendChild(newPage);
    }
    
    function createPage(page) {
        const newPage = document.createElement('div');
        newPage.className = 'content-page active';
        newPage.id = `${page}-page`;
        
        // Page content based on type
        const pageTemplates = {
            posts: getPostsTemplate(),
            stories: getStoriesTemplate(),
            'breaking-news': getBreakingNewsTemplate(),
            'featured-post': getFeaturedPostTemplate(),
            categories: getCategoriesTemplate(),
            'category-boxes': getCategoryBoxesTemplate(),
            'info-cards': getInfoCardsTemplate(),
            hashtags: getHashtagsTemplate(),
            widgets: getWidgetsTemplate(),
            header: getHeaderTemplate(),
            footer: getFooterTemplate(),
            notifications: getNotificationsTemplate(),
            adsense: getAdsenseTemplate(),
            media: getMediaTemplate(),
            seo: getSEOTemplate(),
            settings: getSettingsTemplate(),
            performance: getPerformanceTemplate(),
            backup: getBackupTemplate()
        };
        
        newPage.innerHTML = pageTemplates[page] || `<h2>${page}</h2><p>Sayfa içeriği yükleniyor...</p>`;
        
        // Script'leri çalıştır
        setTimeout(() => {
            const scripts = newPage.querySelectorAll('script');
            scripts.forEach(script => {
                eval(script.textContent);
            });
        }, 100);
        
        return newPage;
    }
    
    
    // === CHART.JS - VISITOR STATISTICS ===
    const ctx = document.getElementById('visitorChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
                datasets: [{
                    label: 'Ziyaretçiler',
                    data: [1200, 1900, 3000, 2500, 2800, 3200, 2400],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    
    // === PAGE TEMPLATES ===
    
    function getPostsTemplate() {
        return `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Gönderiler</h2>
                <button class="btn btn-primary" onclick="openPostEditor()">
                    <i class="fas fa-plus"></i> Yeni Gönderi
                </button>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Başlık</th>
                                    <th>Kategori</th>
                                    <th>Tarih</th>
                                    <th>Görüntülenme</th>
                                    <th>Durum</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>İstanbul'un Gizli Bahçeleri</td>
                                    <td>Doğa</td>
                                    <td>15.11.2025</td>
                                    <td>1,245</td>
                                    <td><span class="badge-status badge-success">Yayında</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Kapadokya'da Bir Gün</td>
                                    <td>Kültür</td>
                                    <td>14.11.2025</td>
                                    <td>856</td>
                                    <td><span class="badge-status badge-success">Yayında</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
    
    function getStoriesTemplate() {
        return `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Hikayeler (Story)</h2>
                <button class="btn btn-primary" onclick="openStoryEditor()">
                    <i class="fas fa-plus"></i> Yeni Hikaye Ekle
                </button>
            </div>
            
            <div class="row g-4 mb-4">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5>Aktif Hikayeler</h5>
                        </div>
                        <div class="card-body">
                            <div class="row g-3" id="storiesGrid">
                                <div class="col-md-3">
                                    <div class="story-admin-item">
                                        <div class="story-admin-preview">
                                            <img src="../assets/img/story1.jpg" alt="Story">
                                            <span class="story-badge badge-success">Aktif</span>
                                        </div>
                                        <div class="story-admin-info">
                                            <h6>WordPress Mağaza</h6>
                                            <small class="text-muted">15.11.2025</small>
                                        </div>
                                        <div class="story-admin-actions">
                                            <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                            <button class="btn btn-sm btn-warning"><i class="fas fa-eye-slash"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="story-admin-item">
                                        <div class="story-admin-preview">
                                            <img src="../assets/img/story2.jpg" alt="Story">
                                            <span class="story-badge badge-success">Aktif</span>
                                        </div>
                                        <div class="story-admin-info">
                                            <h6>Google PageSpeed</h6>
                                            <small class="text-muted">14.11.2025</small>
                                        </div>
                                        <div class="story-admin-actions">
                                            <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                            <button class="btn btn-sm btn-warning"><i class="fas fa-eye-slash"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="story-admin-item">
                                        <div class="story-admin-preview">
                                            <img src="../assets/img/story3.jpg" alt="Story">
                                            <span class="story-badge badge-success">Aktif</span>
                                        </div>
                                        <div class="story-admin-info">
                                            <h6>Özgüven Rehberi</h6>
                                            <small class="text-muted">13.11.2025</small>
                                        </div>
                                        <div class="story-admin-actions">
                                            <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                            <button class="btn btn-sm btn-warning"><i class="fas fa-eye-slash"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5>Yeni Hikaye Ekle</h5>
                        </div>
                        <div class="card-body">
                            <form id="storyForm">
                                <div class="mb-3">
                                    <label class="form-label">Hikaye Başlığı</label>
                                    <input type="text" class="form-control" placeholder="Örn: WordPress Rehberi" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Kısa Başlık (Max 10 karakter)</label>
                                    <input type="text" class="form-control" maxlength="10" placeholder="WordPress..." required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Hikaye Görseli (1:1 oran)</label>
                                    <input type="file" class="form-control" accept="image/*" required>
                                    <small class="text-muted">Önerilen: 400x400px</small>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Bağlantı URL</label>
                                    <input type="url" class="form-control" placeholder="https://...">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Sıra</label>
                                    <input type="number" class="form-control" value="1" min="1">
                                </div>
                                <div class="mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="storyActive" checked>
                                        <label class="form-check-label" for="storyActive">
                                            Aktif
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">
                                    <i class="fas fa-save"></i> Kaydet
                                </button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card mt-3">
                        <div class="card-header">
                            <h5>Hikaye Ayarları</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Maksimum Hikaye Sayısı</label>
                                <input type="number" class="form-control" value="10" min="5" max="20">
                            </div>
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="autoRotate" checked>
                                    <label class="form-check-label" for="autoRotate">
                                        Otomatik Döndür
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Görünüm Süresi (gün)</label>
                                <input type="number" class="form-control" value="7" min="1" max="30">
                            </div>
                            <button class="btn btn-success w-100">
                                <i class="fas fa-check"></i> Ayarları Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function getCategoriesTemplate() {
        return `
            <h2 class="mb-4">Kategoriler</h2>
            
            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 id="categoryFormTitle">Yeni Kategori Ekle</h5>
                        </div>
                        <div class="card-body">
                            <form id="categoryForm">
                                <input type="hidden" id="category_id">
                                <div class="mb-3">
                                    <label class="form-label">Kategori Adı *</label>
                                    <input type="text" class="form-control" name="name" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Slug *</label>
                                    <input type="text" class="form-control" name="slug" required>
                                    <small class="text-muted">URL'de görünecek kısım (örn: doga)</small>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Açıklama</label>
                                    <textarea class="form-control" name="description" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Icon (FontAwesome)</label>
                                    <input type="text" class="form-control" name="icon" placeholder="örn: fa-solid fa-tree">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Sıra</label>
                                    <input type="number" class="form-control" name="order" value="0">
                                </div>
                                <div class="mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" name="is_active" value="1" checked>
                                        <label class="form-check-label">Aktif</label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">
                                    <i class="fas fa-save"></i> <span id="categoryBtnText">Kaydet</span>
                                </button>
                                <button type="button" class="btn btn-secondary w-100 mt-2" id="cancelEditCategory" style="display:none;">
                                    <i class="fas fa-times"></i> İptal
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5>Mevcut Kategoriler</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover" id="categoriesTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Kategori</th>
                                            <th>Slug</th>
                                            <th>Icon</th>
                                            <th>Gönderi</th>
                                            <th>Durum</th>
                                            <th>İşlem</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
            // Sayfa yüklenince DataTable'i başlat
            $(document).ready(function() {
                // DataTable başlat
                CRUD.initDataTable('categoriesTable', 'categories', [
                    { data: 'id' },
                    { data: 'name' },
                    { data: 'slug' },
                    { 
                        data: 'icon',
                        render: function(data) {
                            return data ? '<i class="' + data + '"></i> ' + data : '-';
                        }
                    },
                    { data: 'post_count' },
                    { 
                        data: 'is_active',
                        render: function(data) {
                            return data == 1 
                                ? '<span class="badge-status badge-success">Aktif</span>' 
                                : '<span class="badge-status badge-warning">Pasif</span>';
                        }
                    },
                    { 
                        data: null,
                        render: function(data, type, row) {
                            return '<button class="btn btn-sm btn-primary" onclick="editCategory(' + row.id + ')">' +
                                   '<i class="fas fa-edit"></i></button> ' +
                                   '<button class="btn btn-sm btn-danger" onclick="deleteCategory(' + row.id + ')">' +
                                   '<i class="fas fa-trash"></i></button> ' +
                                   '<button class="btn btn-sm btn-warning" onclick="toggleCategory(' + row.id + ')">' +
                                   '<i class="fas fa-toggle-on"></i></button>';
                        }
                    }
                ]);
                
                // Form submit
                $('#categoryForm').on('submit', function(e) {
                    e.preventDefault();
                    
                    const formData = CRUD.serializeForm('categoryForm');
                    const id = $('#category_id').val();
                    
                    // Checkbox değerini düzenle
                    formData.is_active = $('[name="is_active"]').is(':checked') ? 1 : 0;
                    
                    if (id) {
                        // Güncelle
                        CRUD.update('categories', id, formData, function() {
                            CRUD.reloadTable('categoriesTable');
                            CRUD.resetForm('categoryForm');
                            $('#category_id').val('');
                            $('#categoryFormTitle').text('Yeni Kategori Ekle');
                            $('#categoryBtnText').text('Kaydet');
                            $('#cancelEditCategory').hide();
                        });
                    } else {
                        // Oluştur
                        CRUD.create('categories', formData, function() {
                            CRUD.reloadTable('categoriesTable');
                            CRUD.resetForm('categoryForm');
                        });
                    }
                });
                
                // İptal butonu
                $('#cancelEditCategory').on('click', function() {
                    CRUD.resetForm('categoryForm');
                    $('#category_id').val('');
                    $('#categoryFormTitle').text('Yeni Kategori Ekle');
                    $('#categoryBtnText').text('Kaydet');
                    $(this).hide();
                });
            });
            
            // Düzenle
            window.editCategory = function(id) {
                CRUD.get('categories', id, function(data) {
                    $('#category_id').val(data.id);
                    $('[name="name"]').val(data.name);
                    $('[name="slug"]').val(data.slug);
                    $('[name="description"]').val(data.description);
                    $('[name="icon"]').val(data.icon);
                    $('[name="order"]').val(data.order);
                    $('[name="is_active"]').prop('checked', data.is_active == 1);
                    
                    $('#categoryFormTitle').text('Kategori Düzenle');
                    $('#categoryBtnText').text('Güncelle');
                    $('#cancelEditCategory').show();
                });
            };
            
            // Sil
            window.deleteCategory = function(id) {
                CRUD.delete('categories', id, function() {
                    CRUD.reloadTable('categoriesTable');
                });
            };
            
            // Aktif/Pasif
            window.toggleCategory = function(id) {
                CRUD.toggle('categories', id, function() {
                    CRUD.reloadTable('categoriesTable');
                });
            };
            </script>
        `;
    }
    
    function getMediaTemplate() {
        return `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Medya Kütüphanesi</h2>
                <button class="btn btn-primary" onclick="openMediaUploader()">
                    <i class="fas fa-upload"></i> Dosya Yükle
                </button>
            </div>
            
            <div class="card mb-4">
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-3">
                            <input type="text" class="form-control" placeholder="Ara...">
                        </div>
                        <div class="col-md-3">
                            <select class="form-select">
                                <option>Tüm Tipler</option>
                                <option>Resimler</option>
                                <option>Videolar</option>
                                <option>Dökümanlar</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row g-4">
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card media-item">
                        <img src="../assets/img/post1.jpg" class="card-img-top" alt="Media">
                        <div class="card-body">
                            <p class="mb-0"><small>post1.jpg</small></p>
                            <small class="text-muted">245 KB</small>
                        </div>
                    </div>
                </div>
                <!-- Daha fazla medya öğesi buraya eklenebilir -->
            </div>
        `;
    }
    
    function getSEOTemplate() {
        return `
            <h2 class="mb-4">SEO Ayarları</h2>
            
            <div class="card">
                <div class="card-body">
                    <form id="seoForm">
                        <div class="mb-4">
                            <h5>Genel SEO</h5>
                            <hr>
                            <div class="mb-3">
                                <label class="form-label">Site Başlığı</label>
                                <input type="text" class="form-control" value="Pars - Seo Uyumlu Gezi Teması">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Site Açıklaması</label>
                                <textarea class="form-control" rows="3">SEO uyumlu gezi ve seyahat blogu</textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Anahtar Kelimeler</label>
                                <input type="text" class="form-control" value="gezi, seyahat, blog">
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <h5>Sosyal Medya</h5>
                            <hr>
                            <div class="mb-3">
                                <label class="form-label">Facebook URL</label>
                                <input type="url" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Twitter Handle</label>
                                <input type="text" class="form-control" placeholder="@username">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Instagram URL</label>
                                <input type="url" class="form-control">
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <h5>Robot.txt & Sitemap</h5>
                            <hr>
                            <div class="mb-3">
                                <label class="form-label">Robot.txt İçeriği</label>
                                <textarea class="form-control" rows="5">User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml</textarea>
                            </div>
                            <button type="button" class="btn btn-success me-2" onclick="generateSitemap()">
                                <i class="fas fa-sitemap"></i> Sitemap Oluştur
                            </button>
                            <button type="button" class="btn btn-info" onclick="generateRobotsTxt()">
                                <i class="fas fa-robot"></i> Robot.txt Güncelle
                            </button>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Kaydet</button>
                    </form>
                </div>
            </div>
        `;
    }
    
    function getSettingsTemplate() {
        return `
            <h2 class="mb-4">Site Ayarları</h2>
            
            <div class="card">
                <div class="card-body">
                    <form id="settingsForm">
                        <div class="mb-4">
                            <h5>Genel Ayarlar</h5>
                            <hr>
                            <div class="mb-3">
                                <label class="form-label">Site Adı</label>
                                <input type="text" class="form-control" value="Pars Gezi">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">H1 Yazısı</label>
                                <input type="text" class="form-control" value="Dünyayı Keşfedin">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Logo (Dark Mode)</label>
                                <input type="file" class="form-control" accept="image/*">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Logo (Light Mode)</label>
                                <input type="file" class="form-control" accept="image/*">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Favicon</label>
                                <input type="file" class="form-control" accept="image/x-icon,image/png">
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <h5>Cookie Ayarları</h5>
                            <hr>
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="cookieConsent" checked>
                                    <label class="form-check-label" for="cookieConsent">
                                        Cookie onayı göster
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Cookie Mesajı</label>
                                <textarea class="form-control" rows="2">Bu site, deneyiminizi geliştirmek için çerezler kullanır.</textarea>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <h5>Reklam & Script Ayarları</h5>
                            <hr>
                            <div class="mb-3">
                                <label class="form-label">Head Script Kodları</label>
                                <textarea class="form-control" rows="4" placeholder="Google Analytics, Meta Pixel vb."></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Body Script Kodları</label>
                                <textarea class="form-control" rows="4" placeholder="Reklam kodları vb."></textarea>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <h5>Dil Ayarları</h5>
                            <hr>
                            <div class="mb-3">
                                <label class="form-label">Varsayılan Dil</label>
                                <select class="form-select">
                                    <option value="tr" selected>Türkçe</option>
                                    <option value="en">English</option>
                                    <option value="de">Deutsch</option>
                                </select>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="multiLang">
                                <label class="form-check-label" for="multiLang">
                                    Çoklu dil desteğini etkinleştir
                                </label>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Kaydet</button>
                    </form>
                </div>
            </div>
        `;
    }
    
    function getPerformanceTemplate() {
        return `
            <h2 class="mb-4">Performans Optimizasyonu</h2>
            
            <div class="row g-4 mb-4">
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <h1 class="text-success">95</h1>
                            <p>Google PageSpeed</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <h1 class="text-info">1.2s</h1>
                            <p>Yüklenme Süresi</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <h1 class="text-warning">2.5MB</h1>
                            <p>Sayfa Boyutu</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Optimizasyon Ayarları</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="imageOptimization" checked>
                            <label class="form-check-label" for="imageOptimization">
                                <strong>Otomatik Resim Optimizasyonu</strong><br>
                                <small class="text-muted">Yüklenen resimleri otomatik olarak optimize et</small>
                            </label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="lazyLoad" checked>
                            <label class="form-check-label" for="lazyLoad">
                                <strong>Lazy Loading</strong><br>
                                <small class="text-muted">Resimleri gerektiğinde yükle</small>
                            </label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="minifyCSS" checked>
                            <label class="form-check-label" for="minifyCSS">
                                <strong>CSS Minify</strong><br>
                                <small class="text-muted">CSS dosyalarını sıkıştır</small>
                            </label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="minifyJS" checked>
                            <label class="form-check-label" for="minifyJS">
                                <strong>JavaScript Minify</strong><br>
                                <small class="text-muted">JavaScript dosyalarını sıkıştır</small>
                            </label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="browserCache">
                            <label class="form-check-label" for="browserCache">
                                <strong>Browser Cache</strong><br>
                                <small class="text-muted">Tarayıcı önbelleğini etkinleştir</small>
                            </label>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="runPerformanceTest()">
                        <i class="fas fa-tachometer-alt"></i> Performans Testi Çalıştır
                    </button>
                </div>
            </div>
        `;
    }
    
    function getBackupTemplate() {
        return `
            <h2 class="mb-4">Yedekleme Sistemi</h2>
            
            <div class="row g-4">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h5>Yeni Yedek Oluştur</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Yedekleme Türü</label>
                                <select class="form-select">
                                    <option>Tam Yedek (Veritabanı + Dosyalar)</option>
                                    <option>Sadece Veritabanı</option>
                                    <option>Sadece Dosyalar</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="compressBackup" checked>
                                    <label class="form-check-label" for="compressBackup">
                                        Sıkıştır (.zip)
                                    </label>
                                </div>
                            </div>
                            <button class="btn btn-success w-100" onclick="createBackup()">
                                <i class="fas fa-download"></i> Yedek Oluştur
                            </button>
                        </div>
                    </div>
                    
                    <div class="card mt-4">
                        <div class="card-header">
                            <h5>Otomatik Yedekleme</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="autoBackup">
                                    <label class="form-check-label" for="autoBackup">
                                        Otomatik yedeklemeyi etkinleştir
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Yedekleme Sıklığı</label>
                                <select class="form-select">
                                    <option>Günlük</option>
                                    <option>Haftalık</option>
                                    <option>Aylık</option>
                                </select>
                            </div>
                            <button class="btn btn-primary w-100">Ayarları Kaydet</button>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h5>Yedek Geçmişi</h5>
                        </div>
                        <div class="card-body">
                            <div class="backup-item mb-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>backup_2025_11_17.zip</strong><br>
                                        <small class="text-muted">17.11.2025 22:30 - 45.2 MB</small>
                                    </div>
                                    <div>
                                        <button class="btn btn-sm btn-primary"><i class="fas fa-download"></i></button>
                                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="backup-item mb-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>backup_2025_11_10.zip</strong><br>
                                        <small class="text-muted">10.11.2025 14:15 - 43.8 MB</small>
                                    </div>
                                    <div>
                                        <button class="btn btn-sm btn-primary"><i class="fas fa-download"></i></button>
                                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    
    // === YENİ SAYFA TEMPLATE'LERİ ===
    
    function getBreakingNewsTemplate() {
        return `
            <h2 class="mb-4">Kayan Haberler (Breaking News)</h2>
            
            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 id="breakingNewsFormTitle">Yeni Haber Ekle</h5>
                        </div>
                        <div class="card-body">
                            <form id="breakingNewsForm">
                                <input type="hidden" id="breaking_news_id">
                                <div class="mb-3">
                                    <label class="form-label">Haber Başlığı *</label>
                                    <input type="text" class="form-control" name="title" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Bağlantı URL</label>
                                    <input type="url" class="form-control" name="url" placeholder="https://...">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Sıra</label>
                                    <input type="number" class="form-control" name="order" value="0" min="0">
                                </div>
                                <div class="mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" name="is_active" value="1" checked>
                                        <label class="form-check-label">Aktif</label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">
                                    <i class="fas fa-save"></i> <span id="breakingNewsBtnText">Kaydet</span>
                                </button>
                                <button type="button" class="btn btn-secondary w-100 mt-2" id="cancelEditBreakingNews" style="display:none;">
                                    <i class="fas fa-times"></i> İptal
                                </button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card mt-3">
                        <div class="card-header">
                            <h5>Ayarlar</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Animasyon Hızı (ms)</label>
                                <input type="number" class="form-control" value="3000" min="1000" max="10000">
                                <small class="text-muted">Kaç milisaniyede bir geçiş yapsın</small>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="newsAutoRotate" checked>
                                <label class="form-check-label" for="newsAutoRotate">
                                    Otomatik döndür
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5>Aktif Haberler</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover" id="breakingNewsTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Başlık</th>
                                            <th>Sıra</th>
                                            <th>Durum</th>
                                            <th>İşlem</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                // DataTable başlat
                CRUD.initDataTable('breakingNewsTable', 'breaking_news', [
                    { data: 'id' },
                    { data: 'title' },
                    { data: 'order' },
                    { 
                        data: 'is_active',
                        render: function(data) {
                            return data == 1 
                                ? '<span class="badge-status badge-success">Aktif</span>' 
                                : '<span class="badge-status badge-warning">Pasif</span>';
                        }
                    },
                    { 
                        data: null,
                        render: function(data, type, row) {
                            return '<button class="btn btn-sm btn-primary" onclick="editBreakingNews(' + row.id + ')">' +
                                   '<i class="fas fa-edit"></i></button> ' +
                                   '<button class="btn btn-sm btn-danger" onclick="deleteBreakingNews(' + row.id + ')">' +
                                   '<i class="fas fa-trash"></i></button> ' +
                                   '<button class="btn btn-sm btn-warning" onclick="toggleBreakingNews(' + row.id + ')">' +
                                   '<i class="fas fa-toggle-on"></i></button>';
                        }
                    }
                ]);
                
                // Form submit
                $('#breakingNewsForm').on('submit', function(e) {
                    e.preventDefault();
                    
                    const formData = CRUD.serializeForm('breakingNewsForm');
                    const id = $('#breaking_news_id').val();
                    
                    formData.is_active = $('[name="is_active"]').is(':checked') ? 1 : 0;
                    
                    if (id) {
                        CRUD.update('breaking_news', id, formData, function() {
                            CRUD.reloadTable('breakingNewsTable');
                            CRUD.resetForm('breakingNewsForm');
                            $('#breaking_news_id').val('');
                            $('#breakingNewsFormTitle').text('Yeni Haber Ekle');
                            $('#breakingNewsBtnText').text('Kaydet');
                            $('#cancelEditBreakingNews').hide();
                        });
                    } else {
                        CRUD.create('breaking_news', formData, function() {
                            CRUD.reloadTable('breakingNewsTable');
                            CRUD.resetForm('breakingNewsForm');
                        });
                    }
                });
                
                // İptal butonu
                $('#cancelEditBreakingNews').on('click', function() {
                    CRUD.resetForm('breakingNewsForm');
                    $('#breaking_news_id').val('');
                    $('#breakingNewsFormTitle').text('Yeni Haber Ekle');
                    $('#breakingNewsBtnText').text('Kaydet');
                    $(this).hide();
                });
            });
            
            window.editBreakingNews = function(id) {
                CRUD.get('breaking_news', id, function(data) {
                    $('#breaking_news_id').val(data.id);
                    $('[name="title"]').val(data.title);
                    $('[name="url"]').val(data.url);
                    $('[name="order"]').val(data.order);
                    $('[name="is_active"]').prop('checked', data.is_active == 1);
                    
                    $('#breakingNewsFormTitle').text('Haber Düzenle');
                    $('#breakingNewsBtnText').text('Güncelle');
                    $('#cancelEditBreakingNews').show();
                });
            };
            
            window.deleteBreakingNews = function(id) {
                CRUD.delete('breaking_news', id, function() {
                    CRUD.reloadTable('breakingNewsTable');
                });
            };
            
            window.toggleBreakingNews = function(id) {
                CRUD.toggle('breaking_news', id, function() {
                    CRUD.reloadTable('breakingNewsTable');
                });
            };
            </script>
        `;
    }
    
    function getFeaturedPostTemplate() {
        return `
            <h2 class="mb-4">Öne Çıkan Gönderi</h2>
            
            <div class="card">
                <div class="card-header">
                    <h5>Mevcut Öne Çıkan Gönderi</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="https://picsum.photos/800/500" class="img-fluid rounded" alt="Featured">
                        </div>
                        <div class="col-md-6">
                            <h3>Kapadokya'nın En Güzelli Yerlerini Keşfedin</h3>
                            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                            <div class="mb-3">
                                <span class="badge bg-primary">Görüntülenme: 5.2K</span>
                                <span class="badge bg-success">Yorum: 124</span>
                                <span class="badge bg-info">17 Kasım 2025</span>
                            </div>
                            <button class="btn btn-primary" onclick="editFeaturedPost()">
                                <i class="fas fa-edit"></i> Düzenle
                            </button>
                            <button class="btn btn-danger" onclick="removeFeaturedPost()">
                                <i class="fas fa-trash"></i> Kaldır
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card mt-4">
                <div class="card-header">
                    <h5>Gönderi Seç</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Gönderi Ara</label>
                        <input type="text" class="form-control" placeholder="Gönderi başlığına göre ara...">
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Başlık</th>
                                    <th>Kategori</th>
                                    <th>Tarih</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>İstanbul'un Gizli Bahçeleri</td>
                                    <td>Doğa</td>
                                    <td>15.11.2025</td>
                                    <td>
                                        <button class="btn btn-sm btn-success">
                                            <i class="fas fa-star"></i> Öne Çıkar
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Kapadokya'da Bir Gün</td>
                                    <td>Kültür</td>
                                    <td>14.11.2025</td>
                                    <td>
                                        <button class="btn btn-sm btn-success">
                                            <i class="fas fa-star"></i> Öne Çıkar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
    
    function getCategoryBoxesTemplate() {
        return `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Kategori Kutuları (4'lü Kutular)</h2>
                <button class="btn btn-primary" onclick="addCategoryBox()">
                    <i class="fas fa-plus"></i> Yeni Kutu Ekle
                </button>
            </div>
            
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <div class="category-box-preview bg-gradient-blue me-3">
                                    <i class="fa-solid fa-book-open"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h5>Başarıcağız Kutlu</h5>
                                    <p class="mb-0 text-muted">Motivasyon ve başarı hikayeleri</p>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <div class="category-box-preview bg-gradient-pink me-3">
                                    <i class="fa-solid fa-heart"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h5>Günlük Yaşam</h5>
                                    <p class="mb-0 text-muted">Hayatınızı kolaylaştıran ipuçları</p>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card mt-4">
                <div class="card-header">
                    <h5>Yeni Kategori Kutusu Ekle</h5>
                </div>
                <div class="card-body">
                    <form id="categoryBoxForm">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Başlık</label>
                                    <input type="text" class="form-control" placeholder="Örn: Başarıcağız Kutlu" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Icon (FontAwesome)</label>
                                    <input type="text" class="form-control" placeholder="fa-solid fa-book-open" required>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </form>
                </div>
            </div>
        `;
    }
    
    function getInfoCardsTemplate() {
        return `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Bilgi Kartları (5'li Kartlar)</h2>
                <button class="btn btn-primary" onclick="addInfoCard()">
                    <i class="fas fa-plus"></i> Yeni Kart Ekle
                </button>
            </div>
            
            <div class="row g-3 mb-4">
                <div class="col-lg-2 col-md-4">
                    <div class="card border-primary">
                        <div class="card-body text-center">
                            <div class="info-card info-card-blue mb-3">
                                <h5>Eğlence & Kültür</h5>
                                <p>Desteklere ne için, nasıl başvurulur?</p>
                            </div>
                            <button class="btn btn-sm btn-primary me-1"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-2 col-md-4">
                    <div class="card border-danger">
                        <div class="card-body text-center">
                            <div class="info-card info-card-pink mb-3">
                                <h5>Günlük Yaşam</h5>
                                <p>Başarılardan ne öğrenilir?</p>
                            </div>
                            <button class="btn btn-sm btn-primary me-1"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-2 col-md-4">
                    <div class="card border-warning">
                        <div class="card-body text-center">
                            <div class="info-card info-card-orange mb-3">
                                <h5>Kişisel Gelişim</h5>
                                <p>Sivil Düşün nedir, neyi haber verir?</p>
                            </div>
                            <button class="btn btn-sm btn-primary me-1"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-2 col-md-4">
                    <div class="card border-info">
                        <div class="card-body text-center">
                            <div class="info-card info-card-teal mb-3">
                                <h5>Sağlık & Spor</h5>
                                <p>Neyin, nasıl parçası olunur?</p>
                            </div>
                            <button class="btn btn-sm btn-primary me-1"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-2 col-md-4">
                    <div class="card border-secondary">
                        <div class="card-body text-center">
                            <div class="info-card info-card-purple mb-3">
                                <h5>Seyahat & Keşif</h5>
                                <p>Nasıl bir ağ kuruyoruz?</p>
                            </div>
                            <button class="btn btn-sm btn-primary me-1"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Yeni Bilgi Kartı Ekle</h5>
                </div>
                <div class="card-body">
                    <form id="infoCardForm">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Başlık</label>
                                    <input type="text" class="form-control" placeholder="Örn: Eğlence & Kültür" required>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Açıklama</label>
                                    <input type="text" class="form-control" placeholder="Kısa açıklama" required>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Renk</label>
                                    <select class="form-select">
                                        <option value="blue">Mavi</option>
                                        <option value="pink">Pembe</option>
                                        <option value="orange">Turuncu</option>
                                        <option value="teal">Turkuaz</option>
                                        <option value="purple">Mor</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </form>
                </div>
            </div>
        `;
    }
    
    function getHashtagsTemplate() {
        return `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Etiketler (Hashtags)</h2>
                <button class="btn btn-primary" onclick="addHashtag()">
                    <i class="fas fa-plus"></i> Yeni Etiket Ekle
                </button>
            </div>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Aktif Etiketler</h5>
                </div>
                <div class="card-body">
                    <div class="hashtags-wrapper">
                        <span class="hashtag-item-admin">
                            #Softinays
                            <button class="btn btn-sm btn-danger"><i class="fas fa-times"></i></button>
                        </span>
                        <span class="hashtag-item-admin">
                            #Yapay Zeka
                            <button class="btn btn-sm btn-danger"><i class="fas fa-times"></i></button>
                        </span>
                        <span class="hashtag-item-admin">
                            #Pars Blog Teması
                            <button class="btn btn-sm btn-danger"><i class="fas fa-times"></i></button>
                        </span>
                        <span class="hashtag-item-admin">
                            #WordPress
                            <button class="btn btn-sm btn-danger"><i class="fas fa-times"></i></button>
                        </span>
                        <span class="hashtag-item-admin">
                            #Blog Teması
                            <button class="btn btn-sm btn-danger"><i class="fas fa-times"></i></button>
                        </span>
                        <span class="hashtag-item-admin">
                            #Pars
                            <button class="btn btn-sm btn-danger"><i class="fas fa-times"></i></button>
                        </span>
                        <span class="hashtag-item-admin">
                            #Mobil Uygulamalar
                            <button class="btn btn-sm btn-danger"><i class="fas fa-times"></i></button>
                        </span>
                        <span class="hashtag-item-admin">
                            #Minimal
                            <button class="btn btn-sm btn-danger"><i class="fas fa-times"></i></button>
                        </span>
                        <span class="hashtag-item-admin">
                            #Evde Spor
                            <button class="btn btn-sm btn-danger"><i class="fas fa-times"></i></button>
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Yeni Etiket Ekle</h5>
                </div>
                <div class="card-body">
                    <form id="hashtagForm">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="mb-3">
                                    <label class="form-label">Etiket Adı (# olmadan)</label>
                                    <input type="text" class="form-control" placeholder="Örn: WordPress" required>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Bağlantı URL</label>
                                    <input type="url" class="form-control" placeholder="https://...">
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Etiket Ekle
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Ayarlar</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Maksimum Etiket Sayısı</label>
                        <input type="number" class="form-control" value="10" min="5" max="30">
                        <small class="text-muted">Frontend'de gösterilecek maksimum etiket sayısı</small>
                    </div>
                    <div class="mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="hashtagAutoGenerate">
                            <label class="form-check-label" for="hashtagAutoGenerate">
                                Gönderilerden otomatik etiket oluştur
                            </label>
                        </div>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="hashtagShowSection" checked>
                        <label class="form-check-label" for="hashtagShowSection">
                            Frontend'de etiketler bölümünü göster
                        </label>
                    </div>
                </div>
            </div>
        `;
    }
    
    function getWidgetsTemplate() {
        return `
            <h2 class="mb-4">Widgetlar (Sidebar Yönetimi)</h2>
            
            <div class="row">
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>Son Gönderiler Widget</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Başlık</label>
                                <input type="text" class="form-control" value="Son Gönderiler">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Gösterilecek Gönderi Sayısı</label>
                                <input type="number" class="form-control" value="4" min="1" max="10">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Gösterim Türü</label>
                                <select class="form-select">
                                    <option selected>Resim + Başlık</option>
                                    <option>Sadece Başlık</option>
                                    <option>Detaylı (Resim + Başlık + Meta)</option>
                                </select>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="widgetRecentActive" checked>
                                <label class="form-check-label" for="widgetRecentActive">
                                    Aktif
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>En Çok Okunanlar Widget</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Başlık</label>
                                <input type="text" class="form-control" value="En Çok Okunanlar">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Gösterilecek Gönderi Sayısı</label>
                                <input type="number" class="form-control" value="3" min="1" max="10">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Zaman Aralığı</label>
                                <select class="form-select">
                                    <option>Tüm Zamanlar</option>
                                    <option selected>Son 30 Gün</option>
                                    <option>Son 7 Gün</option>
                                    <option>Bugün</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="showViewCount" checked>
                                    <label class="form-check-label" for="showViewCount">
                                        Görüntülenme sayısını göster
                                    </label>
                                </div>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="widgetPopularActive" checked>
                                <label class="form-check-label" for="widgetPopularActive">
                                    Aktif
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>Kategoriler Widget</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Başlık</label>
                                <input type="text" class="form-control" value="Kategoriler">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Gösterim Türü</label>
                                <select class="form-select">
                                    <option selected>Liste</option>
                                    <option>Grid</option>
                                    <option>Dropdown</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="catShowCount" checked>
                                    <label class="form-check-label" for="catShowCount">
                                        Gönderi sayısını göster
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="catShowIcons" checked>
                                    <label class="form-check-label" for="catShowIcons">
                                        İkonları göster
                                    </label>
                                </div>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="widgetCatActive" checked>
                                <label class="form-check-label" for="widgetCatActive">
                                    Aktif
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>Sosyal Medya Widget</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Başlık</label>
                                <input type="text" class="form-control" value="Bizi Takip Edin">
                            </div>
                            <div class="mb-2">
                                <label class="form-label">Facebook URL</label>
                                <input type="url" class="form-control" placeholder="https://facebook.com/...">
                            </div>
                            <div class="mb-2">
                                <label class="form-label">Twitter URL</label>
                                <input type="url" class="form-control" placeholder="https://twitter.com/...">
                            </div>
                            <div class="mb-2">
                                <label class="form-label">Instagram URL</label>
                                <input type="url" class="form-control" placeholder="https://instagram.com/...">
                            </div>
                            <div class="mb-2">
                                <label class="form-label">LinkedIn URL</label>
                                <input type="url" class="form-control" placeholder="https://linkedin.com/...">
                            </div>
                            <div class="mb-2">
                                <label class="form-label">YouTube URL</label>
                                <input type="url" class="form-control" placeholder="https://youtube.com/...">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Pinterest URL</label>
                                <input type="url" class="form-control" placeholder="https://pinterest.com/...">
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="widgetSocialActive" checked>
                                <label class="form-check-label" for="widgetSocialActive">
                                    Aktif
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center">
                <button class="btn btn-primary btn-lg">
                    <i class="fas fa-save"></i> Tüm Widget Ayarlarını Kaydet
                </button>
            </div>
        `;
    }
    
    function getHeaderTemplate() {
        return `
            <h2 class="mb-4">Header & Menü Ayarları</h2>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Logo Ayarları</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Dark Mode Logo</label>
                                <input type="file" class="form-control" accept="image/*">
                                <small class="text-muted">Mevcut: logo-dark.svg</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Light Mode Logo</label>
                                <input type="file" class="form-control" accept="image/*">
                                <small class="text-muted">Mevcut: logo-light.svg</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Sosyal Medya Linkleri (Header)</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Twitter</label>
                            <input type="url" class="form-control" placeholder="https://twitter.com/...">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Facebook</label>
                            <input type="url" class="form-control" placeholder="https://facebook.com/...">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Instagram</label>
                            <input type="url" class="form-control" placeholder="https://instagram.com/...">
                        </div>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="showSocialHeader" checked>
                        <label class="form-check-label" for="showSocialHeader">
                            Header'da sosyal medya ikonlarını göster
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5>Menü Öğeleri</h5>
                    <button class="btn btn-sm btn-primary" onclick="addMenuItem()">
                        <i class="fas fa-plus"></i> Yeni Menü Öğesi
                    </button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th width="50">Sıra</th>
                                    <th>Menü Adı</th>
                                    <th>URL</th>
                                    <th>Alt Menü</th>
                                    <th>Durum</th>
                                    <th width="150">İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Ana Sayfa</td>
                                    <td>index.html</td>
                                    <td>-</td>
                                    <td><span class="badge-status badge-success">Aktif</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Hazır Sayfalar</td>
                                    <td>#</td>
                                    <td><span class="badge bg-info">5 Alt Menü</span></td>
                                    <td><span class="badge-status badge-success">Aktif</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Kategoriler</td>
                                    <td>#</td>
                                    <td>-</td>
                                    <td><span class="badge-status badge-success">Aktif</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Geziler</td>
                                    <td>#</td>
                                    <td>-</td>
                                    <td><span class="badge-status badge-success">Aktif</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Hakkımızda</td>
                                    <td>#</td>
                                    <td>-</td>
                                    <td><span class="badge-status badge-success">Aktif</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>İletişim</td>
                                    <td>#</td>
                                    <td>-</td>
                                    <td><span class="badge-status badge-success">Aktif</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Header Ek Buton</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Buton Metni</label>
                                <input type="text" class="form-control" value="Bize Ulaşın">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Buton URL</label>
                                <input type="url" class="form-control" placeholder="#">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="headerButtonActive" checked>
                                <label class="form-check-label" for="headerButtonActive">
                                    Butonu göster
                                </label>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary mt-3">
                        <i class="fas fa-save"></i> Header Ayarlarını Kaydet
                    </button>
                </div>
            </div>
        `;
    }
    
    function getFooterTemplate() {
        return `
            <h2 class="mb-4">Footer Ayarları</h2>
            
            <div class="row">
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>Hakkımızda Bölümü</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Başlık</label>
                                <input type="text" class="form-control" value="Hakkımızda">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Açıklama</label>
                                <textarea class="form-control" rows="3">Pars Gezi Teması ile dünyayı keşfedin. SEO uyumlu, hızlı ve modern tasarım.</textarea>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="footerAboutActive" checked>
                                <label class="form-check-label" for="footerAboutActive">
                                    Aktif
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>Hızlı Linkler</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Başlık</label>
                                <input type="text" class="form-control" value="Hızlı Linkler">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Linkler (Her satırda bir link)</label>
                                <textarea class="form-control" rows="5" placeholder="Link Adı|URL">Ana Sayfa|index.html
Hakkımızda|hakkimizda.html
İletişim|iletisim.html</textarea>
                                <small class="text-muted">Format: Link Adı|URL</small>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="footerLinksActive" checked>
                                <label class="form-check-label" for="footerLinksActive">
                                    Aktif
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>Sosyal Medya</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Başlık</label>
                                <input type="text" class="form-control" value="Sosyal Medya">
                            </div>
                            <div class="mb-2">
                                <label class="form-label">Facebook</label>
                                <input type="url" class="form-control" placeholder="https://facebook.com/...">
                            </div>
                            <div class="mb-2">
                                <label class="form-label">Twitter</label>
                                <input type="url" class="form-control" placeholder="https://twitter.com/...">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Instagram</label>
                                <input type="url" class="form-control" placeholder="https://instagram.com/...">
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="footerSocialActive" checked>
                                <label class="form-check-label" for="footerSocialActive">
                                    Aktif
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Telif Hakkı Metni</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Telif Metni</label>
                        <input type="text" class="form-control" value="© 2025 Pars Gezi Teması. Tüm hakları saklıdır.">
                    </div>
                    <button class="btn btn-primary">
                        <i class="fas fa-save"></i> Footer Ayarlarını Kaydet
                    </button>
                </div>
            </div>
        `;
    }
    
    function getNotificationsTemplate() {
        return `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Bildirim Yönetimi</h2>
                <button class="btn btn-primary" onclick="addNotification()">
                    <i class="fas fa-plus"></i> Yeni Bildirim Ekle
                </button>
            </div>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Aktif Bildirimler</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Başlık</th>
                                    <th>Mesaj</th>
                                    <th>Zaman</th>
                                    <th>Durum</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Yeni Gezi:</strong></td>
                                    <td>Kapadokya rehberi yayınlandı!</td>
                                    <td>2 saat önce</td>
                                    <td><span class="badge-status badge-success">Aktif</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Güncelleme:</strong></td>
                                    <td>Site performansı artırıldı</td>
                                    <td>1 gün önce</td>
                                    <td><span class="badge-status badge-success">Aktif</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Yeni Bildirim Oluştur</h5>
                </div>
                <div class="card-body">
                    <form id="notificationForm">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Başlık</label>
                                    <input type="text" class="form-control" placeholder="Örn: Yeni Gezi" required>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="mb-3">
                                    <label class="form-label">Mesaj</label>
                                    <input type="text" class="form-control" placeholder="Bildirim mesajı" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Zaman</label>
                                    <input type="text" class="form-control" placeholder="Örn: 2 saat önce" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Bağlantı URL (Opsiyonel)</label>
                                    <input type="url" class="form-control" placeholder="#">
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Bildirim Ekle
                        </button>
                    </form>
                </div>
            </div>
        `;
    }
    
    function getAdsenseTemplate() {
        return `
            <h2 class="mb-4">Reklam Alanları Yönetimi</h2>
            
            <div class="alert alert-info">
                <i class="fas fa-info-circle"></i> Frontend'de 2 adet reklam alanı bulunmaktadır: <strong>Yatay (Top)</strong> ve <strong>Dikey (Bottom)</strong>
            </div>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Yatay Reklam Alanı (Top - Öne Çıkan Gönderiler Öncesi)</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Google AdSense Kodu</label>
                        <textarea class="form-control" rows="5" placeholder="AdSense script kodunu buraya yapıştırın..."></textarea>
                        <small class="text-muted">Google AdSense'den aldığınız reklam kodunu buraya yapıştırın</small>
                    </div>
                    <div class="mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="adsenseTopActive" checked>
                            <label class="form-check-label" for="adsenseTopActive">
                                Yatay reklam alanını göster
                            </label>
                        </div>
                    </div>
                    <div class="alert alert-secondary">
                        <strong>Önizleme:</strong><br>
                        <div class="adsense-box-horizontal" style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border: 1px solid #e5e7eb; border-radius: 10px; padding: 30px 40px; display: flex; align-items: center; gap: 20px; margin-top: 15px;">
                            <i class="fa-brands fa-google" style="font-size: 32px; color: #4285f4;"></i>
                            <span style="font-size: 18px; font-weight: 500; color: #6b7280;">Google AdSense</span>
                            <a href="#" style="margin-left: auto; color: #9ca3af; text-decoration: none; font-size: 14px;">Reklam</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Dikey Reklam Alanı (Bottom - İçerik Sonrası)</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Google AdSense Kodu</label>
                        <textarea class="form-control" rows="5" placeholder="AdSense script kodunu buraya yapıştırın..."></textarea>
                        <small class="text-muted">Google AdSense'den aldığınız reklam kodunu buraya yapıştırın</small>
                    </div>
                    <div class="mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="adsenseBottomActive" checked>
                            <label class="form-check-label" for="adsenseBottomActive">
                                Dikey reklam alanını göster
                            </label>
                        </div>
                    </div>
                    <div class="alert alert-secondary">
                        <strong>Önizleme:</strong><br>
                        <div class="adsense-box" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px dashed #0ea5e9; border-radius: 12px; padding: 40px; text-align: center; margin-top: 15px;">
                            <i class="fa-brands fa-google" style="font-size: 48px; color: #0ea5e9; margin-bottom: 15px; display: block;"></i>
                            <span style="font-size: 16px; font-weight: 500; color: #0369a1; display: block;">Google AdSense</span>
                            <p style="margin-top: 10px; color: #64748b; margin-bottom: 0;">Reklam Alanı</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Genel Ayarlar</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Google AdSense Publisher ID</label>
                        <input type="text" class="form-control" placeholder="ca-pub-xxxxxxxxxxxxxxxx">
                        <small class="text-muted">Google AdSense hesabınızdaki Publisher ID'nizi girin</small>
                    </div>
                    <div class="mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="adsenseAutoAds">
                            <label class="form-check-label" for="adsenseAutoAds">
                                Otomatik reklamları etkinleştir (Auto Ads)
                            </label>
                        </div>
                        <small class="text-muted">Google'un otomatik olarak en iyi reklam yerleştirmesini yapmasını sağlar</small>
                    </div>
                    <button class="btn btn-primary">
                        <i class="fas fa-save"></i> Reklam Ayarlarını Kaydet
                    </button>
                </div>
            </div>
        `;
    }
    
    
    // === FORM HANDLERS ===
    document.addEventListener('submit', function(e) {
        if (e.target.matches('form')) {
            e.preventDefault();
            const formData = new FormData(e.target);
            console.log('Form submitted:', Object.fromEntries(formData));
            showNotification('Değişiklikler kaydedildi!', 'success');
        }
    });
    
    
    // === NOTIFICATION SYSTEM ===
    window.showNotification = function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            ${message}
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };
    
    
    // === GLOBAL FUNCTIONS ===
    window.openPostEditor = function() {
        showNotification('Gönderi editörü açılıyor...', 'info');
    };
    
    window.openStoryEditor = function() {
        showNotification('Hikaye editörü açılıyor...', 'info');
    };
    
    window.openMediaUploader = function() {
        showNotification('Medya yükleyici açılıyor...', 'info');
    };
    
    window.generateSitemap = function() {
        showNotification('Sitemap oluşturuluyor...', 'info');
        setTimeout(() => showNotification('Sitemap başarıyla oluşturuldu!', 'success'), 1500);
    };
    
    window.generateRobotsTxt = function() {
        showNotification('Robot.txt güncelleniyor...', 'info');
        setTimeout(() => showNotification('Robot.txt başarıyla güncellendi!', 'success'), 1500);
    };
    
    window.runPerformanceTest = function() {
        showNotification('Performans testi çalıştırılıyor...', 'info');
        setTimeout(() => showNotification('Performans testi tamamlandı!', 'success'), 2000);
    };
    
    window.createBackup = function() {
        showNotification('Yedek oluşturuluyor...', 'info');
        setTimeout(() => showNotification('Yedek başarıyla oluşturuldu!', 'success'), 2000);
    };
    
    
    console.log('✅ Admin Panel yüklendi!');
});
