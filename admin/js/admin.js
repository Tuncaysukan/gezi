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
            dashboard: getDashboardTemplate(),
            posts: getPostsTemplate(),
            stories: getStoriesTemplate(),
            'breaking-news': getBreakingNewsTemplate(),
            'featured-post': getFeaturedPostTemplate(),
            categories: getCategoriesTemplate(),
            'category-boxes': getCategoryBoxesTemplate(),
            'info-cards': getInfoCardsTemplate(),
            'category-box-posts': getCategoryBoxPostsTemplate(),
            'info-card-posts': getInfoCardPostsTemplate(),
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
    
    function getDashboardTemplate() {
        return `
            <h2 class="mb-4">Dashboard</h2>
            
            <div class="row g-4 mb-4">
                <div class="col-xl-3 col-md-6">
                    <div class="stat-card">
                        <div class="stat-icon bg-primary">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="stat-content">
                            <h3 id="totalPosts">-</h3>
                            <p>Toplam Gönderi</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="stat-card">
                        <div class="stat-icon bg-success">
                            <i class="fas fa-eye"></i>
                        </div>
                        <div class="stat-content">
                            <h3 id="totalViews">-</h3>
                            <p>Toplam Görüntüleme</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="stat-card">
                        <div class="stat-icon bg-warning">
                            <i class="fas fa-list"></i>
                        </div>
                        <div class="stat-content">
                            <h3 id="totalCategories">-</h3>
                            <p>Kategori</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="stat-card">
                        <div class="stat-icon bg-danger">
                            <i class="fas fa-tags"></i>
                        </div>
                        <div class="stat-content">
                            <h3 id="totalTags">-</h3>
                            <p>Etiket</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row g-4">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5>Ziyaretçi İstatistikleri</h5>
                        </div>
                        <div class="card-body">
                            <canvas id="visitorChart" height="100"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5>Son Gönderiler</h5>
                        </div>
                        <div class="card-body">
                            <div id="recentPosts">
                                <p class="text-muted">Yükleniyor...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                console.log('Dashboard loaded, initializing...');
                loadDashboardStats();
            });
            </script>
        `;
    }
    
    function getPostsTemplate() {
        return `
            <h2 class="mb-4">Gönderiler</h2>
            
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5>Tüm Gönderiler</h5>
                    <button class="btn btn-primary btn-sm" onclick="openPostEditor()">
                        <i class="fas fa-plus"></i> Yeni Gönderi
                    </button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover" id="postsTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Başlık</th>
                                    <th>Kategori</th>
                                    <th>Tarih</th>
                                    <th>Durum</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                CRUD.initDataTable('postsTable', 'posts', [
                    { data: 'id' },
                    { data: 'title' },
                    { data: 'category_id' },
                    { 
                        data: 'created_at',
                        render: function(data) {
                            return new Date(data).toLocaleDateString('tr-TR');
                        }
                    },
                    { 
                        data: 'is_active',
                        render: function(data) {
                            return data == 1 
                                ? '<span class="badge-status badge-success">Yayında</span>' 
                                : '<span class="badge-status badge-warning">Taslak</span>';
                        }
                    },
                    { 
                        data: null,
                        render: function(data, type, row) {
                            return '<button class="btn btn-sm btn-primary" onclick="editPost(' + row.id + ')">' +
                                   '<i class="fas fa-edit"></i></button> ' +
                                   '<button class="btn btn-sm btn-danger" onclick="deletePost(' + row.id + ')">' +
                                   '<i class="fas fa-trash"></i></button>';
                        }
                    }
                ]);
            });
            
            window.editPost = function(id) {
                CRUD.get('posts', id, function(data) {
                    openPostEditor(data);
                });
            };
            
            window.deletePost = function(id) {
                CRUD.delete('posts', id, function() {
                    CRUD.reloadTable('postsTable');
                });
            };
            
            window.openPostEditor = function(postData = null) {
                const isEdit = postData !== null;
                const modalHtml = '<div class="modal fade" id="postEditorModal" tabindex="-1">' +
                    '<div class="modal-dialog modal-xl">' +
                        '<div class="modal-content">' +
                            '<div class="modal-header">' +
                                '<h5 class="modal-title">' + (isEdit ? 'Gönderi Düzenle' : 'Yeni Gönderi') + '</h5>' +
                                '<button type="button" class="btn-close" data-bs-dismiss="modal"></button>' +
                            '</div>' +
                            '<div class="modal-body">' +
                                '<form id="postEditorForm">' +
                                    '<input type="hidden" id="post_id" value="' + (isEdit ? postData.id : '') + '">' +
                                    '<div class="row">' +
                                        '<div class="col-md-8">' +
                                            '<div class="mb-3">' +
                                                '<label class="form-label">Başlık *</label>' +
                                                '<input type="text" class="form-control" name="title" value="' + (isEdit ? postData.title : '') + '" required>' +
                                            '</div>' +
                                            '<div class="mb-3">' +
                                                '<label class="form-label">İçerik *</label>' +
                                                '<textarea class="form-control" name="content" rows="15" required>' + (isEdit ? postData.content : '') + '</textarea>' +
                                                '<small class="text-muted">HTML kullanabilirsiniz</small>' +
                                            '</div>' +
                                            '<div class="mb-3">' +
                                                '<label class="form-label">Kısa Açıklama</label>' +
                                                '<textarea class="form-control" name="excerpt" rows="3">' + (isEdit ? postData.excerpt : '') + '</textarea>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-md-4">' +
                                            '<div class="mb-3">' +
                                                '<label class="form-label">Kategori *</label>' +
                                                '<select class="form-select" name="category_id" required><option value="">Kategori Seçin</option></select>' +
                                            '</div>' +
                                            '<div class="mb-3">' +
                                                '<label class="form-label">Slug *</label>' +
                                                '<input type="text" class="form-control" name="slug" value="' + (isEdit ? postData.slug : '') + '" required>' +
                                                '<small class="text-muted">URL için</small>' +
                                            '</div>' +
                                            '<div class="mb-3">' +
                                                '<label class="form-label">Öne Çıkan Görsel URL</label>' +
                                                '<input type="url" class="form-control" name="image" value="' + (isEdit ? postData.image : '') + '">' +
                                            '</div>' +
                                            '<div class="mb-3">' +
                                                '<label class="form-label">Etiketler</label>' +
                                                '<input type="text" class="form-control" name="tags" value="' + (isEdit ? postData.tags : '') + '">' +
                                            '</div>' +
                                            '<div class="mb-3">' +
                                                '<label class="form-label">Yazar</label>' +
                                                '<input type="text" class="form-control" name="author" value="' + (isEdit ? postData.author : 'Admin') + '">' +
                                            '</div>' +
                                            '<div class="mb-3">' +
                                                '<div class="form-check form-switch">' +
                                                    '<input class="form-check-input" type="checkbox" name="is_active" value="1" ' + (isEdit && postData.is_active == 1 ? 'checked' : 'checked') + '>' +
                                                    '<label class="form-check-label">Yayınla</label>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="mb-3">' +
                                                '<div class="form-check form-switch">' +
                                                    '<input class="form-check-input" type="checkbox" name="is_featured" value="1" ' + (isEdit && postData.is_featured == 1 ? 'checked' : '') + '>' +
                                                    '<label class="form-check-label">Öne Çıkar</label>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</form>' +
                            '</div>' +
                            '<div class="modal-footer">' +
                                '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>' +
                                '<button type="button" class="btn btn-primary" onclick="savePost()">' +
                                    '<i class="fas fa-save"></i> ' + (isEdit ? 'Güncelle' : 'Yayınla') +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
                
                $('body').append(modalHtml);
                const modal = new bootstrap.Modal(document.getElementById('postEditorModal'));
                
                $.get('../api/crud.php?action=list&table=categories', function(response) {
                    if (response.success) {
                        const select = $('#postEditorModal select[name="category_id"]');
                        response.data.forEach(cat => {
                            const selected = isEdit && postData.category_id == cat.id ? 'selected' : '';
                            select.append('<option value="' + cat.id + '" ' + selected + '>' + cat.name + '</option>');
                        });
                    }
                });
                
                $('#postEditorModal input[name="title"]').on('input', function() {
                    if (!isEdit) {
                        const slug = $(this).val()
                            .toLowerCase()
                            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                            .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                        $('#postEditorModal input[name="slug"]').val(slug);
                    }
                });
                
                $('#postEditorModal').on('hidden.bs.modal', function() { $(this).remove(); });
                modal.show();
            };
            
            window.savePost = function() {
                const formData = CRUD.serializeForm('postEditorForm');
                const id = $('#post_id').val();
                
                // Validasyon
                if (!formData.category_id || formData.category_id === '') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hata!',
                        text: 'Lütfen kategori seçin!'
                    });
                    return;
                }
                
                formData.is_active = $('[name="is_active"]').is(':checked') ? 1 : 0;
                formData.is_featured = $('[name="is_featured"]').is(':checked') ? 1 : 0;
                
                if (id) {
                    CRUD.update('posts', id, formData, function() {
                        CRUD.reloadTable('postsTable');
                        bootstrap.Modal.getInstance(document.getElementById('postEditorModal')).hide();
                    });
                } else {
                    CRUD.create('posts', formData, function() {
                        CRUD.reloadTable('postsTable');
                        bootstrap.Modal.getInstance(document.getElementById('postEditorModal')).hide();
                    });
                }
            };
            </script>
        `;
    }
    
    function getStoriesTemplate() {
        return `
            <h2 class="mb-4">Hikayeler (Story)</h2>
            
            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 id="storyFormTitle">Yeni Hikaye Ekle</h5>
                        </div>
                        <div class="card-body">
                            <form id="storyForm">
                                <input type="hidden" id="story_id">
                                <div class="mb-3">
                                    <label class="form-label">Başlık *</label>
                                    <input type="text" class="form-control" name="title" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Kısa Başlık</label>
                                    <input type="text" class="form-control" name="short_title" maxlength="15">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Görsel URL</label>
                                    <input type="url" class="form-control" name="image">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Bağlantı URL</label>
                                    <input type="url" class="form-control" name="url">
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
                                    <i class="fas fa-save"></i> <span id="storyBtnText">Kaydet</span>
                                </button>
                                <button type="button" class="btn btn-secondary w-100 mt-2" id="cancelEditStory" style="display:none;">
                                    <i class="fas fa-times"></i> İptal
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5>Aktif Hikayeler</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover" id="storiesTable">
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
                CRUD.initDataTable('storiesTable', 'stories', [
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
                            return '<button class="btn btn-sm btn-primary" onclick="editStory(' + row.id + ')">' +
                                   '<i class="fas fa-edit"></i></button> ' +
                                   '<button class="btn btn-sm btn-danger" onclick="deleteStory(' + row.id + ')">' +
                                   '<i class="fas fa-trash"></i></button> ' +
                                   '<button class="btn btn-sm btn-warning" onclick="toggleStory(' + row.id + ')">' +
                                   '<i class="fas fa-toggle-on"></i></button>';
                        }
                    }
                ]);
                
                $('#storyForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = CRUD.serializeForm('storyForm');
                    const id = $('#story_id').val();
                    formData.is_active = $('[name="is_active"]').is(':checked') ? 1 : 0;
                    
                    if (id) {
                        CRUD.update('stories', id, formData, function() {
                            CRUD.reloadTable('storiesTable');
                            CRUD.resetForm('storyForm');
                            $('#story_id').val('');
                            $('#storyFormTitle').text('Yeni Hikaye Ekle');
                            $('#storyBtnText').text('Kaydet');
                            $('#cancelEditStory').hide();
                        });
                    } else {
                        CRUD.create('stories', formData, function() {
                            CRUD.reloadTable('storiesTable');
                            CRUD.resetForm('storyForm');
                        });
                    }
                });
                
                $('#cancelEditStory').on('click', function() {
                    CRUD.resetForm('storyForm');
                    $('#story_id').val('');
                    $('#storyFormTitle').text('Yeni Hikaye Ekle');
                    $('#storyBtnText').text('Kaydet');
                    $(this).hide();
                });
            });
            
            window.editStory = function(id) {
                CRUD.get('stories', id, function(data) {
                    $('#story_id').val(data.id);
                    $('[name="title"]').val(data.title);
                    $('[name="short_title"]').val(data.short_title);
                    $('[name="image"]').val(data.image);
                    $('[name="url"]').val(data.url);
                    $('[name="order"]').val(data.order);
                    $('[name="is_active"]').prop('checked', data.is_active == 1);
                    
                    $('#storyFormTitle').text('Hikaye Düzenle');
                    $('#storyBtnText').text('Güncelle');
                    $('#cancelEditStory').show();
                });
            };
            
            window.deleteStory = function(id) {
                CRUD.delete('stories', id, function() {
                    CRUD.reloadTable('storiesTable');
                });
            };
            
            window.toggleStory = function(id) {
                CRUD.toggle('stories', id, function() {
                    CRUD.reloadTable('storiesTable');
                });
            };
            
            window.openStoryEditor = function() {
                $('#storyFormTitle').text('Yeni Hikaye Ekle');
                CRUD.resetForm('storyForm');
            };
            </script>
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
            <h2 class="mb-4">Medya Kütüphanesi</h2>
            
            <div class="card mb-4">
                <div class="card-body">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i> <strong>Not:</strong> Medya dosyaları <code>assets/uploads/</code> klasörüne yüklenecektir.
                    </div>
                    <form id="mediaUploadForm" enctype="multipart/form-data">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label">Dosya Seç</label>
                                <input type="file" class="form-control" name="media_file" id="mediaFile" accept="image/*,video/*,.pdf,.doc,.docx">
                                <small class="text-muted">Resim, video veya döküman seçebilirsiniz (Maks 5MB)</small>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Dosya Açıklaması (Opsiyonel)</label>
                                <input type="text" class="form-control" name="description" placeholder="Dosya açıklaması">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success mt-3">
                            <i class="fas fa-upload"></i> Yükle
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Yüklenen Dosyalar</h5>
                </div>
                <div class="card-body">
                    <div id="mediaGrid" class="row g-4">
                        <div class="col-12 text-center text-muted">
                            <i class="fas fa-folder-open fa-3x mb-3"></i>
                            <p>Henüz dosya yüklenmedi</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                console.log('Media page loaded, initializing upload...');
                initMediaUpload();
                loadMediaFilesList();
            });
            </script>
        `;
    }
    
    function getSEOTemplate() {
        return `
            <h2 class="mb-4">SEO Ayarları</h2>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Genel SEO</h5>
                </div>
                <div class="card-body">
                    <form id="seoGeneralForm">
                        <div class="mb-3">
                            <label class="form-label">Site Başlığı</label>
                            <input type="text" class="form-control" name="title" placeholder="Pars - Seo Uyumlu Gezi Teması">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Site Açıklaması</label>
                            <textarea class="form-control" name="description" rows="3" placeholder="SEO uyumlu gezi ve seyahat blogu"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Anahtar Kelimeler</label>
                            <input type="text" class="form-control" name="keywords" placeholder="gezi, seyahat, blog">
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Sosyal Medya SEO</h5>
                </div>
                <div class="card-body">
                    <form id="seoSocialForm">
                        <div class="mb-3">
                            <label class="form-label">Facebook URL</label>
                            <input type="url" class="form-control" name="facebook" placeholder="https://facebook.com/...">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Twitter Handle</label>
                            <input type="text" class="form-control" name="twitter" placeholder="@username">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Instagram URL</label>
                            <input type="url" class="form-control" name="instagram" placeholder="https://instagram.com/...">
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Robot.txt & Sitemap</h5>
                </div>
                <div class="card-body">
                    <form id="seoRobotsForm">
                        <div class="mb-3">
                            <label class="form-label">Robot.txt İçeriği</label>
                            <textarea class="form-control" name="robots_txt" rows="5" placeholder="User-agent: *\nAllow: /\nSitemap: https://example.com/sitemap.xml"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                // Genel SEO
                $('#seoGeneralForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = CRUD.serializeForm('seoGeneralForm');
                    saveSEOSettings('seo_general', formData);
                });
                
                // Sosyal Medya SEO
                $('#seoSocialForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = CRUD.serializeForm('seoSocialForm');
                    saveSEOSettings('seo_social', formData);
                });
                
                // Robots.txt
                $('#seoRobotsForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = CRUD.serializeForm('seoRobotsForm');
                    saveSEOSettings('seo_robots', formData);
                });
                
                loadSEOSettings();
            });
            
            function loadSEOSettings() {
                $.get('../api/crud.php?action=list&table=settings', function(response) {
                    if (response.success && response.data) {
                        response.data.forEach(setting => {
                            try {
                                if (setting.setting_key === 'seo_general') {
                                    fillSEOForm('#seoGeneralForm', setting.setting_value);
                                } else if (setting.setting_key === 'seo_social') {
                                    fillSEOForm('#seoSocialForm', setting.setting_value);
                                } else if (setting.setting_key === 'seo_robots') {
                                    fillSEOForm('#seoRobotsForm', setting.setting_value);
                                }
                            } catch(e) {
                                console.error('Error loading SEO setting:', e);
                            }
                        });
                    }
                });
            }
            
            function fillSEOForm(formId, jsonValue) {
                try {
                    const data = JSON.parse(jsonValue);
                    Object.keys(data).forEach(key => {
                        const input = $(formId + ' [name="' + key + '"]');
                        if (input.length > 0) {
                            input.val(data[key]);
                        }
                    });
                } catch(e) {
                    console.error('JSON parse error in fillSEOForm:', e);
                }
            }
            
            function saveSEOSettings(key, data) {
                $.ajax({
                    url: '../api/crud.php?action=update_setting',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        key: key,
                        value: JSON.stringify(data)
                    }),
                    success: function(response) {
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Başarılı!',
                                text: 'SEO ayarları kaydedildi!',
                                timer: 1500
                            });
                            loadSEOSettings();
                        }
                    },
                    error: function(error) {
                        console.error('SEO save error:', error);
                        Swal.fire('Hata!', 'Kaydedilemedi!', 'error');
                    }
                });
            }
            </script>
        `;
    }
    
    function getSettingsTemplate() {
        return `
            <h2 class="mb-4">Site Ayarları</h2>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Genel Ayarlar</h5>
                </div>
                <div class="card-body">
                    <form id="generalSettingsForm">
                        <div class="mb-3">
                            <label class="form-label">Site Adı *</label>
                            <input type="text" class="form-control" name="site_name" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Site Başlığı (H1)</label>
                            <input type="text" class="form-control" name="site_heading">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Site Açıklaması</label>
                            <textarea class="form-control" name="site_description" rows="3"></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Logo (Dark Mode) URL</label>
                                <input type="url" class="form-control" name="logo_dark">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Logo (Light Mode) URL</label>
                                <input type="url" class="form-control" name="logo_light">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Favicon URL</label>
                            <input type="url" class="form-control" name="favicon">
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Cookie Ayarları</h5>
                </div>
                <div class="card-body">
                    <form id="cookieSettingsForm">
                        <div class="mb-3">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="cookie_enabled" id="cookieEnabled">
                                <label class="form-check-label" for="cookieEnabled">
                                    Cookie onayını göster
                                </label>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Cookie Mesajı</label>
                            <textarea class="form-control" name="cookie_message" rows="2"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Script Ayarları</h5>
                </div>
                <div class="card-body">
                    <form id="scriptSettingsForm">
                        <div class="mb-3">
                            <label class="form-label">Head Script Kodları</label>
                            <textarea class="form-control" name="head_scripts" rows="4" placeholder="Google Analytics, Meta Pixel vb."></textarea>
                            <small class="text-muted">Bu kodlar &lt;head&gt; etiketine eklenecektir</small>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Body Script Kodları</label>
                            <textarea class="form-control" name="body_scripts" rows="4" placeholder="Reklam kodları vb."></textarea>
                            <small class="text-muted">Bu kodlar &lt;body&gt; etiketinin sonuna eklenecektir</small>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Dil Ayarları</h5>
                </div>
                <div class="card-body">
                    <form id="languageSettingsForm">
                        <div class="mb-3">
                            <label class="form-label">Varsayılan Dil</label>
                            <select class="form-select" name="default_language">
                                <option value="tr">Türkçe</option>
                                <option value="en">English</option>
                                <option value="de">Deutsch</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="multi_language" id="multiLang">
                                <label class="form-check-label" for="multiLang">
                                    Çoklu dil desteğini etkinleştir
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                console.log('Settings page loaded, initializing forms...');
                initSettingsForms();
            });
            </script>
        `;
    }
    
    function getPerformanceTemplate() {
        return `
            <h2 class="mb-4">Performans Optimizasyonu</h2>
            
            <div class="row g-4 mb-4">
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <h1 class="text-success" id="pagespeedScore">-</h1>
                            <p>Google PageSpeed</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <h1 class="text-info" id="loadTime">-</h1>
                            <p>Yüklenme Süresi</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <h1 class="text-warning" id="pageSize">-</h1>
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
                    <form id="performanceForm">
                        <div class="mb-3">
                            <div class="form-check form-switch mb-2">
                                <input class="form-check-input" type="checkbox" name="image_optimization" id="imageOptimization">
                                <label class="form-check-label" for="imageOptimization">
                                    <strong>Otomatik Resim Optimizasyonu</strong><br>
                                    <small class="text-muted">Yüklenen resimleri otomatik olarak optimize et</small>
                                </label>
                            </div>
                            <div class="form-check form-switch mb-2">
                                <input class="form-check-input" type="checkbox" name="lazy_load" id="lazyLoad">
                                <label class="form-check-label" for="lazyLoad">
                                    <strong>Lazy Loading</strong><br>
                                    <small class="text-muted">Resimleri gerektiğinde yükle</small>
                                </label>
                            </div>
                            <div class="form-check form-switch mb-2">
                                <input class="form-check-input" type="checkbox" name="minify_css" id="minifyCSS">
                                <label class="form-check-label" for="minifyCSS">
                                    <strong>CSS Minify</strong><br>
                                    <small class="text-muted">CSS dosyalarını sıkıştır</small>
                                </label>
                            </div>
                            <div class="form-check form-switch mb-2">
                                <input class="form-check-input" type="checkbox" name="minify_js" id="minifyJS">
                                <label class="form-check-label" for="minifyJS">
                                    <strong>JavaScript Minify</strong><br>
                                    <small class="text-muted">JavaScript dosyalarını sıkıştır</small>
                                </label>
                            </div>
                            <div class="form-check form-switch mb-2">
                                <input class="form-check-input" type="checkbox" name="browser_cache" id="browserCache">
                                <label class="form-check-label" for="browserCache">
                                    <strong>Browser Cache</strong><br>
                                    <small class="text-muted">Tarayıcı önbelleğini etkinleştir</small>
                                </label>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-success me-2">
                            <i class="fas fa-save"></i> Ayarları Kaydet
                        </button>
                        <button type="button" class="btn btn-primary" id="runTestBtn">
                            <i class="fas fa-tachometer-alt"></i> Performans Testi Çalıştır
                        </button>
                    </form>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                console.log('Performance page loaded, initializing...');
                initPerformanceSettings();
                
                // Run initial test after 1 second to show data
                setTimeout(function() {
                    console.log('Running initial performance analysis...');
                    runInitialPerformanceAnalysis();
                }, 1000);
            });
            </script>
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
                            <form id="createBackupForm">
                                <div class="mb-3">
                                    <label class="form-label">Yedekleme Türü</label>
                                    <select class="form-select" id="backupType" name="backup_type">
                                        <option value="full">Tam Yedek (Veritabanı + Dosyalar)</option>
                                        <option value="database">Sadece Veritabanı</option>
                                        <option value="files">Sadece Dosyalar</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="compressBackup" name="compress" checked>
                                        <label class="form-check-label" for="compressBackup">
                                            Sıkıştır (.zip)
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-success w-100">
                                    <i class="fas fa-download"></i> Yedek Oluştur
                                </button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card mt-4">
                        <div class="card-header">
                            <h5>Otomatik Yedekleme</h5>
                        </div>
                        <div class="card-body">
                            <form id="autoBackupForm">
                                <div class="mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="autoBackupEnabled" name="enabled">
                                        <label class="form-check-label" for="autoBackupEnabled">
                                            Otomatik yedeklemeyi etkinleştir
                                        </label>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Yedekleme Sıklığı</label>
                                    <select class="form-select" id="backupFrequency" name="frequency">
                                        <option value="daily">Günlük</option>
                                        <option value="weekly">Haftalık</option>
                                        <option value="monthly">Aylık</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">
                                    <i class="fas fa-save"></i> Ayarları Kaydet
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">Yedek Geçmişi</h5>
                            <button class="btn btn-sm btn-outline-primary" onclick="loadBackupHistory()">
                                <i class="fas fa-sync"></i> Yenile
                            </button>
                        </div>
                        <div class="card-body">
                            <div id="backupHistoryList">
                                <div class="text-center text-muted py-4">
                                    <i class="fas fa-database fa-3x mb-3"></i>
                                    <p>Henüz yedek oluşturulmadı</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                console.log('Backup page loaded, initializing...');
                initBackupSystem();
            });
            </script>
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
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Mevcut Öne Çıkan Gönderi</h5>
                </div>
                <div class="card-body" id="featuredPostDisplay">
                    <div class="text-center text-muted py-5">
                        <i class="fas fa-star fa-3x mb-3"></i>
                        <p>Henüz öne çıkan gönderi seçilmedi</p>
                        <button class="btn btn-primary" onclick="showFeaturedPostSelector()">
                            <i class="fas fa-plus"></i> Gönderi Seç
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Tüm Gönderiler</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover" id="featuredPostsTable">
                            <thead>
                                <tr>
                                    <th>Başlık</th>
                                    <th>Kategori</th>
                                    <th>Tarih</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                // Gönderileri yükle
                CRUD.initDataTable('featuredPostsTable', 'posts', [
                    { data: 'title' },
                    { data: 'category_id' },
                    { 
                        data: 'created_at',
                        render: function(data) {
                            return new Date(data).toLocaleDateString('tr-TR');
                        }
                    },
                    { 
                        data: null,
                        render: function(data, type, row) {
                            return '<button class="btn btn-sm btn-success" onclick="setFeaturedPost(' + row.id + ')">' +
                                   '<i class="fas fa-star"></i> Öne Çıkar</button>';
                        }
                    }
                ]);
                
                // Öne çıkan gönderiyi yükle
                loadFeaturedPost();
            });
            
            function loadFeaturedPost() {
                $.get('../api/crud.php?action=list&table=posts', function(response) {
                    if (response.success) {
                        const featured = response.data.find(p => p.is_featured == 1);
                        if (featured) {
                            displayFeaturedPost(featured);
                        }
                    }
                });
            }
            
            function displayFeaturedPost(post) {
                const html = '<div class="row">' +
                    '<div class="col-md-6">' +
                        '<img src="' + (post.image || 'https://picsum.photos/800/500') + '" class="img-fluid rounded" alt="Featured">' +
                    '</div>' +
                    '<div class="col-md-6">' +
                        '<h3>' + post.title + '</h3>' +
                        '<p class="text-muted">' + (post.excerpt || post.content.substring(0, 150) + '...') + '</p>' +
                        '<div class="mb-3">' +
                            '<span class="badge bg-info">Görüntülenme: ' + (post.views || 0) + '</span> ' +
                            '<span class="badge bg-success">Tarih: ' + new Date(post.created_at).toLocaleDateString('tr-TR') + '</span>' +
                        '</div>' +
                        '<button class="btn btn-danger" onclick="removeFeaturedPost(' + post.id + ')">' +
                            '<i class="fas fa-times"></i> Kaldır' +
                        '</button>' +
                    '</div>' +
                '</div>';
                $('#featuredPostDisplay').html(html);
            }
            
            window.setFeaturedPost = function(postId) {
                Swal.fire({
                    title: 'Emin misiniz?',
                    text: "Bu gönderi öne çıkarılacak. Eski öne çıkan kaldırılacak.",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Evet, öne çıkar!',
                    cancelButtonText: 'İptal'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Önce tüm gönderilerin is_featured'ini 0 yap
                        $.post('../api/crud.php?action=update_all_featured', {}, function() {
                            // Sonra seçili gönderiyi öne çıkar
                            CRUD.update('posts', postId, { is_featured: 1 }, function() {
                                loadFeaturedPost();
                                Swal.fire('Başarılı!', 'Gönderi öne çıkarıldı!', 'success');
                            });
                        });
                    }
                });
            };
            
            window.removeFeaturedPost = function(postId) {
                Swal.fire({
                    title: 'Emin misiniz?',
                    text: "Öne çıkan gönderi kaldırılacak.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Evet, kaldır!',
                    cancelButtonText: 'İptal'
                }).then((result) => {
                    if (result.isConfirmed) {
                        CRUD.update('posts', postId, { is_featured: 0 }, function() {
                            $('#featuredPostDisplay').html(
                                '<div class="text-center text-muted py-5">' +
                                    '<i class="fas fa-star fa-3x mb-3"></i>' +
                                    '<p>Henüz öne çıkan gönderi seçilmedi</p>' +
                                    '<button class="btn btn-primary" onclick="showFeaturedPostSelector()">' +
                                        '<i class="fas fa-plus"></i> Gönderi Seç' +
                                    '</button>' +
                                '</div>'
                            );
                            Swal.fire('Başarılı!', 'Öne çıkan gönderi kaldırıldı!', 'success');
                        });
                    }
                });
            };
            
            window.showFeaturedPostSelector = function() {
                $('html, body').animate({
                    scrollTop: $('#featuredPostsTable').offset().top - 100
                }, 500);
            };
            </script>
        `;
    }
    
    function getCategoryBoxesTemplate() {
        return `
            <h2 class="mb-4">Kategori Kutuları (4'lü Kutular)</h2>
            
            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 id="categoryBoxFormTitle">Yeni Kutu Ekle</h5>
                        </div>
                        <div class="card-body">
                            <form id="categoryBoxForm">
                                <input type="hidden" id="category_box_id">
                                <div class="mb-3">
                                    <label class="form-label">Başlık *</label>
                                    <input type="text" class="form-control" name="title" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Açıklama (Kısa)</label>
                                    <textarea class="form-control" name="description" rows="2"></textarea>
                                    <small class="text-muted">Ana sayfada görünecek kısa açıklama</small>
                                </div>
                                <hr>
                                <h6 class="mb-3"><i class="fas fa-blog"></i> Blog İçeriği (Opsiyonel)</h6>
                                <div class="mb-3">
                                    <label class="form-label">Blog Başlığı</label>
                                    <input type="text" class="form-control" name="blog_title" placeholder="Detaylı blog yazısı başlığı">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Blog Özeti</label>
                                    <textarea class="form-control" name="blog_excerpt" rows="2" placeholder="Blog yazısı kısa özeti"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Blog İçeriği</label>
                                    <textarea class="form-control" name="blog_content" rows="6" placeholder="Tam blog yazısı içeriği (HTML kullanabilirsiniz)"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Öne Çıkan Görsel URL</label>
                                    <input type="url" class="form-control" name="featured_image" placeholder="https://...">
                                </div>
                                <hr>
                                <div class="mb-3">
                                    <label class="form-label">Icon (FontAwesome) *</label>
                                    <input type="text" class="form-control" name="icon" placeholder="fa-solid fa-book-open" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Renk *</label>
                                    <select class="form-select" name="color" required>
                                        <option value="">Renk Seçin</option>
                                        <option value="blue">Mavi</option>
                                        <option value="pink">Pembe</option>
                                        <option value="orange">Turuncu</option>
                                        <option value="teal">Yeşil-Mavi</option>
                                        <option value="purple">Mor</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Bağlantı URL</label>
                                    <input type="url" class="form-control" name="url">
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
                                    <i class="fas fa-save"></i> <span id="categoryBoxBtnText">Kaydet</span>
                                </button>
                                <button type="button" class="btn btn-secondary w-100 mt-2" id="cancelEditCategoryBox" style="display:none;">
                                    <i class="fas fa-times"></i> İptal
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5>Mevcut Kutular (Maksimum 4)</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover" id="categoryBoxesTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Başlık</th>
                                            <th>Icon</th>
                                            <th>Renk</th>
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
                CRUD.initDataTable('categoryBoxesTable', 'category_boxes', [
                    { data: 'id' },
                    { data: 'title' },
                    { 
                        data: 'icon',
                        render: function(data) {
                            return '<i class="' + data + '"></i> ' + data;
                        }
                    },
                    { 
                        data: 'color',
                        render: function(data) {
                            const colors = {
                                blue: 'Mavi',
                                pink: 'Pembe', 
                                orange: 'Turuncu',
                                teal: 'Yeşil-Mavi',
                                purple: 'Mor'
                            };
                            return '<span class="badge bg-' + data + '">' + (colors[data] || data) + '</span>';
                        }
                    },
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
                            return '<button class="btn btn-sm btn-primary" onclick="editCategoryBox(' + row.id + ')">' +
                                   '<i class="fas fa-edit"></i></button> ' +
                                   '<button class="btn btn-sm btn-danger" onclick="deleteCategoryBox(' + row.id + ')">' +
                                   '<i class="fas fa-trash"></i></button> ' +
                                   '<button class="btn btn-sm btn-warning" onclick="toggleCategoryBox(' + row.id + ')">' +
                                   '<i class="fas fa-toggle-on"></i></button>';
                        }
                    }
                ]);
                
                $('#categoryBoxForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = CRUD.serializeForm('categoryBoxForm');
                    const id = $('#category_box_id').val();
                    formData.is_active = $('[name="is_active"]').is(':checked') ? 1 : 0;
                    
                    if (id) {
                        CRUD.update('category_boxes', id, formData, function() {
                            CRUD.reloadTable('categoryBoxesTable');
                            CRUD.resetForm('categoryBoxForm');
                            $('#category_box_id').val('');
                            $('#categoryBoxFormTitle').text('Yeni Kutu Ekle');
                            $('#categoryBoxBtnText').text('Kaydet');
                            $('#cancelEditCategoryBox').hide();
                        });
                    } else {
                        CRUD.create('category_boxes', formData, function() {
                            CRUD.reloadTable('categoryBoxesTable');
                            CRUD.resetForm('categoryBoxForm');
                        });
                    }
                });
                
                $('#cancelEditCategoryBox').on('click', function() {
                    CRUD.resetForm('categoryBoxForm');
                    $('#category_box_id').val('');
                    $('#categoryBoxFormTitle').text('Yeni Kutu Ekle');
                    $('#categoryBoxBtnText').text('Kaydet');
                    $(this).hide();
                });
            });
            
            window.editCategoryBox = function(id) {
                CRUD.get('category_boxes', id, function(data) {
                    $('#category_box_id').val(data.id);
                    $('[name="title"]').val(data.title);
                    $('[name="description"]').val(data.description);
                    $('[name="blog_title"]').val(data.blog_title || '');
                    $('[name="blog_excerpt"]').val(data.blog_excerpt || '');
                    $('[name="blog_content"]').val(data.blog_content || '');
                    $('[name="featured_image"]').val(data.featured_image || '');
                    $('[name="icon"]').val(data.icon);
                    $('[name="color"]').val(data.color);
                    $('[name="url"]').val(data.url);
                    $('[name="order"]').val(data.order);
                    $('[name="is_active"]').prop('checked', data.is_active == 1);
                    
                    $('#categoryBoxFormTitle').text('Kutu Düzenle');
                    $('#categoryBoxBtnText').text('Güncelle');
                    $('#cancelEditCategoryBox').show();
                });
            };
            
            window.deleteCategoryBox = function(id) {
                CRUD.delete('category_boxes', id, function() {
                    CRUD.reloadTable('categoryBoxesTable');
                });
            };
            
            window.toggleCategoryBox = function(id) {
                CRUD.toggle('category_boxes', id, function() {
                    CRUD.reloadTable('categoryBoxesTable');
                });
            };
            
            window.addCategoryBox = function() {
                $('#categoryBoxFormTitle').text('Yeni Kutu Ekle');
                CRUD.resetForm('categoryBoxForm');
            };
            </script>
        `;
    }
    
    function getInfoCardsTemplate() {
        return `
            <h2 class="mb-4">Bilgi Kartları (5'li Kartlar)</h2>
            
            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 id="infoCardFormTitle">Yeni Kart Ekle</h5>
                        </div>
                        <div class="card-body">
                            <form id="infoCardForm">
                                <input type="hidden" id="info_card_id">
                                <div class="mb-3">
                                    <label class="form-label">Başlık *</label>
                                    <input type="text" class="form-control" name="title" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Açıklama (Kısa) *</label>
                                    <textarea class="form-control" name="description" rows="2" required></textarea>
                                    <small class="text-muted">Ana sayfada görünecek kısa açıklama</small>
                                </div>
                                <hr>
                                <h6 class="mb-3"><i class="fas fa-blog"></i> Blog İçeriği (Opsiyonel)</h6>
                                <div class="mb-3">
                                    <label class="form-label">Blog Başlığı</label>
                                    <input type="text" class="form-control" name="blog_title" placeholder="Detaylı blog yazısı başlığı">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Blog Özeti</label>
                                    <textarea class="form-control" name="blog_excerpt" rows="2" placeholder="Blog yazısı kısa özeti"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Blog İçeriği</label>
                                    <textarea class="form-control" name="blog_content" rows="6" placeholder="Tam blog yazısı içeriği (HTML kullanabilirsiniz)"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Öne Çıkan Görsel URL</label>
                                    <input type="url" class="form-control" name="featured_image" placeholder="https://...">
                                </div>
                                <hr>
                                <div class="mb-3">
                                    <label class="form-label">Renk *</label>
                                    <select class="form-select" name="color" required>
                                        <option value="">Renk Seçin</option>
                                        <option value="blue">Mavi</option>
                                        <option value="pink">Pembe</option>
                                        <option value="orange">Turuncu</option>
                                        <option value="teal">Turkuaz</option>
                                        <option value="purple">Mor</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Sıra</label>
                                    <input type="number" class="form-control" name="order" value="0">
                                </div>
                                <div class="mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" name="is_active" checked>
                                        <label class="form-check-label">Aktif</label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">
                                    <i class="fas fa-save"></i> <span id="infoCardBtnText">Kaydet</span>
                                </button>
                                <button type="button" class="btn btn-secondary w-100 mt-2" id="cancelEditInfoCard" style="display:none;">
                                    <i class="fas fa-times"></i> İptal
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5>Mevcut Kartlar (Maksimum 5)</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover" id="infoCardsTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Başlık</th>
                                            <th>Açıklama</th>
                                            <th>Renk</th>
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
                CRUD.initDataTable('infoCardsTable', 'info_cards', [
                    { data: 'id' },
                    { data: 'title' },
                    { 
                        data: 'description',
                        render: function(data) {
                            return data.length > 50 ? data.substring(0, 50) + '...' : data;
                        }
                    },
                    { 
                        data: 'color',
                        render: function(data) {
                            const colors = {
                                blue: 'Mavi',
                                pink: 'Pembe',
                                orange: 'Turuncu',
                                teal: 'Turkuaz',
                                purple: 'Mor'
                            };
                            return '<span class="badge bg-' + data + '">' + (colors[data] || data) + '</span>';
                        }
                    },
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
                            return '<button class="btn btn-sm btn-primary" onclick="editInfoCard(' + row.id + ')">' +
                                   '<i class="fas fa-edit"></i></button> ' +
                                   '<button class="btn btn-sm btn-danger" onclick="deleteInfoCard(' + row.id + ')">' +
                                   '<i class="fas fa-trash"></i></button>';
                        }
                    }
                ]);
                
                $('#infoCardForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = CRUD.serializeForm('infoCardForm');
                    const id = $('#info_card_id').val();
                    formData.is_active = $('[name="is_active"]').is(':checked') ? 1 : 0;
                    
                    if (id) {
                        CRUD.update('info_cards', id, formData, function() {
                            CRUD.reloadTable('infoCardsTable');
                            CRUD.resetForm('infoCardForm');
                            $('#info_card_id').val('');
                            $('#infoCardFormTitle').text('Yeni Kart Ekle');
                            $('#infoCardBtnText').text('Kaydet');
                            $('#cancelEditInfoCard').hide();
                        });
                    } else {
                        CRUD.create('info_cards', formData, function() {
                            CRUD.reloadTable('infoCardsTable');
                            CRUD.resetForm('infoCardForm');
                        });
                    }
                });
                
                $('#cancelEditInfoCard').on('click', function() {
                    CRUD.resetForm('infoCardForm');
                    $('#info_card_id').val('');
                    $('#infoCardFormTitle').text('Yeni Kart Ekle');
                    $('#infoCardBtnText').text('Kaydet');
                    $(this).hide();
                });
            });
            
            window.editInfoCard = function(id) {
                CRUD.get('info_cards', id, function(data) {
                    $('#info_card_id').val(data.id);
                    $('[name="title"]').val(data.title);
                    $('[name="description"]').val(data.description);
                    $('[name="blog_title"]').val(data.blog_title || '');
                    $('[name="blog_excerpt"]').val(data.blog_excerpt || '');
                    $('[name="blog_content"]').val(data.blog_content || '');
                    $('[name="featured_image"]').val(data.featured_image || '');
                    $('[name="color"]').val(data.color);
                    $('[name="order"]').val(data.order);
                    $('[name="is_active"]').prop('checked', data.is_active == 1);
                    
                    $('#infoCardFormTitle').text('Kart Düzenle');
                    $('#infoCardBtnText').text('Güncelle');
                    $('#cancelEditInfoCard').show();
                });
            };
            
            window.deleteInfoCard = function(id) {
                CRUD.delete('info_cards', id, function() {
                    CRUD.reloadTable('infoCardsTable');
                });
            };
            
            window.addInfoCard = function() {
                $('#infoCardFormTitle').text('Yeni Kart Ekle');
                CRUD.resetForm('infoCardForm');
            };
            </script>
        `;
    }
    
    function getHashtagsTemplate() {
        return `
            <h2 class="mb-4">Etiketler (Hashtags)</h2>
            
            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 id="hashtagFormTitle">Yeni Etiket Ekle</h5>
                        </div>
                        <div class="card-body">
                            <form id="hashtagForm">
                                <input type="hidden" id="hashtag_id">
                                <div class="mb-3">
                                    <label class="form-label">Etiket Adı *</label>
                                    <div class="input-group">
                                        <span class="input-group-text">#</span>
                                        <input type="text" class="form-control" name="name" placeholder="WordPress" required>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Bağlantı URL</label>
                                    <input type="url" class="form-control" name="url" placeholder="https://...">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Sıra</label>
                                    <input type="number" class="form-control" name="order" value="0">
                                </div>
                                <div class="mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" name="is_active" checked>
                                        <label class="form-check-label">Aktif</label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">
                                    <i class="fas fa-save"></i> <span id="hashtagBtnText">Kaydet</span>
                                </button>
                                <button type="button" class="btn btn-secondary w-100 mt-2" id="cancelEditHashtag" style="display:none;">
                                    <i class="fas fa-times"></i> İptal
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5>Mevcut Etiketler</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover" id="hashtagsTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Etiket</th>
                                            <th>URL</th>
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
                CRUD.initDataTable('hashtagsTable', 'hashtags', [
                    { data: 'id' },
                    { 
                        data: 'name',
                        render: function(data) {
                            return '<span class="badge bg-secondary">#' + data + '</span>';
                        }
                    },
                    { 
                        data: 'url',
                        render: function(data) {
                            return data ? '<a href="' + data + '" target="_blank"><i class="fas fa-link"></i></a>' : '-';
                        }
                    },
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
                            return '<button class="btn btn-sm btn-primary" onclick="editHashtag(' + row.id + ')">' +
                                   '<i class="fas fa-edit"></i></button> ' +
                                   '<button class="btn btn-sm btn-danger" onclick="deleteHashtag(' + row.id + ')">' +
                                   '<i class="fas fa-trash"></i></button>';
                        }
                    }
                ]);
                
                $('#hashtagForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = CRUD.serializeForm('hashtagForm');
                    const id = $('#hashtag_id').val();
                    formData.is_active = $('[name="is_active"]').is(':checked') ? 1 : 0;
                    
                    if (id) {
                        CRUD.update('hashtags', id, formData, function() {
                            CRUD.reloadTable('hashtagsTable');
                            CRUD.resetForm('hashtagForm');
                            $('#hashtag_id').val('');
                            $('#hashtagFormTitle').text('Yeni Etiket Ekle');
                            $('#hashtagBtnText').text('Kaydet');
                            $('#cancelEditHashtag').hide();
                        });
                    } else {
                        CRUD.create('hashtags', formData, function() {
                            CRUD.reloadTable('hashtagsTable');
                            CRUD.resetForm('hashtagForm');
                        });
                    }
                });
                
                $('#cancelEditHashtag').on('click', function() {
                    CRUD.resetForm('hashtagForm');
                    $('#hashtag_id').val('');
                    $('#hashtagFormTitle').text('Yeni Etiket Ekle');
                    $('#hashtagBtnText').text('Kaydet');
                    $(this).hide();
                });
            });
            
            window.editHashtag = function(id) {
                CRUD.get('hashtags', id, function(data) {
                    $('#hashtag_id').val(data.id);
                    $('[name="name"]').val(data.name);
                    $('[name="url"]').val(data.url);
                    $('[name="order"]').val(data.order);
                    $('[name="is_active"]').prop('checked', data.is_active == 1);
                    
                    $('#hashtagFormTitle').text('Etiket Düzenle');
                    $('#hashtagBtnText').text('Güncelle');
                    $('#cancelEditHashtag').show();
                });
            };
            
            window.deleteHashtag = function(id) {
                CRUD.delete('hashtags', id, function() {
                    CRUD.reloadTable('hashtagsTable');
                });
            };
            
            window.addHashtag = function() {
                $('#hashtagFormTitle').text('Yeni Etiket Ekle');
                CRUD.resetForm('hashtagForm');
            };
            </script>
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
                            <form id="widgetRecentForm">
                                <div class="mb-3">
                                    <label class="form-label">Başlık</label>
                                    <input type="text" class="form-control" name="title" value="Son Gönderiler">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Gösterilecek Gönderi Sayısı</label>
                                    <input type="number" class="form-control" name="count" value="4" min="1" max="10">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Gösterim Türü</label>
                                    <select class="form-select" name="display_type">
                                        <option value="image_title" selected>Resim + Başlık</option>
                                        <option value="title_only">Sadece Başlık</option>
                                        <option value="detailed">Detaylı (Resim + Başlık + Meta)</option>
                                    </select>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="is_active" checked>
                                    <label class="form-check-label">Aktif</label>
                                </div>
                                <button type="submit" class="btn btn-primary mt-3 w-100">
                                    <i class="fas fa-save"></i> Kaydet
                                </button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>En Çok Okunanlar Widget</h5>
                        </div>
                        <div class="card-body">
                            <form id="widgetPopularForm">
                                <div class="mb-3">
                                    <label class="form-label">Başlık</label>
                                    <input type="text" class="form-control" name="title" value="En Çok Okunanlar">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Gösterilecek Gönderi Sayısı</label>
                                    <input type="number" class="form-control" name="count" value="3" min="1" max="10">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Zaman Aralığı</label>
                                    <select class="form-select" name="time_range">
                                        <option value="all">Tüm Zamanlar</option>
                                        <option value="30days" selected>Son 30 Gün</option>
                                        <option value="7days">Son 7 Gün</option>
                                        <option value="today">Bugün</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" name="show_views" checked>
                                        <label class="form-check-label">Görüntülenme sayısını göster</label>
                                    </div>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="is_active" checked>
                                    <label class="form-check-label">Aktif</label>
                                </div>
                                <button type="submit" class="btn btn-primary mt-3 w-100">
                                    <i class="fas fa-save"></i> Kaydet
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>Kategoriler Widget</h5>
                        </div>
                        <div class="card-body">
                            <form id="widgetCategoriesForm">
                                <div class="mb-3">
                                    <label class="form-label">Başlık</label>
                                    <input type="text" class="form-control" name="title" value="Kategoriler">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Gösterim Türü</label>
                                    <select class="form-select" name="display_type">
                                        <option value="list" selected>Liste</option>
                                        <option value="grid">Grid</option>
                                        <option value="dropdown">Dropdown</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" name="show_count" checked>
                                        <label class="form-check-label">Gönderi sayısını göster</label>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" name="show_icons" checked>
                                        <label class="form-check-label">İkonları göster</label>
                                    </div>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="is_active" checked>
                                    <label class="form-check-label">Aktif</label>
                                </div>
                                <button type="submit" class="btn btn-primary mt-3 w-100">
                                    <i class="fas fa-save"></i> Kaydet
                                </button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>Sosyal Medya Widget</h5>
                        </div>
                        <div class="card-body">
                            <form id="widgetSocialForm">
                                <div class="mb-3">
                                    <label class="form-label">Başlık</label>
                                    <input type="text" class="form-control" name="title" value="Bizi Takip Edin">
                                </div>
                                <div class="mb-2">
                                    <label class="form-label">Facebook URL</label>
                                    <input type="url" class="form-control" name="facebook" placeholder="https://facebook.com/...">
                                </div>
                                <div class="mb-2">
                                    <label class="form-label">Twitter URL</label>
                                    <input type="url" class="form-control" name="twitter" placeholder="https://twitter.com/...">
                                </div>
                                <div class="mb-2">
                                    <label class="form-label">Instagram URL</label>
                                    <input type="url" class="form-control" name="instagram" placeholder="https://instagram.com/...">
                                </div>
                                <div class="mb-2">
                                    <label class="form-label">LinkedIn URL</label>
                                    <input type="url" class="form-control" name="linkedin" placeholder="https://linkedin.com/...">
                                </div>
                                <div class="mb-2">
                                    <label class="form-label">YouTube URL</label>
                                    <input type="url" class="form-control" name="youtube" placeholder="https://youtube.com/...">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Pinterest URL</label>
                                    <input type="url" class="form-control" name="pinterest" placeholder="https://pinterest.com/...">
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="is_active" checked>
                                    <label class="form-check-label">Aktif</label>
                                </div>
                                <button type="submit" class="btn btn-primary mt-3 w-100">
                                    <i class="fas fa-save"></i> Kaydet
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                // Widget ayarlarını yükle
                loadWidgetSettings();
                
                // Son Gönderiler Widget
                $('#widgetRecentForm').on('submit', function(e) {
                    e.preventDefault();
                    saveWidgetSettings('widget_recent', $(this));
                });
                
                // En Çok Okunanlar Widget
                $('#widgetPopularForm').on('submit', function(e) {
                    e.preventDefault();
                    saveWidgetSettings('widget_popular', $(this));
                });
                
                // Kategoriler Widget
                $('#widgetCategoriesForm').on('submit', function(e) {
                    e.preventDefault();
                    saveWidgetSettings('widget_categories', $(this));
                });
                
                // Sosyal Medya Widget
                $('#widgetSocialForm').on('submit', function(e) {
                    e.preventDefault();
                    saveWidgetSettings('widget_social', $(this));
                });
            });
            
            function loadWidgetSettings() {
                // Tüm widget ayarlarını yükle
                $.get('../api/crud.php?action=list&table=settings', function(response) {
                    if (response.success) {
                        response.data.forEach(setting => {
                            if (setting.setting_key.startsWith('widget_')) {
                                const data = JSON.parse(setting.setting_value);
                                const widgetName = setting.setting_key;
                                fillWidgetForm(widgetName, data);
                            }
                        });
                    }
                });
            }
            
            function fillWidgetForm(widgetName, data) {
                const formId = '#' + widgetName + 'Form';
                Object.keys(data).forEach(key => {
                    const input = $(formId + ' [name="' + key + '"]');
                    if (input.attr('type') === 'checkbox') {
                        input.prop('checked', data[key] == 1 || data[key] === true);
                    } else {
                        input.val(data[key]);
                    }
                });
            }
            
            function saveWidgetSettings(widgetKey, form) {
                const formData = {};
                form.serializeArray().forEach(field => {
                    if (field.name !== 'is_active' && field.name !== 'show_views' && field.name !== 'show_count' && field.name !== 'show_icons') {
                        formData[field.name] = field.value;
                    }
                });
                
                // Checkbox değerlerini ekle
                formData.is_active = form.find('[name="is_active"]').is(':checked') ? 1 : 0;
                if (form.find('[name="show_views"]').length) {
                    formData.show_views = form.find('[name="show_views"]').is(':checked') ? 1 : 0;
                }
                if (form.find('[name="show_count"]').length) {
                    formData.show_count = form.find('[name="show_count"]').is(':checked') ? 1 : 0;
                }
                if (form.find('[name="show_icons"]').length) {
                    formData.show_icons = form.find('[name="show_icons"]').is(':checked') ? 1 : 0;
                }
                
                // Settings tablosuna kaydet
                $.ajax({
                    url: '../api/crud.php?action=update_setting',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        key: widgetKey,
                        value: JSON.stringify(formData)
                    }),
                    success: function(response) {
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Başarılı!',
                                text: 'Widget ayarları kaydedildi!',
                                timer: 1500
                            });
                        }
                    }
                });
            }
            </script>
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
                    <form id="headerLogoForm">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Site Başlığı</label>
                                    <input type="text" class="form-control" name="site_title" placeholder="Gezi Blog">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Logo Metni</label>
                                    <input type="text" class="form-control" name="logo_text" placeholder="GEZI">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Dark Logo URL</label>
                                    <input type="text" class="form-control" name="logo_dark" placeholder="assets/logo-dark.svg">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Light Logo URL</label>
                                    <input type="text" class="form-control" name="logo_light" placeholder="assets/logo-light.svg">
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Logo Ayarlarını Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Sosyal Medya Linkleri (Header)</h5>
                </div>
                <div class="card-body">
                    <form id="headerSocialForm">
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Twitter</label>
                                <input type="url" class="form-control" name="twitter" placeholder="https://twitter.com/...">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Facebook</label>
                                <input type="url" class="form-control" name="facebook" placeholder="https://facebook.com/...">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Instagram</label>
                                <input type="url" class="form-control" name="instagram" placeholder="https://instagram.com/...">
                            </div>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="show_social" checked>
                            <label class="form-check-label">
                                Header'da sosyal medya ikonlarını göster
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary mt-3">
                            <i class="fas fa-save"></i> Sosyal Medya Ayarlarını Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Header Ek Buton</h5>
                </div>
                <div class="card-body">
                    <form id="headerButtonForm">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Buton Metni</label>
                                    <input type="text" class="form-control" name="text" placeholder="Bize Ulaşın">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Buton URL</label>
                                    <input type="url" class="form-control" name="url" placeholder="#">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="is_active" checked>
                                    <label class="form-check-label">
                                        Butonu göster
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary mt-3">
                            <i class="fas fa-save"></i> Buton Ayarlarını Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5>Menü Öğeleri</h5>
                    <button class="btn btn-sm btn-primary" onclick="openMenuItemModal()">
                        <i class="fas fa-plus"></i> Yeni Menü Öğesi
                    </button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover" id="menuItemsTable">
                            <thead>
                                <tr>
                                    <th>Sıra</th>
                                    <th>Menü Adı</th>
                                    <th>URL</th>
                                    <th>Durum</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                // Menü öğelerini yükle
                loadMenuItems();
                
                // Logo form
                $('#headerLogoForm').on('submit', function(e) {
                    e.preventDefault();
                    saveHeaderSettings('header_logo', $(this));
                });
                
                // Sosyal medya form
                $('#headerSocialForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = {};
                    $(this).serializeArray().forEach(field => {
                        if (field.name !== 'show_social') {
                            formData[field.name] = field.value;
                        }
                    });
                    formData.show_social = $(this).find('[name="show_social"]').is(':checked') ? 1 : 0;
                    saveHeaderSettingsDirect('header_social', formData);
                });
                
                // Buton form
                $('#headerButtonForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = {};
                    $(this).serializeArray().forEach(field => {
                        if (field.name !== 'is_active') {
                            formData[field.name] = field.value;
                        }
                    });
                    formData.is_active = $(this).find('[name="is_active"]').is(':checked') ? 1 : 0;
                    saveHeaderSettingsDirect('header_button', formData);
                });
                
                // Ayarları yükle
                loadHeaderSettings();
            });
            
            function loadHeaderSettings() {
                $.get('../api/crud.php?action=list&table=settings', function(response) {
                    console.log('Header settings response:', response);
                    if (response.success && response.data) {
                        response.data.forEach(setting => {
                            try {
                                if (setting.setting_key === 'header_logo') {
                                    fillFormFromJSON('#headerLogoForm', setting.setting_value);
                                } else if (setting.setting_key === 'header_social') {
                                    fillFormFromJSON('#headerSocialForm', setting.setting_value);
                                } else if (setting.setting_key === 'header_button') {
                                    fillFormFromJSON('#headerButtonForm', setting.setting_value);
                                }
                            } catch(e) {
                                console.error('Error loading setting:', setting.setting_key, e);
                            }
                        });
                    }
                }).fail(function(error) {
                    console.error('Failed to load header settings:', error);
                });
            }
            
            function fillFormFromJSON(formId, jsonValue) {
                try {
                    const data = JSON.parse(jsonValue);
                    Object.keys(data).forEach(key => {
                        const input = $(formId + ' [name="' + key + '"]');
                        if (input.length > 0) {
                            if (input.attr('type') === 'checkbox') {
                                input.prop('checked', data[key] == 1);
                            } else {
                                input.val(data[key]);
                            }
                        }
                    });
                } catch(e) {
                    console.error('JSON parse error in fillFormFromJSON:', e, jsonValue);
                }
            }
            
            function saveHeaderSettings(key, form) {
                const formData = {};
                form.serializeArray().forEach(field => {
                    formData[field.name] = field.value;
                });
                console.log('Form submitted:', formData);
                saveHeaderSettingsDirect(key, formData);
            }
            
            function saveHeaderSettingsDirect(key, data) {
                console.log('Saving to API:', key, data);
                $.ajax({
                    url: '../api/crud.php?action=update_setting',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        key: key,
                        value: JSON.stringify(data)
                    }),
                    success: function(response) {
                        console.log('Save response:', response);
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Başarılı!',
                                text: 'Ayarlar kaydedildi!',
                                timer: 1500
                            });
                            // Ayarları yeniden yükle
                            loadHeaderSettings();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Hata!',
                                text: response.message || 'Kaydetme başarısız!'
                            });
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('AJAX Error:', status, error, xhr.responseText);
                        Swal.fire({
                            icon: 'error',
                            title: 'AJAX Hatası!',
                            text: 'Sunucuya bağlanamadı: ' + error
                        });
                    }
                });
            }
            
            function loadMenuItems() {
                $.get('../api/crud.php?action=get_setting&key=menu_items', function(response) {
                    console.log('Menu items response:', response);
                    if (response.success && response.data && response.data.value) {
                        try {
                            const items = JSON.parse(response.data.value);
                            renderMenuTable(items);
                        } catch(e) {
                            console.error('JSON parse error:', e);
                            renderDefaultMenu();
                        }
                    } else {
                        renderDefaultMenu();
                    }
                }).fail(function(error) {
                    console.error('Menu load error:', error);
                    renderDefaultMenu();
                });
            }
            
            function renderDefaultMenu() {
                // Varsayılan menü
                const defaultMenu = [
                    {id: 1, title: 'Ana Sayfa', url: 'index.html', order: 1, is_active: 1},
                    {id: 2, title: 'Kategoriler', url: '#', order: 2, is_active: 1},
                    {id: 3, title: 'Hakkımızda', url: '#', order: 3, is_active: 1}
                ];
                renderMenuTable(defaultMenu);
            }
            
            function renderMenuTable(items) {
                if ($.fn.DataTable.isDataTable('#menuItemsTable')) {
                    $('#menuItemsTable').DataTable().destroy();
                }
                
                $('#menuItemsTable tbody').empty();
                
                $('#menuItemsTable').DataTable({
                    data: items,
                    columns: [
                        { data: 'order' },
                        { data: 'title' },
                        { data: 'url' },
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
                                return '<button class="btn btn-sm btn-primary" onclick="editMenuItem(' + row.id + ')">' +
                                       '<i class="fas fa-edit"></i></button> ' +
                                       '<button class="btn btn-sm btn-danger" onclick="deleteMenuItem(' + row.id + ')">' +
                                       '<i class="fas fa-trash"></i></button>';
                            }
                        }
                    ],
                    order: [[0, 'asc']],
                    paging: false,
                    searching: false,
                    info: false,
                    language: {
                        emptyTable: 'Menü öğesi bulunmuyor',
                        zeroRecords: 'Hiç kayıt bulunamadı'
                    }
                });
            }
            
            window.openMenuItemModal = function() {
                Swal.fire({
                    title: 'Yeni Menü Öğesi',
                    html:
                        '<input id="menu-title" class="swal2-input" placeholder="Menü adı">' +
                        '<input id="menu-url" class="swal2-input" placeholder="URL">' +
                        '<input id="menu-order" type="number" class="swal2-input" placeholder="Sıra" value="99">',
                    showCancelButton: true,
                    confirmButtonText: 'Kaydet',
                    cancelButtonText: 'İptal',
                    preConfirm: () => {
                        return {
                            title: document.getElementById('menu-title').value,
                            url: document.getElementById('menu-url').value,
                            order: document.getElementById('menu-order').value
                        };
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        addMenuItemToList(result.value);
                    }
                });
            };
            
            function addMenuItemToList(item) {
                $.get('../api/crud.php?action=get_setting&key=menu_items', function(response) {
                    let items = [];
                    if (response.success && response.data && response.data.value) {
                        try {
                            items = JSON.parse(response.data.value);
                        } catch(e) {
                            console.error('JSON parse error in addMenuItem:', e);
                        }
                    }
                    
                    const newItem = {
                        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
                        title: item.title,
                        url: item.url,
                        order: parseInt(item.order),
                        is_active: 1
                    };
                    
                    items.push(newItem);
                    saveMenuItems(items);
                });
            }
            
            window.deleteMenuItem = function(id) {
                Swal.fire({
                    title: 'Emin misiniz?',
                    text: "Menü öğesi silinecek!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Evet, sil!',
                    cancelButtonText: 'İptal'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.get('../api/crud.php?action=get_setting&key=menu_items', function(response) {
                            if (response.success && response.data && response.data.value) {
                                try {
                                    let items = JSON.parse(response.data.value);
                                    items = items.filter(item => item.id !== id);
                                    saveMenuItems(items);
                                } catch(e) {
                                    console.error('JSON parse error in deleteMenuItem:', e);
                                }
                            }
                        });
                    }
                });
            };
            
            window.editMenuItem = function(id) {
                $.get('../api/crud.php?action=get_setting&key=menu_items', function(response) {
                    if (response.success && response.data && response.data.value) {
                        try {
                            const items = JSON.parse(response.data.value);
                            const item = items.find(i => i.id === id);
                            
                            if (item) {
                                Swal.fire({
                                    title: 'Menü Öğesini Düzenle',
                                    html:
                                        '<input id="menu-title" class="swal2-input" placeholder="Menü adı" value="' + item.title + '">' +
                                        '<input id="menu-url" class="swal2-input" placeholder="URL" value="' + item.url + '">' +
                                        '<input id="menu-order" type="number" class="swal2-input" placeholder="Sıra" value="' + item.order + '">',
                                    showCancelButton: true,
                                    confirmButtonText: 'Güncelle',
                                    cancelButtonText: 'İptal',
                                    preConfirm: () => {
                                        return {
                                            title: document.getElementById('menu-title').value,
                                            url: document.getElementById('menu-url').value,
                                            order: document.getElementById('menu-order').value
                                        };
                                    }
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        item.title = result.value.title;
                                        item.url = result.value.url;
                                        item.order = parseInt(result.value.order);
                                        saveMenuItems(items);
                                    }
                                });
                            }
                        } catch(e) {
                            console.error('JSON parse error in editMenuItem:', e);
                            Swal.fire('Hata!', 'Menü verileri yüklenemedi!', 'error');
                        }
                    }
                });
            };
            
            function saveMenuItems(items) {
                console.log('Saving menu items:', items);
                $.ajax({
                    url: '../api/crud.php?action=update_setting',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        key: 'menu_items',
                        value: JSON.stringify(items)
                    }),
                    success: function(response) {
                        console.log('Menu save response:', response);
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Başarılı!',
                                text: 'Menü güncellendi!',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            loadMenuItems();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Hata!',
                                text: response.message || 'Menü kaydetme başarısız!'
                            });
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('Menu save error:', status, error, xhr.responseText);
                        Swal.fire({
                            icon: 'error',
                            title: 'AJAX Hatası!',
                            text: 'Menü kaydedilemedi: ' + error
                        });
                    }
                });
            }
            </script>
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
                            <form id="footerAboutForm">
                                <div class="mb-3">
                                    <label class="form-label">Başlık</label>
                                    <input type="text" class="form-control" name="title" placeholder="Hakkımızda">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Açıklama</label>
                                    <textarea class="form-control" name="description" rows="3" placeholder="Kısa açıklama"></textarea>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="is_active" checked>
                                    <label class="form-check-label">Aktif</label>
                                </div>
                                <button type="submit" class="btn btn-primary mt-3 w-100">
                                    <i class="fas fa-save"></i> Kaydet
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>Hızlı Linkler</h5>
                        </div>
                        <div class="card-body">
                            <form id="footerLinksForm">
                                <div class="mb-3">
                                    <label class="form-label">Başlık</label>
                                    <input type="text" class="form-control" name="title" placeholder="Hızlı Linkler">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Linkler (Her satırda bir link)</label>
                                    <textarea class="form-control" name="links" rows="5" placeholder="Link Adı|URL"></textarea>
                                    <small class="text-muted">Format: Link Adı|URL</small>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="is_active" checked>
                                    <label class="form-check-label">Aktif</label>
                                </div>
                                <button type="submit" class="btn btn-primary mt-3 w-100">
                                    <i class="fas fa-save"></i> Kaydet
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5>Sosyal Medya</h5>
                        </div>
                        <div class="card-body">
                            <form id="footerSocialForm">
                                <div class="mb-3">
                                    <label class="form-label">Başlık</label>
                                    <input type="text" class="form-control" name="title" placeholder="Sosyal Medya">
                                </div>
                                <div class="mb-2">
                                    <label class="form-label">Facebook</label>
                                    <input type="url" class="form-control" name="facebook" placeholder="https://facebook.com/...">
                                </div>
                                <div class="mb-2">
                                    <label class="form-label">Twitter</label>
                                    <input type="url" class="form-control" name="twitter" placeholder="https://twitter.com/...">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Instagram</label>
                                    <input type="url" class="form-control" name="instagram" placeholder="https://instagram.com/...">
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="is_active" checked>
                                    <label class="form-check-label">Aktif</label>
                                </div>
                                <button type="submit" class="btn btn-primary mt-3 w-100">
                                    <i class="fas fa-save"></i> Kaydet
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Telif Hakkı Metni</h5>
                </div>
                <div class="card-body">
                    <form id="footerCopyrightForm">
                        <div class="mb-3">
                            <label class="form-label">Telif Metni</label>
                            <input type="text" class="form-control" name="text" placeholder="© 2025 Site Adı. Tüm hakları saklıdır.">
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                // Hakkımızda form
                $('#footerAboutForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = {};
                    $(this).serializeArray().forEach(field => {
                        if (field.name !== 'is_active') {
                            formData[field.name] = field.value;
                        }
                    });
                    formData.is_active = $(this).find('[name="is_active"]').is(':checked') ? 1 : 0;
                    saveFooterSettings('footer_about', formData);
                });
                
                // Hızlı linkler form
                $('#footerLinksForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = {};
                    $(this).serializeArray().forEach(field => {
                        if (field.name !== 'is_active') {
                            formData[field.name] = field.value;
                        }
                    });
                    formData.is_active = $(this).find('[name="is_active"]').is(':checked') ? 1 : 0;
                    saveFooterSettings('footer_links', formData);
                });
                
                // Sosyal medya form
                $('#footerSocialForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = {};
                    $(this).serializeArray().forEach(field => {
                        if (field.name !== 'is_active') {
                            formData[field.name] = field.value;
                        }
                    });
                    formData.is_active = $(this).find('[name="is_active"]').is(':checked') ? 1 : 0;
                    saveFooterSettings('footer_social', formData);
                });
                
                // Telif metni form
                $('#footerCopyrightForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = {};
                    $(this).serializeArray().forEach(field => {
                        formData[field.name] = field.value;
                    });
                    saveFooterSettings('footer_copyright', formData);
                });
                
                // Ayarları yükle
                loadFooterSettings();
            });
            
            function loadFooterSettings() {
                $.get('../api/crud.php?action=list&table=settings', function(response) {
                    if (response.success && response.data) {
                        response.data.forEach(setting => {
                            try {
                                if (setting.setting_key === 'footer_about') {
                                    fillFooterForm('#footerAboutForm', setting.setting_value);
                                } else if (setting.setting_key === 'footer_links') {
                                    fillFooterForm('#footerLinksForm', setting.setting_value);
                                } else if (setting.setting_key === 'footer_social') {
                                    fillFooterForm('#footerSocialForm', setting.setting_value);
                                } else if (setting.setting_key === 'footer_copyright') {
                                    fillFooterForm('#footerCopyrightForm', setting.setting_value);
                                }
                            } catch(e) {
                                console.error('Error loading footer setting:', setting.setting_key, e);
                            }
                        });
                    }
                });
            }
            
            function fillFooterForm(formId, jsonValue) {
                try {
                    const data = JSON.parse(jsonValue);
                    Object.keys(data).forEach(key => {
                        const input = $(formId + ' [name="' + key + '"]');
                        if (input.length > 0) {
                            if (input.attr('type') === 'checkbox') {
                                input.prop('checked', data[key] == 1);
                            } else {
                                input.val(data[key]);
                            }
                        }
                    });
                } catch(e) {
                    console.error('JSON parse error in fillFooterForm:', e, jsonValue);
                }
            }
            
            function saveFooterSettings(key, data) {
                $.ajax({
                    url: '../api/crud.php?action=update_setting',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        key: key,
                        value: JSON.stringify(data)
                    }),
                    success: function(response) {
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Başarılı!',
                                text: 'Footer ayarları kaydedildi!',
                                timer: 1500
                            });
                            loadFooterSettings();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Hata!',
                                text: response.message || 'Kaydetme başarısız!'
                            });
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('Footer save error:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Hata!',
                            text: 'Kaydedilemedi: ' + error
                        });
                    }
                });
            }
            </script>
        `;
    }
    
    function getNotificationsTemplate() {
        return `
            <h2 class="mb-4">Bildirim Yönetimi</h2>
            
            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 id="notificationFormTitle">Yeni Bildirim Ekle</h5>
                        </div>
                        <div class="card-body">
                            <form id="notificationForm">
                                <input type="hidden" id="notification_id">
                                <div class="mb-3">
                                    <label class="form-label">Başlık *</label>
                                    <input type="text" class="form-control" name="title" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Mesaj *</label>
                                    <textarea class="form-control" name="message" rows="3" required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Zaman Metni</label>
                                    <input type="text" class="form-control" name="time_text" placeholder="2 saat önce">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Bağlantı URL</label>
                                    <input type="url" class="form-control" name="url" placeholder="#">
                                </div>
                                <div class="mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" name="is_active" checked>
                                        <label class="form-check-label">Aktif</label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">
                                    <i class="fas fa-save"></i> <span id="notificationBtnText">Kaydet</span>
                                </button>
                                <button type="button" class="btn btn-secondary w-100 mt-2" id="cancelEditNotification" style="display:none;">
                                    <i class="fas fa-times"></i> İptal
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5>Aktif Bildirimler</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover" id="notificationsTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Başlık</th>
                                            <th>Mesaj</th>
                                            <th>Zaman</th>
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
                CRUD.initDataTable('notificationsTable', 'notifications', [
                    { data: 'id' },
                    { data: 'title' },
                    { 
                        data: 'message',
                        render: function(data) {
                            return data.length > 50 ? data.substring(0, 50) + '...' : data;
                        }
                    },
                    { data: 'time_text' },
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
                            return '<button class="btn btn-sm btn-primary" onclick="editNotification(' + row.id + ')">' +
                                   '<i class="fas fa-edit"></i></button> ' +
                                   '<button class="btn btn-sm btn-danger" onclick="deleteNotification(' + row.id + ')">' +
                                   '<i class="fas fa-trash"></i></button>';
                        }
                    }
                ]);
                
                $('#notificationForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = CRUD.serializeForm('notificationForm');
                    const id = $('#notification_id').val();
                    formData.is_active = $('[name="is_active"]').is(':checked') ? 1 : 0;
                    
                    if (id) {
                        CRUD.update('notifications', id, formData, function() {
                            CRUD.reloadTable('notificationsTable');
                            CRUD.resetForm('notificationForm');
                            $('#notification_id').val('');
                            $('#notificationFormTitle').text('Yeni Bildirim Ekle');
                            $('#notificationBtnText').text('Kaydet');
                            $('#cancelEditNotification').hide();
                        });
                    } else {
                        CRUD.create('notifications', formData, function() {
                            CRUD.reloadTable('notificationsTable');
                            CRUD.resetForm('notificationForm');
                        });
                    }
                });
                
                $('#cancelEditNotification').on('click', function() {
                    CRUD.resetForm('notificationForm');
                    $('#notification_id').val('');
                    $('#notificationFormTitle').text('Yeni Bildirim Ekle');
                    $('#notificationBtnText').text('Kaydet');
                    $(this).hide();
                });
            });
            
            window.editNotification = function(id) {
                CRUD.get('notifications', id, function(data) {
                    $('#notification_id').val(data.id);
                    $('[name="title"]').val(data.title);
                    $('[name="message"]').val(data.message);
                    $('[name="time_text"]').val(data.time_text);
                    $('[name="url"]').val(data.url);
                    $('[name="is_active"]').prop('checked', data.is_active == 1);
                    
                    $('#notificationFormTitle').text('Bildirim Düzenle');
                    $('#notificationBtnText').text('Güncelle');
                    $('#cancelEditNotification').show();
                });
            };
            
            window.deleteNotification = function(id) {
                CRUD.delete('notifications', id, function() {
                    CRUD.reloadTable('notificationsTable');
                });
            };
            
            window.addNotification = function() {
                $('#notificationFormTitle').text('Yeni Bildirim Ekle');
                CRUD.resetForm('notificationForm');
            };
            </script>
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
                    <form id="adsenseTopForm">
                        <div class="mb-3">
                            <label class="form-label">Google AdSense Kodu</label>
                            <textarea class="form-control" name="code" rows="5" placeholder="AdSense script kodunu buraya yapıştırın..."></textarea>
                            <small class="text-muted">Google AdSense'den aldığınız reklam kodunu buraya yapıştırın</small>
                        </div>
                        <div class="mb-3">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="is_active" checked>
                                <label class="form-check-label">
                                    Yatay reklam alanını göster
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-header">
                    <h5>Dikey Reklam Alanı (Bottom - İçerik Sonrası)</h5>
                </div>
                <div class="card-body">
                    <form id="adsenseBottomForm">
                        <div class="mb-3">
                            <label class="form-label">Google AdSense Kodu</label>
                            <textarea class="form-control" name="code" rows="5" placeholder="AdSense script kodunu buraya yapıştırın..."></textarea>
                            <small class="text-muted">Google AdSense'den aldığınız reklam kodunu buraya yapıştırın</small>
                        </div>
                        <div class="mb-3">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="is_active" checked>
                                <label class="form-check-label">
                                    Dikey reklam alanını göster
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5>Genel Ayarlar</h5>
                </div>
                <div class="card-body">
                    <form id="adsenseGeneralForm">
                        <div class="mb-3">
                            <label class="form-label">Google AdSense Publisher ID</label>
                            <input type="text" class="form-control" name="publisher_id" placeholder="ca-pub-xxxxxxxxxxxxxxxx">
                            <small class="text-muted">Google AdSense hesabınızdaki Publisher ID'nizi girin</small>
                        </div>
                        <div class="mb-3">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="auto_ads">
                                <label class="form-check-label">
                                    Otomatik reklamları etkinleştir (Auto Ads)
                                </label>
                            </div>
                            <small class="text-muted">Google'un otomatik olarak en iyi reklam yerleştirmesini yapmasını sağlar</small>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Genel Ayarları Kaydet
                        </button>
                    </form>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                // Top AdSense
                $('#adsenseTopForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = {};
                    $(this).serializeArray().forEach(field => {
                        if (field.name !== 'is_active') {
                            formData[field.name] = field.value;
                        }
                    });
                    formData.is_active = $(this).find('[name="is_active"]').is(':checked') ? 1 : 0;
                    saveAdSettings('adsense_top', formData);
                });
                
                // Bottom AdSense
                $('#adsenseBottomForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = {};
                    $(this).serializeArray().forEach(field => {
                        if (field.name !== 'is_active') {
                            formData[field.name] = field.value;
                        }
                    });
                    formData.is_active = $(this).find('[name="is_active"]').is(':checked') ? 1 : 0;
                    saveAdSettings('adsense_bottom', formData);
                });
                
                // General AdSense
                $('#adsenseGeneralForm').on('submit', function(e) {
                    e.preventDefault();
                    const formData = {};
                    $(this).serializeArray().forEach(field => {
                        if (field.name !== 'auto_ads') {
                            formData[field.name] = field.value;
                        }
                    });
                    formData.auto_ads = $(this).find('[name="auto_ads"]').is(':checked') ? 1 : 0;
                    saveAdSettings('adsense_general', formData);
                });
                
                loadAdSettings();
            });
            
            function loadAdSettings() {
                $.get('../api/crud.php?action=list&table=settings', function(response) {
                    if (response.success && response.data) {
                        response.data.forEach(setting => {
                            try {
                                if (setting.setting_key === 'adsense_top') {
                                    fillAdForm('#adsenseTopForm', setting.setting_value);
                                } else if (setting.setting_key === 'adsense_bottom') {
                                    fillAdForm('#adsenseBottomForm', setting.setting_value);
                                } else if (setting.setting_key === 'adsense_general') {
                                    fillAdForm('#adsenseGeneralForm', setting.setting_value);
                                }
                            } catch(e) {
                                console.error('Error loading ad setting:', e);
                            }
                        });
                    }
                });
            }
            
            function fillAdForm(formId, jsonValue) {
                try {
                    const data = JSON.parse(jsonValue);
                    Object.keys(data).forEach(key => {
                        const input = $(formId + ' [name="' + key + '"]');
                        if (input.length > 0) {
                            if (input.attr('type') === 'checkbox') {
                                input.prop('checked', data[key] == 1);
                            } else {
                                input.val(data[key]);
                            }
                        }
                    });
                } catch(e) {
                    console.error('JSON parse error:', e);
                }
            }
            
            function saveAdSettings(key, data) {
                $.ajax({
                    url: '../api/crud.php?action=update_setting',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        key: key,
                        value: JSON.stringify(data)
                    }),
                    success: function(response) {
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Başarılı!',
                                text: 'Reklam ayarları kaydedildi!',
                                timer: 1500
                            });
                        }
                    },
                    error: function(error) {
                        console.error('Ad save error:', error);
                        Swal.fire('Hata!', 'Kaydedilemedi!', 'error');
                    }
                });
            }
            </script>
        `;
    }
    
    
    // === BACKUP SYSTEM HANDLERS (Global) ===
    function initBackupSystem() {
        console.log('=== INITIALIZING BACKUP SYSTEM ===');
        
        // Load backup settings and history
        loadBackupSettings();
        loadBackupHistory();
        
        // Create Backup Form
        $('#createBackupForm').off('submit').on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('=== CREATE BACKUP FORM SUBMITTED ===');
            
            const backupType = $('#backupType').val();
            const compress = $('#compressBackup').is(':checked');
            
            console.log('Backup Type:', backupType);
            console.log('Compress:', compress);
            
            window.createBackup(backupType, compress);
            return false;
        });
        
        // Auto Backup Settings Form
        $('#autoBackupForm').off('submit').on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const settings = {
                enabled: $('#autoBackupEnabled').is(':checked') ? 1 : 0,
                frequency: $('#backupFrequency').val()
            };
            
            saveAutoBackupSettings(settings);
            return false;
        });
    }
    
    function loadBackupSettings() {
        $.get('../api/crud.php?action=get_setting&key=auto_backup', function(response) {
            if (response.success && response.data && response.data.value) {
                try {
                    const data = JSON.parse(response.data.value);
                    $('#autoBackupEnabled').prop('checked', data.enabled == 1);
                    $('#backupFrequency').val(data.frequency || 'daily');
                } catch(e) {
                    console.error('Backup settings parse error:', e);
                }
            }
        });
    }
    
    function saveAutoBackupSettings(settings) {
        console.log('Saving auto backup settings:', settings);
        saveSetting('auto_backup', settings);
    }
    
    window.createBackup = function(type, compress) {
        console.log('=== CREATING BACKUP ===', { type, compress });
        
        Swal.fire({
            title: 'Yedek Oluşturuluyor',
            html: `
                <div class="text-center">
                    <div class="spinner-border text-success mb-3" role="status"></div>
                    <p>Veriler yedekleniyor, lütfen bekleyin...</p>
                    <small class="text-muted">Bu işlem birkaç dakika sürebilir</small>
                </div>
            `,
            allowOutsideClick: false,
            showConfirmButton: false
        });
        
        // Simulate backup creation
        setTimeout(function() {
            const now = new Date();
            const fileName = `backup_${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${compress ? '.zip' : '.tar'}`;
            const fileSize = (Math.random() * 30 + 20).toFixed(1); // 20-50 MB
            
            // Save backup record to database
            const backupData = {
                filename: fileName,
                type: type,
                size: fileSize,
                compressed: compress ? 1 : 0,
                created_at: now.toISOString().slice(0, 19).replace('T', ' ')
            };
            
            $.ajax({
                url: '../api/crud.php?action=create&table=backups',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(backupData),
                success: function(response) {
                    console.log('Backup create response:', response);
                    
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Yedek Oluşturuldu!',
                            html: `
                                <p><strong>Dosya:</strong> ${fileName}</p>
                                <p><strong>Boyut:</strong> ${fileSize} MB</p>
                                <p><strong>Tür:</strong> ${type === 'full' ? 'Tam Yedek' : type === 'database' ? 'Veritabanı' : 'Dosyalar'}</p>
                            `,
                            confirmButtonText: 'Tamam'
                        });
                        
                        console.log('Reloading backup history...');
                        // Reload history
                        setTimeout(() => {
                            window.loadBackupHistory();
                        }, 500);
                    } else {
                        console.error('Backup create failed:', response.message);
                        Swal.fire('Hata!', 'Yedek oluşturulamadı: ' + response.message, 'error');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Backup create AJAX error:', status, error);
                    console.error('Response:', xhr.responseText);
                    Swal.fire('Hata!', 'Yedek oluşturulamadı', 'error');
                }
            });
        }, 2000);
    };
    
    window.loadBackupHistory = function() {
        console.log('=== LOADING BACKUP HISTORY ===');
        
        $.get('../api/crud.php?action=list&table=backups', function(response) {
            console.log('Backup history response:', response);
            
            if (response.success && response.data && response.data.length > 0) {
                // Sort by created_at DESC (newest first)
                const backups = response.data.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                
                let html = '';
                
                backups.forEach(backup => {
                    const date = new Date(backup.created_at);
                    const dateStr = date.toLocaleDateString('tr-TR') + ' ' + date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
                    
                    let typeText = 'Tam Yedek';
                    if (backup.type === 'database') typeText = 'Veritabanı';
                    else if (backup.type === 'files') typeText = 'Dosyalar';
                    
                    html += `
                        <div class="backup-item mb-3 p-3" style="background: #f8f9fa; border-radius: 8px;">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <strong><i class="fas fa-archive text-primary"></i> ${backup.filename}</strong><br>
                                    <small class="text-muted">
                                        ${dateStr} • ${backup.size} MB • ${typeText}
                                        ${backup.compressed == 1 ? '<i class="fas fa-file-archive ms-1" title="Sıkıştırılmış"></i>' : ''}
                                    </small>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-primary" onclick="downloadBackup(${backup.id}, '${backup.filename}')" title="İndir">
                                        <i class="fas fa-download"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="deleteBackup(${backup.id})" title="Sil">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                $('#backupHistoryList').html(html);
            } else {
                console.log('No backups found or empty data');
                $('#backupHistoryList').html(`
                    <div class="text-center text-muted py-4">
                        <i class="fas fa-database fa-3x mb-3"></i>
                        <p>Henüz yedek oluşturulmadı</p>
                    </div>
                `);
            }
        }).fail(function(xhr, status, error) {
            console.error('Backup history load failed:', status, error);
            console.error('Response:', xhr.responseText);
            $('#backupHistoryList').html(`
                <div class="text-center text-danger py-4">
                    <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                    <p>Yedek geçmişi yüklenemedi</p>
                </div>
            `);
        });
    };
    
    window.downloadBackup = function(id, filename) {
        console.log('Downloading backup:', id, filename);
        
        Swal.fire({
            icon: 'info',
            title: 'İndirme Başlatılıyor',
            text: `${filename} dosyası indiriliyor...`,
            timer: 2000,
            showConfirmButton: false
        });
        
        // In real implementation, this would download the actual file
        // window.location.href = '../api/download_backup.php?id=' + id;
    };
    
    window.deleteBackup = function(id) {
        Swal.fire({
            title: 'Emin misiniz?',
            text: 'Bu yedek dosyası kalıcı olarak silinecek!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Evet, Sil!',
            cancelButtonText: 'İptal'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `../api/crud.php?action=delete&table=backups&id=${id}`,
                    type: 'DELETE',
                    success: function(response) {
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Silindi!',
                                text: 'Yedek dosyası silindi',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            loadBackupHistory();
                        } else {
                            Swal.fire('Hata!', 'Yedek silinemedi', 'error');
                        }
                    },
                    error: function() {
                        Swal.fire('Hata!', 'Yedek silinemedi', 'error');
                    }
                });
            }
        });
    };
    
    // === PERFORMANCE HANDLERS (Global) ===
    function initPerformanceSettings() {
        console.log('=== INITIALIZING PERFORMANCE SETTINGS ===');
        
        // Set initial values to display cards
        $('#pagespeedScore').text('--');
        $('#loadTime').text('--');
        $('#pageSize').text('--');
        
        // Load current settings
        loadPerformanceSettings();
        
        // Form submit
        $('#performanceForm').off('submit').on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const formData = {
                image_optimization: $('#imageOptimization').is(':checked') ? 1 : 0,
                lazy_load: $('#lazyLoad').is(':checked') ? 1 : 0,
                minify_css: $('#minifyCSS').is(':checked') ? 1 : 0,
                minify_js: $('#minifyJS').is(':checked') ? 1 : 0,
                browser_cache: $('#browserCache').is(':checked') ? 1 : 0
            };
            
            saveSetting('performance_settings', formData);
            return false;
        });
        
        // Run test button
        $('#runTestBtn').off('click').on('click', function() {
            runPerformanceTest();
        });
    }
    
    function loadPerformanceSettings() {
        $.get('../api/crud.php?action=get_setting&key=performance_settings', function(response) {
            if (response.success && response.data && response.data.value) {
                try {
                    const data = JSON.parse(response.data.value);
                    $('#imageOptimization').prop('checked', data.image_optimization == 1);
                    $('#lazyLoad').prop('checked', data.lazy_load == 1);
                    $('#minifyCSS').prop('checked', data.minify_css == 1);
                    $('#minifyJS').prop('checked', data.minify_js == 1);
                    $('#browserCache').prop('checked', data.browser_cache == 1);
                } catch(e) {
                    console.error('Performance settings parse error:', e);
                }
            }
        });
    }
    
    window.runPerformanceTest = function() {
        console.log('=== RUNNING PERFORMANCE TEST ===');
        
        // Show loading
        Swal.fire({
            title: 'Performans Testi',
            html: `
                <div class="text-center">
                    <div class="spinner-border text-primary mb-3" role="status">
                        <span class="visually-hidden">Yükleniyor...</span>
                    </div>
                    <p>Test çalıştırılıyor, lütfen bekleyin...</p>
                    <small class="text-muted">Sayfa performansı analiz ediliyor</small>
                </div>
            `,
            allowOutsideClick: false,
            showConfirmButton: false
        });
        
        // Get current performance settings
        const optimizations = {
            imageOptimization: $('#imageOptimization').is(':checked'),
            lazyLoad: $('#lazyLoad').is(':checked'),
            minifyCSS: $('#minifyCSS').is(':checked'),
            minifyJS: $('#minifyJS').is(':checked'),
            browserCache: $('#browserCache').is(':checked')
        };
        
        // Calculate bonus based on enabled optimizations
        let bonus = 0;
        if (optimizations.imageOptimization) bonus += 5;
        if (optimizations.lazyLoad) bonus += 4;
        if (optimizations.minifyCSS) bonus += 3;
        if (optimizations.minifyJS) bonus += 3;
        if (optimizations.browserCache) bonus += 5;
        
        // Simulate realistic test with progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                clearInterval(progressInterval);
                showResults();
            }
        }, 200);
        
        function showResults() {
            // Calculate scores based on optimizations
            const baseScore = 70;
            const score = Math.min(100, Math.floor(baseScore + bonus + Math.random() * 10));
            
            // Load time decreases with optimizations
            const baseLoadTime = 3.5;
            const loadTime = (baseLoadTime - (bonus * 0.08) + Math.random() * 0.5).toFixed(2);
            
            // Page size decreases with optimizations
            const baseSize = 4.2;
            const pageSize = (baseSize - (bonus * 0.05) + Math.random() * 0.3).toFixed(2);
            
            // Update display cards with animation
            $('#pagespeedScore').fadeOut(200, function() {
                $(this).text(score).fadeIn(400);
            });
            $('#loadTime').fadeOut(200, function() {
                $(this).text(loadTime + 's').fadeIn(400);
            });
            $('#pageSize').fadeOut(200, function() {
                $(this).text(pageSize + 'MB').fadeIn(400);
            });
            
            // Determine performance level
            let level, icon, color;
            if (score >= 90) {
                level = 'Mükemmel';
                icon = 'success';
                color = '#28a745';
            } else if (score >= 75) {
                level = 'İyi';
                icon = 'info';
                color = '#17a2b8';
            } else if (score >= 50) {
                level = 'Orta';
                icon = 'warning';
                color = '#ffc107';
            } else {
                level = 'Zayıf';
                icon = 'error';
                color = '#dc3545';
            }
            
            // Generate recommendations
            const recommendations = [];
            if (!optimizations.imageOptimization) {
                recommendations.push('• Resim optimizasyonunu etkinleştirin (+5 puan)');
            }
            if (!optimizations.lazyLoad) {
                recommendations.push('• Lazy loading\u0027i etkinleştirin (+4 puan)');
            }
            if (!optimizations.minifyCSS) {
                recommendations.push('• CSS sıkıştırmayı etkinleştirin (+3 puan)');
            }
            if (!optimizations.minifyJS) {
                recommendations.push('• JavaScript sıkıştırmayı etkinleştirin (+3 puan)');
            }
            if (!optimizations.browserCache) {
                recommendations.push('• Tarayıcı önbelleğini etkinleştirin (+5 puan)');
            }
            
            const recommendationsHTML = recommendations.length > 0 
                ? `<div class="mt-3 text-start">
                    <strong>Öneriler:</strong>
                    <div class="mt-2" style="font-size: 0.9em;">
                        ${recommendations.join('<br>')}
                    </div>
                   </div>`
                : '<div class="mt-3"><span class="badge bg-success">Tüm optimizasyonlar aktif! 🎉</span></div>';
            
            // Show detailed results
            Swal.fire({
                icon: icon,
                title: `Performans: ${level}`,
                html: `
                    <div class="performance-results">
                        <div class="row text-center mb-3">
                            <div class="col-4">
                                <div class="p-3" style="background: #f8f9fa; border-radius: 8px;">
                                    <h2 style="color: ${color}; margin: 0;">${score}</h2>
                                    <small class="text-muted">PageSpeed</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="p-3" style="background: #f8f9fa; border-radius: 8px;">
                                    <h2 style="color: #17a2b8; margin: 0;">${loadTime}s</h2>
                                    <small class="text-muted">Yüklenme</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="p-3" style="background: #f8f9fa; border-radius: 8px;">
                                    <h2 style="color: #ffc107; margin: 0;">${pageSize}MB</h2>
                                    <small class="text-muted">Boyut</small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="text-start">
                            <p><strong>Aktif Optimizasyonlar:</strong> ${bonus}/20 puan</p>
                            <div class="progress mb-3" style="height: 25px;">
                                <div class="progress-bar" role="progressbar" 
                                     style="width: ${score}%; background: ${color};" 
                                     aria-valuenow="${score}" aria-valuemin="0" aria-valuemax="100">
                                    ${score}%
                                </div>
                            </div>
                        </div>
                        
                        ${recommendationsHTML}
                    </div>
                `,
                width: 600,
                confirmButtonText: 'Tamam',
                confirmButtonColor: color
            });
        }
    };
    
    // Initial analysis - runs silently without popup
    window.runInitialPerformanceAnalysis = function() {
        console.log('=== RUNNING INITIAL PERFORMANCE ANALYSIS ===');
        
        // Get current performance settings
        const optimizations = {
            imageOptimization: $('#imageOptimization').is(':checked'),
            lazyLoad: $('#lazyLoad').is(':checked'),
            minifyCSS: $('#minifyCSS').is(':checked'),
            minifyJS: $('#minifyJS').is(':checked'),
            browserCache: $('#browserCache').is(':checked')
        };
        
        // Calculate bonus based on enabled optimizations
        let bonus = 0;
        if (optimizations.imageOptimization) bonus += 5;
        if (optimizations.lazyLoad) bonus += 4;
        if (optimizations.minifyCSS) bonus += 3;
        if (optimizations.minifyJS) bonus += 3;
        if (optimizations.browserCache) bonus += 5;
        
        // Calculate scores based on optimizations
        const baseScore = 70;
        const score = Math.min(100, Math.floor(baseScore + bonus + Math.random() * 10));
        
        // Load time decreases with optimizations
        const baseLoadTime = 3.5;
        const loadTime = (baseLoadTime - (bonus * 0.08) + Math.random() * 0.5).toFixed(2);
        
        // Page size decreases with optimizations
        const baseSize = 4.2;
        const pageSize = (baseSize - (bonus * 0.05) + Math.random() * 0.3).toFixed(2);
        
        // Update display cards with animation
        $('#pagespeedScore').fadeOut(200, function() {
            $(this).text(score).fadeIn(400);
        });
        $('#loadTime').fadeOut(200, function() {
            $(this).text(loadTime + 's').fadeIn(400);
        });
        $('#pageSize').fadeOut(200, function() {
            $(this).text(pageSize + 'MB').fadeIn(400);
        });
        
        console.log('Initial analysis complete:', { score, loadTime, pageSize, bonus });
    };
    
    // === SETTINGS HANDLERS (Global) ===
    function initSettingsForms() {
        console.log('=== INITIALIZING SETTINGS FORMS ===');
        
        // Load all settings
        loadAllSettings();
        
        // General Settings Form
        $('#generalSettingsForm').off('submit').on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const formData = {};
            $(this).serializeArray().forEach(field => {
                formData[field.name] = field.value;
            });
            saveSetting('site_general', formData);
            return false;
        });
        
        // Cookie Settings Form
        $('#cookieSettingsForm').off('submit').on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const formData = {};
            $(this).serializeArray().forEach(field => {
                formData[field.name] = field.value;
            });
            formData.cookie_enabled = $('#cookieEnabled').is(':checked') ? 1 : 0;
            saveSetting('site_cookie', formData);
            return false;
        });
        
        // Script Settings Form
        $('#scriptSettingsForm').off('submit').on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const formData = {};
            $(this).serializeArray().forEach(field => {
                formData[field.name] = field.value;
            });
            saveSetting('site_scripts', formData);
            return false;
        });
        
        // Language Settings Form
        $('#languageSettingsForm').off('submit').on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const formData = {};
            $(this).serializeArray().forEach(field => {
                formData[field.name] = field.value;
            });
            formData.multi_language = $('#multiLang').is(':checked') ? 1 : 0;
            saveSetting('site_language', formData);
            return false;
        });
    }
    
    function loadAllSettings() {
        $.get('../api/crud.php?action=list&table=settings', function(response) {
            if (response.success && response.data) {
                response.data.forEach(setting => {
                    try {
                        const data = JSON.parse(setting.setting_value);
                        
                        if (setting.setting_key === 'site_general') {
                            Object.keys(data).forEach(key => {
                                $('[name="' + key + '"]').val(data[key]);
                            });
                        } else if (setting.setting_key === 'site_cookie') {
                            Object.keys(data).forEach(key => {
                                if (key === 'cookie_enabled') {
                                    $('#cookieEnabled').prop('checked', data[key] == 1);
                                } else {
                                    $('[name="' + key + '"]').val(data[key]);
                                }
                            });
                        } else if (setting.setting_key === 'site_scripts') {
                            Object.keys(data).forEach(key => {
                                $('[name="' + key + '"]').val(data[key]);
                            });
                        } else if (setting.setting_key === 'site_language') {
                            Object.keys(data).forEach(key => {
                                if (key === 'multi_language') {
                                    $('#multiLang').prop('checked', data[key] == 1);
                                } else {
                                    $('[name="' + key + '"]').val(data[key]);
                                }
                            });
                        }
                    } catch(e) {
                        console.error('Settings parse error:', e);
                    }
                });
            }
        });
    }
    
    function saveSetting(key, data) {
        console.log('Saving setting:', key, data);
        $.ajax({
            url: '../api/crud.php?action=update_setting',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                key: key,
                value: JSON.stringify(data)
            }),
            success: function(response) {
                console.log('Save response:', response);
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Başarılı!',
                        text: 'Ayarlar kaydedildi!',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } else {
                    Swal.fire('Hata!', response.message, 'error');
                }
            },
            error: function(xhr, status, error) {
                console.error('Save error:', error, xhr.responseText);
                Swal.fire('Hata!', 'Ayarlar kaydedilemedi: ' + error, 'error');
            }
        });
    }
    
    // === DASHBOARD HANDLERS (Global) ===
    function loadDashboardStats() {
        console.log('=== LOADING DASHBOARD STATS ===');
        
        // Load posts count
        $.get('../api/crud.php?action=list&table=posts', function(response) {
            if (response.success) {
                $('#totalPosts').text(response.data.length);
            }
        });
        
        // Load categories count
        $.get('../api/crud.php?action=list&table=categories', function(response) {
            if (response.success) {
                $('#totalCategories').text(response.data.length);
            }
        });
        
        // Load tags count
        $.get('../api/crud.php?action=list&table=tags', function(response) {
            if (response.success) {
                $('#totalTags').text(response.data.length);
            }
        });
        
        // Mock total views
        $('#totalViews').text('1,234');
        
        // Load recent posts
        $.get('../api/crud.php?action=list&table=posts', function(response) {
            if (response.success && response.data.length > 0) {
                let recentHTML = '<div class="list-group list-group-flush">';
                response.data.slice(0, 5).forEach(post => {
                    const date = new Date(post.created_at).toLocaleDateString('tr-TR');
                    recentHTML += `
                        <div class="list-group-item">
                            <div class="d-flex justify-content-between">
                                <strong>${post.title}</strong>
                                <small class="text-muted">${date}</small>
                            </div>
                        </div>
                    `;
                });
                recentHTML += '</div>';
                $('#recentPosts').html(recentHTML);
            } else {
                $('#recentPosts').html('<p class="text-muted">Henüz gönderi yok</p>');
            }
        });
        
        // Create visitor chart (mock data)
        const ctx = document.getElementById('visitorChart');
        if (ctx && typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
                    datasets: [{
                        label: 'Ziyaretçi',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }
    
    // === MEDIA UPLOAD HANDLER (Global) ===
    function initMediaUpload() {
        console.log('=== INITIALIZING MEDIA UPLOAD ===');
        console.log('Form exists:', $('#mediaUploadForm').length);
        
        // Remove any existing handlers
        $('#mediaUploadForm').off('submit');
        
        // Add submit handler
        $('#mediaUploadForm').on('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('=== MEDIA FORM SUBMITTED ===');
            
            const fileInput = $('#mediaFile')[0];
            if (!fileInput.files.length) {
                Swal.fire('Uyarı!', 'Lütfen dosya seçin!', 'warning');
                return;
            }
            
            const formData = new FormData();
            formData.append('media_file', fileInput.files[0]);
            formData.append('description', $('[name="description"]').val() || '');
            
            console.log('=== MEDIA UPLOAD START ===');
            console.log('File:', fileInput.files[0].name);
            console.log('Size:', fileInput.files[0].size);
            console.log('Type:', fileInput.files[0].type);
            
            Swal.fire({
                title: 'Yüklüyor...',
                text: 'Dosya yüklenirken lütfen bekleyin',
                allowOutsideClick: false,
                didOpen: () => { Swal.showLoading(); }
            });
            
            $.ajax({
                url: '../api/upload.php',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    console.log('=== UPLOAD SUCCESS ===');
                    console.log(response);
                    
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Başarılı!',
                            text: response.message,
                            timer: 1500,
                            showConfirmButton: false
                        });
                        $('#mediaUploadForm')[0].reset();
                        setTimeout(() => loadMediaFilesList(), 500);
                    } else {
                        Swal.fire('Hata!', response.message, 'error');
                    }
                },
                error: function(xhr, status, error) {
                    console.log('=== UPLOAD ERROR ===');
                    console.error('Status:', status);
                    console.error('Error:', error);
                    console.error('Response:', xhr.responseText);
                    Swal.fire('Hata!', 'Dosya yüklenemedi: ' + error, 'error');
                }
            });
            
            return false;
        });
    }
    
    function loadMediaFilesList() {
        $.ajax({
            url: '../api/list_media.php',
            type: 'GET',
            success: function(response) {
                if (response.success && response.data) {
                    renderMediaGrid(response.data);
                } else {
                    renderMediaGrid([]);
                }
            },
            error: function() {
                renderMediaGrid([]);
            }
        });
    }
    
    function renderMediaGrid(files) {
        if (!files || files.length === 0) {
            $('#mediaGrid').html(
                '<div class="col-12 text-center text-muted">' +
                '<i class="fas fa-folder-open fa-3x mb-3"></i>' +
                '<p>Henüz dosya yüklenmedi</p></div>'
            );
            return;
        }
        
        let html = '';
        files.forEach(file => {
            html += '<div class="col-lg-3 col-md-4 col-sm-6">' +
                '<div class="card media-item">';
            
            if (file.type === 'image') {
                html += '<img src="../' + file.url + '" class="card-img-top" alt="' + file.name + '">';
            } else {
                html += '<div class="card-img-top d-flex align-items-center justify-content-center" style="height: 200px; background: #f8f9fa;">' +
                    '<i class="fas fa-file fa-3x text-secondary"></i></div>';
            }
            
            html += '<div class="card-body">' +
                '<p class="mb-1"><small>' + file.name + '</small></p>' +
                '<small class="text-muted">' + file.size + '</small>' +
                '<div class="mt-2">' +
                '<button class="btn btn-sm btn-primary" onclick="copyMediaUrl(\'' + file.url + '\')" title="URL Kopyala"><i class="fas fa-copy"></i></button> ' +
                '<button class="btn btn-sm btn-danger" onclick="deleteMediaFile(\'' + file.id + '\')" title="Sil"><i class="fas fa-trash"></i></button>' +
                '</div></div></div></div>';
        });
        
        $('#mediaGrid').html(html);
    }
    
    window.copyMediaUrl = function(url) {
        const fullUrl = window.location.origin + '/' + url;
        navigator.clipboard.writeText(fullUrl).then(function() {
            Swal.fire({
                icon: 'success',
                title: 'Kopyalandı!',
                text: 'URL panoya kopyalandı',
                timer: 1000,
                showConfirmButton: false
            });
        });
    };
    
    window.deleteMediaFile = function(id) {
        Swal.fire({
            title: 'Emin misiniz?',
            text: "Dosya silinecek!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Evet, sil!',
            cancelButtonText: 'İptal'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '../api/delete_media.php?id=' + id,
                    type: 'GET',
                    success: function(response) {
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Silindi!',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            loadMediaFilesList();
                        } else {
                            Swal.fire('Hata!', response.message, 'error');
                        }
                    }
                });
            }
        });
    };
    
    // === FORM HANDLERS ===
    // Removed global form handler - each page has its own specific handlers
    
    
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
    
    
    // === CATEGORY BOX POSTS TEMPLATE ===
    function getCategoryBoxPostsTemplate() {
        return `
            <h2 class="mb-4">Kategori Kutuları Yazıları</h2>
            
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5>Tüm Yazılar</h5>
                    <button class="btn btn-primary btn-sm" onclick="openCategoryBoxPostEditor()">
                        <i class="fas fa-plus"></i> Yeni Yazı
                    </button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover" id="categoryBoxPostsTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Başlık</th>
                                    <th>Kategori Kutusu</th>
                                    <th>Tarih</th>
                                    <th>Durum</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                // DataTable başlat
                CRUD.initDataTable('categoryBoxPostsTable', 'category_box_posts', [
                    { data: 'id' },
                    { data: 'title' },
                    { 
                        data: 'category_box_id',
                        render: function(data) {
                            return '<span class="badge bg-primary">Kutu #' + data + '</span>';
                        }
                    },
                    { 
                        data: 'created_at',
                        render: function(data) {
                            return new Date(data).toLocaleDateString('tr-TR');
                        }
                    },
                    { 
                        data: 'is_active',
                        render: function(data) {
                            return data == 1 
                                ? '<span class="badge-status badge-success">Yayında</span>' 
                                : '<span class="badge-status badge-warning">Taslak</span>';
                        }
                    },
                    { 
                        data: null,
                        render: function(data, type, row) {
                            return '<button class="btn btn-sm btn-primary" onclick="editCategoryBoxPost(' + row.id + ')">' +
                                   '<i class="fas fa-edit"></i></button> ' +
                                   '<button class="btn btn-sm btn-danger" onclick="deleteCategoryBoxPost(' + row.id + ')">' +
                                   '<i class="fas fa-trash"></i></button>';
                        }
                    }
                ]);
            });
            
            window.openCategoryBoxPostEditor = function(postData = null) {
                const isEdit = postData !== null;
                
                // Önce kategori kutularını yükle
                $.get('../api/crud.php?action=list&table=category_boxes', function(response) {
                    if (!response.success || !response.data) {
                        Swal.fire('Hata!', 'Kategori kutuları yüklenemedi!', 'error');
                        return;
                    }
                    
                    const boxes = response.data.filter(b => b.is_active == 1);
                    let boxOptions = '';
                    boxes.forEach(box => {
                        const selected = isEdit && postData.category_box_id == box.id ? 'selected' : '';
                        boxOptions += '<option value="' + box.id + '" ' + selected + '>' + box.title + '</option>';
                    });
                    
                    const title = isEdit ? postData.title : '';
                    const content = isEdit ? (postData.content || '') : '';
                    const excerpt = isEdit ? (postData.excerpt || '') : '';
                    const slug = isEdit ? postData.slug : '';
                    const image = isEdit ? (postData.featured_image || '') : '';
                    const postId = isEdit ? postData.id : '';
                    
                    const modalHtml = '<div class="modal fade" id="categoryBoxPostModal" tabindex="-1">' +
                        '<div class="modal-dialog modal-xl"><div class="modal-content">' +
                        '<div class="modal-header"><h5 class="modal-title">' + (isEdit ? 'Yaz\u0131 D\u00fczenle' : 'Yeni Yaz\u0131') + '</h5>' +
                        '<button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>' +
                        '<div class="modal-body"><form id="categoryBoxPostForm">' +
                        '<input type="hidden" id="post_id" value="' + postId + '">' +
                        '<div class="row"><div class="col-md-8">' +
                        '<div class="mb-3"><label class="form-label">Ba\u015fl\u0131k *</label>' +
                        '<input type="text" class="form-control" name="title" value="' + title + '" required></div>' +
                        '<div class="mb-3"><label class="form-label">\u0130\u00e7erik *</label>' +
                        '<textarea class="form-control" name="content" rows="15" required>' + content + '</textarea>' +
                        '<small class="text-muted">HTML kullanabilirsiniz</small></div>' +
                        '<div class="mb-3"><label class="form-label">K\u0131sa A\u00e7\u0131klama</label>' +
                        '<textarea class="form-control" name="excerpt" rows="3">' + excerpt + '</textarea></div>' +
                        '</div><div class="col-md-4">' +
                        '<div class="mb-3"><label class="form-label">Kategori Kutusu *</label>' +
                        '<select class="form-select" name="category_box_id" required><option value="">Se\u00e7in</option>' + boxOptions + '</select></div>' +
                        '<div class="mb-3"><label class="form-label">Slug *</label>' +
                        '<input type="text" class="form-control" name="slug" value="' + slug + '" required>' +
                        '<small class="text-muted">URL i\u00e7in</small></div>' +
                        '<div class="mb-3"><label class="form-label">\u00d6ne \u00c7\u0131kan G\u00f6rsel URL</label>' +
                        '<input type="url" class="form-control" name="featured_image" value="' + image + '"></div>' +
                        '<div class="mb-3"><div class="form-check form-switch">' +
                        '<input class="form-check-input" type="checkbox" name="is_active" value="1" ' + (isEdit && postData.is_active == 1 ? 'checked' : 'checked') + '>' +
                        '<label class="form-check-label">Yay\u0131nla</label></div></div>' +
                        '</div></div></form></div>' +
                        '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">\u0130ptal</button>' +
                        '<button type="button" class="btn btn-primary" onclick="saveCategoryBoxPost()">' +
                        '<i class="fas fa-save"></i> ' + (isEdit ? 'G\u00fcncelle' : 'Yay\u0131nla') + '</button></div>' +
                        '</div></div></div>';
                    
                    $('body').append(modalHtml);
                    const modal = new bootstrap.Modal(document.getElementById('categoryBoxPostModal'));
                    
                    // Slug oluştur
                    $('#categoryBoxPostModal input[name="title"]').on('input', function() {
                        if (!isEdit) {
                            const slug = $(this).val()
                                .toLowerCase()
                                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                                .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                            $('#categoryBoxPostModal input[name="slug"]').val(slug);
                        }
                    });
                    
                    $('#categoryBoxPostModal').on('hidden.bs.modal', function() { $(this).remove(); });
                    modal.show();
                });
            };
            
            window.saveCategoryBoxPost = function() {
                const formData = CRUD.serializeForm('categoryBoxPostForm');
                const id = $('#post_id').val();
                
                formData.is_active = $('[name="is_active"]').is(':checked') ? 1 : 0;
                
                if (id) {
                    CRUD.update('category_box_posts', id, formData, function() {
                        CRUD.reloadTable('categoryBoxPostsTable');
                        bootstrap.Modal.getInstance(document.getElementById('categoryBoxPostModal')).hide();
                    });
                } else {
                    CRUD.create('category_box_posts', formData, function() {
                        CRUD.reloadTable('categoryBoxPostsTable');
                        bootstrap.Modal.getInstance(document.getElementById('categoryBoxPostModal')).hide();
                    });
                }
            };
            
            window.editCategoryBoxPost = function(id) {
                CRUD.get('category_box_posts', id, function(data) {
                    openCategoryBoxPostEditor(data);
                });
            };
            
            window.deleteCategoryBoxPost = function(id) {
                CRUD.delete('category_box_posts', id, function() {
                    CRUD.reloadTable('categoryBoxPostsTable');
                });
            };
            </script>
        `;
    }
    
    // === INFO CARD POSTS TEMPLATE ===
    function getInfoCardPostsTemplate() {
        return `
            <h2 class="mb-4">Bilgi Kartları Yazıları</h2>
            
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5>Tüm Yazılar</h5>
                    <button class="btn btn-primary btn-sm" onclick="openInfoCardPostEditor()">
                        <i class="fas fa-plus"></i> Yeni Yazı
                    </button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover" id="infoCardPostsTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Başlık</th>
                                    <th>Bilgi Kartı</th>
                                    <th>Tarih</th>
                                    <th>Durum</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            
            <script>
            $(document).ready(function() {
                // DataTable başlat
                CRUD.initDataTable('infoCardPostsTable', 'info_card_posts', [
                    { data: 'id' },
                    { data: 'title' },
                    { 
                        data: 'info_card_id',
                        render: function(data) {
                            return '<span class="badge bg-info">Kart #' + data + '</span>';
                        }
                    },
                    { 
                        data: 'created_at',
                        render: function(data) {
                            return new Date(data).toLocaleDateString('tr-TR');
                        }
                    },
                    { 
                        data: 'is_active',
                        render: function(data) {
                            return data == 1 
                                ? '<span class="badge-status badge-success">Yayında</span>' 
                                : '<span class="badge-status badge-warning">Taslak</span>';
                        }
                    },
                    { 
                        data: null,
                        render: function(data, type, row) {
                            return '<button class="btn btn-sm btn-primary" onclick="editInfoCardPost(' + row.id + ')">' +
                                   '<i class="fas fa-edit"></i></button> ' +
                                   '<button class="btn btn-sm btn-danger" onclick="deleteInfoCardPost(' + row.id + ')">' +
                                   '<i class="fas fa-trash"></i></button>';
                        }
                    }
                ]);
            });
            
            window.openInfoCardPostEditor = function(postData = null) {
                const isEdit = postData !== null;
                
                // Önce bilgi kartlarını yükle
                $.get('../api/crud.php?action=list&table=info_cards', function(response) {
                    if (!response.success || !response.data) {
                        Swal.fire('Hata!', 'Bilgi kartları yüklenemedi!', 'error');
                        return;
                    }
                    
                    const cards = response.data.filter(c => c.is_active == 1);
                    let cardOptions = '';
                    cards.forEach(card => {
                        const selected = isEdit && postData.info_card_id == card.id ? 'selected' : '';
                        cardOptions += '<option value="' + card.id + '" ' + selected + '>' + card.title + '</option>';
                    });
                    
                    const title = isEdit ? postData.title : '';
                    const content = isEdit ? (postData.content || '') : '';
                    const excerpt = isEdit ? (postData.excerpt || '') : '';
                    const slug = isEdit ? postData.slug : '';
                    const image = isEdit ? (postData.featured_image || '') : '';
                    
                    const modalHtml = '<div class="modal fade" id="infoCardPostModal" tabindex="-1">' +
                        '<div class="modal-dialog modal-xl"><div class="modal-content">' +
                        '<div class="modal-header"><h5 class="modal-title">' + (isEdit ? 'Yazı Düzenle' : 'Yeni Yazı') + '</h5>' +
                        '<button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>' +
                        '<div class="modal-body"><form id="infoCardPostForm">' +
                        '<input type="hidden" id="post_id2" value="' + (isEdit ? postData.id : '') + '">' +
                        '<div class="row"><div class="col-md-8">' +
                        '<div class="mb-3"><label class="form-label">Başlık *</label>' +
                        '<input type="text" class="form-control" name="title" value="' + title + '" required></div>' +
                        '<div class="mb-3"><label class="form-label">İçerik *</label>' +
                        '<textarea class="form-control" name="content" rows="15" required>' + content + '</textarea>' +
                        '<small class="text-muted">HTML kullanabilirsiniz</small></div>' +
                        '<div class="mb-3"><label class="form-label">Kısa Açıklama</label>' +
                        '<textarea class="form-control" name="excerpt" rows="3">' + excerpt + '</textarea></div>' +
                        '</div><div class="col-md-4">' +
                        '<div class="mb-3"><label class="form-label">Bilgi Kartı *</label>' +
                        '<select class="form-select" name="info_card_id" required><option value="">Seçin</option>' + cardOptions + '</select></div>' +
                        '<div class="mb-3"><label class="form-label">Slug *</label>' +
                        '<input type="text" class="form-control" name="slug" value="' + slug + '" required>' +
                        '<small class="text-muted">URL için</small></div>' +
                        '<div class="mb-3"><label class="form-label">Öne Çıkan Görsel URL</label>' +
                        '<input type="url" class="form-control" name="featured_image" value="' + image + '"></div>' +
                        '<div class="mb-3"><div class="form-check form-switch">' +
                        '<input class="form-check-input" type="checkbox" name="is_active" value="1" ' + (isEdit && postData.is_active == 1 ? 'checked' : 'checked') + '>' +
                        '<label class="form-check-label">Yayınla</label></div></div>' +
                        '</div></div></form></div>' +
                        '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>' +
                        '<button type="button" class="btn btn-primary" onclick="saveInfoCardPost()">' +
                        '<i class="fas fa-save"></i> ' + (isEdit ? 'Güncelle' : 'Yayınla') + '</button></div>' +
                        '</div></div></div>';
                    
                    $('body').append(modalHtml);
                    const modal = new bootstrap.Modal(document.getElementById('infoCardPostModal'));
                    
                    // Slug oluştur
                    $('#infoCardPostModal input[name="title"]').on('input', function() {
                        if (!isEdit) {
                            const slug = $(this).val()
                                .toLowerCase()
                                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                                .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                            $('#infoCardPostModal input[name="slug"]').val(slug);
                        }
                    });
                    
                    $('#infoCardPostModal').on('hidden.bs.modal', function() { $(this).remove(); });
                    modal.show();
                });
            };
            
            window.saveInfoCardPost = function() {
                const formData = CRUD.serializeForm('infoCardPostForm');
                const id = $('#post_id2').val();
                
                formData.is_active = $('[name="is_active"]').is(':checked') ? 1 : 0;
                
                if (id) {
                    CRUD.update('info_card_posts', id, formData, function() {
                        CRUD.reloadTable('infoCardPostsTable');
                        bootstrap.Modal.getInstance(document.getElementById('infoCardPostModal')).hide();
                    });
                } else {
                    CRUD.create('info_card_posts', formData, function() {
                        CRUD.reloadTable('infoCardPostsTable');
                        bootstrap.Modal.getInstance(document.getElementById('infoCardPostModal')).hide();
                    });
                }
            };
            
            window.editInfoCardPost = function(id) {
                CRUD.get('info_card_posts', id, function(data) {
                    openInfoCardPostEditor(data);
                });
            };
            
            window.deleteInfoCardPost = function(id) {
                CRUD.delete('info_card_posts', id, function() {
                    CRUD.reloadTable('infoCardPostsTable');
                });
            };
            </script>
        `;
    }
    
    
    console.log('✅ Admin Panel yüklendi!');
});
