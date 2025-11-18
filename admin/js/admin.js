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
            categories: getCategoriesTemplate(),
            media: getMediaTemplate(),
            seo: getSEOTemplate(),
            settings: getSettingsTemplate(),
            performance: getPerformanceTemplate(),
            backup: getBackupTemplate()
        };
        
        newPage.innerHTML = pageTemplates[page] || `<h2>${page}</h2><p>Sayfa içeriği yükleniyor...</p>`;
        
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
                            <h5>Yeni Kategori Ekle</h5>
                        </div>
                        <div class="card-body">
                            <form id="categoryForm">
                                <div class="mb-3">
                                    <label class="form-label">Kategori Adı</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Slug</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Açıklama</label>
                                    <textarea class="form-control" rows="3"></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Ekle</button>
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
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Kategori</th>
                                            <th>Slug</th>
                                            <th>Gönderi Sayısı</th>
                                            <th>İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Doğa</td>
                                            <td>doga</td>
                                            <td>24</td>
                                            <td>
                                                <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                                                <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Kültür</td>
                                            <td>kultur</td>
                                            <td>18</td>
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
                </div>
            </div>
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
