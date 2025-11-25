<?php require_once 'check_session.php'; ?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Pars Gezi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.bootstrap5.min.css">
    <link rel="stylesheet" href="css/admin.css">
    <script src="https://code.jquery.com/jquery-3.7.1.js" ></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
</head>
<body>
    <div class="admin-wrapper">
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <h3>PARS ADMIN</h3>
                <button class="sidebar-toggle" id="sidebarToggle">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            <nav class="sidebar-nav">
                <ul>
                    <li class="nav-item active"><a href="#dashboard" class="nav-link" data-page="dashboard"><i class="fas fa-home"></i><span>Dashboard</span></a></li>
                    <li class="nav-item"><a href="#posts" class="nav-link" data-page="posts"><i class="fas fa-file-alt"></i><span>Gönderiler</span></a></li>
                    <li class="nav-item"><a href="#stories" class="nav-link" data-page="stories"><i class="fas fa-images"></i><span>Hikayeler</span></a></li>
                    <li class="nav-item"><a href="#breaking-news" class="nav-link" data-page="breaking-news"><i class="fas fa-bolt"></i><span>Kayan Haberler</span></a></li>
                    <li class="nav-item"><a href="#featured-post" class="nav-link" data-page="featured-post"><i class="fas fa-star"></i><span>Öne Çıkan Gönderi</span></a></li>
                    <li class="nav-item"><a href="#categories" class="nav-link" data-page="categories"><i class="fas fa-folder"></i><span>Kategoriler</span></a></li>
                    <li class="nav-item"><a href="#category-boxes" class="nav-link" data-page="category-boxes"><i class="fas fa-th-large"></i><span>Kategori Kutuları</span></a></li>
                    <li class="nav-item"><a href="#category-box-posts" class="nav-link" data-page="category-box-posts"><i class="fas fa-file-alt"></i><span>Kategori Kutusu Yazıları</span></a></li>
                    <li class="nav-item"><a href="#info-cards" class="nav-link" data-page="info-cards"><i class="fas fa-info-circle"></i><span>Bilgi Kartları</span></a></li>
                    <li class="nav-item"><a href="#info-card-posts" class="nav-link" data-page="info-card-posts"><i class="fas fa-file-alt"></i><span>Bilgi Kartı Yazıları</span></a></li>
                    <li class="nav-item"><a href="#hashtags" class="nav-link" data-page="hashtags"><i class="fas fa-hashtag"></i><span>Etiketler</span></a></li>
                    <li class="nav-item"><a href="#widgets" class="nav-link" data-page="widgets"><i class="fas fa-puzzle-piece"></i><span>Widgetlar</span></a></li>
                    <li class="nav-item"><a href="#header" class="nav-link" data-page="header"><i class="fas fa-bars"></i><span>Header & Menü</span></a></li>
                    <li class="nav-item"><a href="#footer" class="nav-link" data-page="footer"><i class="fas fa-shoe-prints"></i><span>Footer</span></a></li>
                    <li class="nav-item"><a href="#notifications" class="nav-link" data-page="notifications"><i class="fas fa-bell"></i><span>Bildirimler</span></a></li>
                    <li class="nav-item"><a href="#adsense" class="nav-link" data-page="adsense"><i class="fab fa-google"></i><span>Reklam Alanları</span></a></li>
                    <li class="nav-item"><a href="#media" class="nav-link" data-page="media"><i class="fas fa-images"></i><span>Medya</span></a></li>
                    <li class="nav-item"><a href="#seo" class="nav-link" data-page="seo"><i class="fas fa-search"></i><span>SEO Ayarları</span></a></li>
                    <li class="nav-item"><a href="#settings" class="nav-link" data-page="settings"><i class="fas fa-cog"></i><span>Site Ayarları</span></a></li>
                    <li class="nav-item"><a href="#performance" class="nav-link" data-page="performance"><i class="fas fa-tachometer-alt"></i><span>Performans</span></a></li>
                    <li class="nav-item"><a href="#backup" class="nav-link" data-page="backup"><i class="fas fa-database"></i><span>Yedekleme</span></a></li>
                </ul>
            </nav>
            <div class="sidebar-footer">
                <a href="../index.html" class="btn btn-outline-light btn-sm" target="_blank"><i class="fas fa-external-link-alt"></i> Siteyi Görüntüle</a>
            </div>
        </aside>
        <main class="admin-content">
            <header class="top-bar">
                <div class="top-bar-left">
                    <button class="btn btn-link mobile-toggle" id="mobileToggle"><i class="fas fa-bars"></i></button>
                    <h4 class="page-title">Dashboard</h4>
                </div>
                <div class="top-bar-right">
                    <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown"><i class="fas fa-user-circle"></i> <?php echo $_SESSION['admin_username']; ?></button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#" id="menuProfile"><i class="fas fa-user"></i> Profil</a></li>
                            <li><a class="dropdown-item" href="#" id="menuAccountSettings"><i class="fas fa-cog"></i> Ayarlar</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="../api/logout.php"><i class="fas fa-sign-out-alt"></i> Çıkış Yap</a></li>
                        </ul>
                    </div>
                </div>
            </header>
            <div class="page-content" id="pageContent">
                <div class="content-page active" id="dashboard-page">
                    <h2>Dashboard</h2>
                    <div class="row g-4 mb-4">
                        <div class="col-xl-3 col-md-6">
                            <div class="stat-card"><div class="stat-icon bg-primary"><i class="fas fa-file-alt"></i></div><div class="stat-content"><h3>124</h3><p>Toplam Gönderi</p></div></div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="stat-card"><div class="stat-icon bg-success"><i class="fas fa-eye"></i></div><div class="stat-content"><h3>45.2K</h3><p>Toplam Görüntülenme</p></div></div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="stat-card"><div class="stat-icon bg-warning"><i class="fas fa-images"></i></div><div class="stat-content"><h3>568</h3><p>Medya Dosyası</p></div></div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="stat-card"><div class="stat-icon bg-danger"><i class="fas fa-comments"></i></div><div class="stat-content"><h3>892</h3><p>Yorum</p></div></div>
                        </div>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-8"><div class="card"><div class="card-header"><h5>Ziyaretçi İstatistikleri</h5></div><div class="card-body"><canvas id="visitorChart" height="100"></canvas></div></div></div>
                        <div class="col-lg-4"><div class="card"><div class="card-header"><h5>Popüler Gönderiler</h5></div><div class="card-body"><div class="popular-post"><h6>İstanbul'un Gizli Bahçeleri</h6><small>1,245 görüntülenme</small></div><div class="popular-post"><h6>Kapadokya'da Bir Gün</h6><small>856 görüntülenme</small></div><div class="popular-post"><h6>Antalya Kanyonları</h6><small>723 görüntülenme</small></div></div></div></div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.bootstrap5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        window.ADMIN = {
            id: <?php echo (int)($_SESSION['admin_id'] ?? 0); ?>,
            username: <?php echo json_encode($_SESSION['admin_username'] ?? ''); ?>,
            name: <?php echo json_encode($_SESSION['admin_name'] ?? ''); ?>
        };
    </script>
    <script src="js/admin.crud.js"></script>
    <script src="js/admin.js"></script>
</body>
</html>