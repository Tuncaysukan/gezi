// ========================================
// Pars Gezi Teması - Ana JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    
    // === THEME TOGGLE (Dark/Light Mode) ===
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeLogo = document.getElementById('themeLogo');
    let HEADER_LOGO = { dark: null, light: null };
    let HEADER_FAVICON = null;

    function applyFavicon(href) {
        try {
            if (!href) return;
            let link = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'icon');
                document.head.appendChild(link);
            }
            link.setAttribute('href', href);
        } catch (e) { console.warn('applyFavicon error', e); }
    }
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        document.cookie = `theme=${theme}; path=/; max-age=31536000`;
        
        // Icon / Logo güncelle
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            if (themeLogo) {
                themeLogo.src = (HEADER_LOGO.light || 'assets/img/logo-light.svg');
            }
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            if (themeLogo) {
                themeLogo.src = (HEADER_LOGO.dark || 'assets/img/logo-dark.svg');
            }
        }
    }

    // === LOAD CATEGORIES (Header Menu) ===
    function loadCategoriesMenu() {
        const ul = document.getElementById('categoriesMenu');
        if (!ul) return;
        fetch('api/crud.php?action=list&table=categories')
            .then(r => r.json())
            .then(res => {
                if (!(res.success && Array.isArray(res.data))) return;
                const active = res.data.filter(c => Number(c.is_active) === 1).sort((a,b)=>Number(a.order||0)-Number(b.order||0));
                ul.innerHTML = active.map(c => `
                    <li class="sub-menu-item">
                        <a href="#category/${c.id}" class="menu-link-text link">${escapeHtml(c.name)}</a>
                    </li>
                `).join('');
            })
            .catch(err => console.error('Kategoriler (menü) yüklenemedi:', err));
    }

    // === LOAD CATEGORIES (Sidebar Widget) ===
    function loadCategoriesWidget() {
        const wrap = document.getElementById('categoriesWidget');
        if (!wrap) return;
        fetch('api/crud.php?action=list&table=categories')
            .then(r => r.json())
            .then(res => {
                if (!(res.success && Array.isArray(res.data))) return;
                const active = res.data.filter(c => Number(c.is_active) === 1);
                wrap.innerHTML = active.map(c => `
                    <div class="category-item">
                        <a href="#category/${c.id}">
                            <i class="fa-solid fa-folder"></i> ${escapeHtml(c.name)}
                        </a>
                    </div>
                `).join('');
            })
            .catch(err => console.error('Kategoriler (widget) yüklenemedi:', err));
    }

// === LOAD FEATURED + RECENT POSTS ===
function loadFeaturedAndRecentPosts() {
    fetch('api/crud.php?action=list&table=posts')
        .then(r => r.json())
        .then(res => {
            if (!(res.success && Array.isArray(res.data))) return;
            const active = res.data.filter(p => Number(p.is_active) === 1);
            // Featured
            const featured = active.find(p => Number(p.is_featured) === 1) || active[0];
            if (featured) {
                const imgEl = document.querySelector('.featured-post-image img');
                const titleEl = document.querySelector('.featured-post-content h2');
                const excerptEl = document.querySelector('.featured-post-content p');
                if (imgEl && featured.featured_image) imgEl.src = featured.featured_image;
                if (titleEl) titleEl.textContent = featured.title || 'Gönderi';
                if (excerptEl) excerptEl.textContent = featured.excerpt || '';
                // Başlığa tıklama ile detay yükle
                const container = document.querySelector('.featured-main-post');
                if (container) {
                    container.addEventListener('click', function(){
                        if (featured.slug) {
                            location.hash = '#post/' + encodeURIComponent(featured.slug);
                        } else if (typeof loadPostDetail === 'function') {
                            loadPostDetail(featured.id, 'posts');
                        }
                    });
                }
            }
            // Recent posts widget
            const recentWrap = document.getElementById('recentPostsWidget');
            if (recentWrap) {
                const sorted = active.slice().sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
                recentWrap.innerHTML = sorted.slice(0,6).map(p => `
                    <article class="blog-list-item">
                        <a href="${p.slug ? ('#post/' + encodeURIComponent(p.slug)) : '#'}" class="d-flex align-items-start gap-3 text-decoration-none">
                            ${p.featured_image ? `<img src="${p.featured_image}" alt="${escapeHtml(p.title||'Gönderi')}" loading="lazy" style="width:90px; height:70px; object-fit:cover;">` : ''}
                            <div class="blog-list-content">
                                <h6 class="mb-1">${escapeHtml(p.title||'Gönderi')}</h6>
                                <div class="blog-list-meta">
                                    <span><i class="fa-regular fa-eye"></i> ${p.view_count||0}</span>
                                    <span><i class="fa-regular fa-clock"></i> ${new Date(p.created_at).toLocaleDateString('tr-TR')}</span>
                                </div>
                            </div>
                        </a>
                    </article>
                `).join('');
            }
        })
        .catch(err => console.error('Gönderiler yüklenemedi:', err));
}

// === LOAD POSTS BY CATEGORY INTO CONTENT AREA ===
function loadPostsByCategory(categoryId) {
    fetch('api/crud.php?action=list&table=posts')
        .then(r=>r.json())
        .then(res=>{
            if (!(res.success && Array.isArray(res.data))) return;
            const posts = res.data.filter(p => Number(p.is_active)===1 && String(p.category_id)===String(categoryId));
            displayPostsInContentArea(posts, 'Kategori Gönderileri');
        })
        .catch(err=>console.error('Kategori gönderileri yüklenemedi:', err));
}

// === LOAD DETAIL BY SLUG ===
function loadPostDetailBySlug(slug) {
    fetch('api/crud.php?action=list&table=posts')
        .then(r=>r.json())
        .then(res=>{
            if (!(res.success && Array.isArray(res.data))) return;
            const post = res.data.find(p => (p.slug||'').toLowerCase() === String(slug).toLowerCase());
            if (!post) {
                const area = document.getElementById('dynamicContentArea');
                const content = document.getElementById('postContent');
                if (area && content) {
                    area.style.display = 'block';
                    content.innerHTML = `<div class="alert alert-warning">İçerik bulunamadı.</div>`;
                }
                return;
            }
            if (typeof loadPostDetail === 'function') {
                loadPostDetail(post.id, 'posts');
                return;
            }
            // Basit render (fallback)
            const content = document.getElementById('postContent');
            if (content) {
                content.innerHTML = `
                    <article class="post-detail">
                        ${post.featured_image ? `<img class="img-fluid rounded mb-3" src="${post.featured_image}" alt="${escapeHtml(post.title||'')}">` : ''}
                        <h2>${escapeHtml(post.title||'')}</h2>
                        <div class="text-muted mb-2">${new Date(post.created_at).toLocaleDateString('tr-TR')}</div>
                        <div class="post-body">${post.content || ''}</div>
                    </article>`;
                const area = document.getElementById('dynamicContentArea');
                if (area) area.style.display = 'block';
            }
        });
}

// === LOAD SITE SETTINGS ===
function loadSiteSettings() {
    fetch('api/crud.php?action=list&table=settings')
        .then(r => r.json())
        .then(res => {
            if (!(res.success && Array.isArray(res.data))) return;
            const map = {};
            res.data.forEach(s => { map[s.setting_key] = s.setting_value; });
            // Genel
            if (map.site_general) {
                try {
                    const g = JSON.parse(map.site_general);
                    if (g.site_title) { document.title = g.site_title; }
                    const metaDesc = document.querySelector('meta[name="description"]');
                    if (metaDesc && g.site_description) metaDesc.setAttribute('content', g.site_description);
                    if (g.site_language) {
                        document.documentElement.lang = g.site_language;
                        applyI18n(g.site_language);
                    } else {
                        applyI18n(document.documentElement.lang || 'tr');
                    }
                } catch(e) { console.warn('site_general parse', e); }
            }
            // Logo
            if (map.header_logo) {
                try {
                    const h = JSON.parse(map.header_logo);
                    const logoEl = document.getElementById('themeLogo');
                    HEADER_LOGO.dark = h.logo_dark || HEADER_LOGO.dark;
                    HEADER_LOGO.light = h.logo_light || HEADER_LOGO.light;
                    if (h.favicon) { HEADER_FAVICON = h.favicon; applyFavicon(HEADER_FAVICON); }
                    if (logoEl) {
                        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                        logoEl.src = currentTheme === 'dark'
                            ? (HEADER_LOGO.light || 'assets/img/logo-light.svg')
                            : (HEADER_LOGO.dark || 'assets/img/logo-dark.svg');
                    }
                } catch(e) { console.warn('header_logo parse', e); }
            }
            // Sosyal
            if (map.header_social) {
                try {
                    const s = JSON.parse(map.header_social);
                    const twitter = document.querySelector('.nav-icon a[aria-label="Twitter"], .social-buttons .twitter');
                    if (twitter && s.twitter) twitter.href = s.twitter;
                    const facebook = document.querySelector('.nav-icon a[aria-label="Facebook"], .social-buttons .facebook');
                    if (facebook && s.facebook) facebook.href = s.facebook;
                    const instagram = document.querySelector('.nav-icon a[aria-label="Instagram"], .social-buttons .instagram');
                    if (instagram && s.instagram) instagram.href = s.instagram;
                } catch(e) { console.warn('header_social parse', e); }
            }
            // Header buton
            const headerBtnLi = document.querySelector('.header-ek-buton');
            if (map.header_button) {
                try {
                    const b = JSON.parse(map.header_button);
                    if (headerBtnLi) {
                        const a = headerBtnLi.querySelector('a');
                        if (a && b.text) a.innerHTML = '<i class="fa-solid fa-layer-group"></i> ' + escapeHtml(b.text);
                        if (a && b.url) a.href = b.url;
                        const show = String(b.is_active) === '1';
                        headerBtnLi.style.display = show ? '' : 'none';
                    }
                } catch(e) {
                    if (headerBtnLi) headerBtnLi.style.display = 'none';
                }
            } else {
                if (headerBtnLi) headerBtnLi.style.display = 'none';
            }

            // Header Menü (menu_items) - Kategoriler dropdown HER ZAMAN kalsın
            if (map.menu_items) {
                try {
                    const items = JSON.parse(map.menu_items) || [];
                    const ul = document.getElementById('menu-header');
                    if (ul && Array.isArray(items)) {
                        const activeItems = items.filter(it => Number(it.is_active) === 1)
                          .sort((a,b)=>Number(a.order||0)-Number(b.order||0));

                        const categoriesDropdown = `
                            <li class="menu-item position-relative">
                                <a href="#" class="item-link" data-i18n="menu.categories">Kategoriler <i class="fa-solid fa-angle-down"></i></a>
                                <div class="sub-menu">
                                    <ul class="menu-list" id="categoriesMenu">
                                        <li class="sub-menu-item"><a href="#" class="menu-link-text link">Yükleniyor...</a></li>
                                    </ul>
                                </div>
                            </li>`;

                        const itemsHtml = activeItems.map(it => {
                            const title = escapeHtml(it.title || '');
                            const url = (it.url || '#').trim();
                            return `<li class="menu-item"><a href="${url}" class="item-link">${title}</a></li>`;
                        }).join('');

                        // Kategoriler dropdown'ını başa ekleyerek menüyü yaz
                        ul.innerHTML = [
                            itemsHtml,
                            categoriesDropdown
                        ].join('');
                    }
                } catch(e) { console.warn('menu_items parse', e); }
            }

            // Footer - Hakkımızda
            if (map.footer_about) {
                try {
                    const f = JSON.parse(map.footer_about);
                    if (String(f.is_active) === '1') {
                        const tEl = document.getElementById('footerAboutTitle');
                        const dEl = document.getElementById('footerAboutText');
                        if (tEl && f.title) tEl.textContent = f.title;
                        if (dEl && f.description) dEl.textContent = f.description;
                    } else {
                        const col = document.getElementById('footerAboutCol');
                        if (col) col.style.display = 'none';
                    }
                } catch(e) { console.warn('footer_about parse', e); }
            }
            // Footer - Linkler
            if (map.footer_links) {
                try {
                    const f = JSON.parse(map.footer_links);
                    const col = document.getElementById('footerLinksCol');
                    if (String(f.is_active) !== '1') { if (col) col.style.display = 'none'; }
                    const title = document.getElementById('footerLinksTitle');
                    if (title && f.title) title.textContent = f.title;
                    const list = document.getElementById('footerLinksList');
                    if (list && f.links) {
                        const lines = String(f.links).split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
                        list.innerHTML = lines.map(l=>{
                            const [text, url] = l.split('|');
                            return `<li><a href="${(url||'#').trim()}" class="text-white-50">${escapeHtml((text||'').trim())}</a></li>`;
                        }).join('');
                    }
                } catch(e) { console.warn('footer_links parse', e); }
            }
            // Footer - Sosyal
            if (map.footer_social) {
                try {
                    const f = JSON.parse(map.footer_social);
                    const col = document.getElementById('footerSocialCol');
                    if (String(f.is_active) !== '1') { if (col) col.style.display = 'none'; }
                    const title = document.getElementById('footerSocialTitle');
                    if (title && f.title) title.textContent = f.title;
                    const wrap = document.getElementById('footerSocialLinks');
                    if (wrap) {
                        if (f.facebook) wrap.querySelector('[aria-label="Facebook"]').href = f.facebook;
                        if (f.twitter) wrap.querySelector('[aria-label="Twitter"]').href = f.twitter;
                        if (f.instagram) wrap.querySelector('[aria-label="Instagram"]').href = f.instagram;
                    }
                } catch(e) { console.warn('footer_social parse', e); }
            }
            // Footer - Telif
            if (map.footer_copyright) {
                try {
                    const f = JSON.parse(map.footer_copyright);
                    const el = document.getElementById('footerCopyright');
                    if (el && f.text) el.textContent = f.text;
                } catch(e) { console.warn('footer_copyright parse', e); }
            }
        })
        .catch(err => console.error('Ayarlar yüklenemedi:', err));
}

// === I18N (TR/EN) ===
let I18N_CACHE = null;
function applyI18n(lang) {
    const supported = ['tr','en'];
    const use = supported.includes(lang) ? lang : 'tr';
    fetch(`assets/i18n/${use}.json`).then(r=>r.json()).then(dict => {
        I18N_CACHE = dict || {};
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key && I18N_CACHE[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.setAttribute('placeholder', I18N_CACHE[key]);
                } else {
                    el.textContent = I18N_CACHE[key];
                }
            }
        });
    }).catch(()=>{});
}
    
    
    // Mevcut tema kontrolü
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);
    
    // Theme toggle click
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    
    // === GO TO TOP BUTTON ===
    const goTopBtn = document.getElementById('goTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            goTopBtn.classList.add('show');
        } else {
            goTopBtn.classList.remove('show');
        }
        
        // Progress border animasyonu
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const progressBorder = goTopBtn.querySelector('.border-progress');
        if (progressBorder) {
            progressBorder.style.background = `conic-gradient(white ${scrolled}%, transparent ${scrolled}%)`;
        }
    });
    
    goTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    // === NEWS TICKER ===
    const newsList = document.querySelector('.arse-news');
    if (newsList) {
        // Clone items for infinite scroll
        const newsItems = newsList.innerHTML;
        newsList.innerHTML = newsItems + newsItems;
        
        // Pause on hover
        newsList.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        newsList.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    
    // === STORIES INTERACTION (delegated for dynamic content) ===
    const storiesWrapper = document.querySelector('.stories-wrapper');
    if (storiesWrapper) {
        storiesWrapper.addEventListener('click', function(e) {
            const item = e.target.closest('.story-item');
            if (!item) return;
            // Remove active from all
            storiesWrapper.querySelectorAll('.story-item').forEach(s => s.classList.remove('active'));
            // Add active to clicked
            item.classList.add('active');
            // Remove new badge after viewing
            item.classList.remove('new');
            // Show notification (you can replace with actual story modal)
            const titleEl = item.querySelector('.story-title');
            const title = titleEl ? titleEl.textContent : '';
            console.log('Story clicked:', title);
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'story-ripple';
            item.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }
    
    // Smooth horizontal scroll for stories
    if (storiesWrapper) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        storiesWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - storiesWrapper.offsetLeft;
            scrollLeft = storiesWrapper.scrollLeft;
        });
        
        storiesWrapper.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        storiesWrapper.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        storiesWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - storiesWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            storiesWrapper.scrollLeft = scrollLeft - walk;
        });
    }
    
    
    // === INTERACTIVE SVG EUROPE MAP ===
    const europeMap = document.getElementById('europeMap');
    
    if (europeMap) {
        const countries = europeMap.querySelectorAll('g[data-ulke]');
        
        countries.forEach(country => {
            country.addEventListener('click', function() {
                const countryName = this.getAttribute('data-ulke');
                const capital = this.getAttribute('data-baskent');
                
                // Tüm ülkelerden active class'ı kaldır
                countries.forEach(c => c.classList.remove('active'));
                
                // Tıklanan ülkeye active ekle
                this.classList.add('active');
                
                // Bildirim göster
                showCountryInfo(countryName, capital);
                
                console.log(`Tıklanan ülke: ${countryName}, Başkent: ${capital}`);
            });
            
            // Hover efekti için tooltip
            country.addEventListener('mouseenter', function(e) {
                const countryName = this.getAttribute('data-ulke');
                showTooltip(e, countryName);
            });
            
            country.addEventListener('mouseleave', function() {
                hideTooltip();
            });
            
            country.addEventListener('mousemove', function(e) {
                updateTooltipPosition(e);
            });
        });
    }
    
    // Tooltip fonksiyonları
    let tooltip = null;
    
    function showTooltip(e, text) {
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'map-tooltip';
            tooltip.style.cssText = `
                position: fixed;
                background: rgba(0, 0, 0, 0.85);
                color: white;
                padding: 8px 14px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                pointer-events: none;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                transition: opacity 0.2s ease;
            `;
            document.body.appendChild(tooltip);
        }
        
        tooltip.textContent = text;
        tooltip.style.opacity = '1';
        updateTooltipPosition(e);
    }
    
    function hideTooltip() {
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    }
    
    function updateTooltipPosition(e) {
        if (tooltip) {
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY + 15) + 'px';
        }
    }
    
    function showCountryInfo(country, capital) {
        // Basit bir alert yerine daha güzel bir notification kullanabilirsiniz
        const message = `${country} - Başkent: ${capital}`;
        
        // Geçici bildirim oluştur
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10001;
            font-size: 16px;
            font-weight: 600;
            animation: slideInRight 0.4s ease;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fa-solid fa-location-dot" style="font-size: 24px;"></i>
                <div>
                    <div style="font-size: 18px; margin-bottom: 4px;">${country}</div>
                    <div style="font-size: 14px; opacity: 0.9;">Başkent: ${capital}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 3 saniye sonra kaldır
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }
    
    // Animasyonlar için CSS ekle
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .europe-svg-map g.active path {
            filter: brightness(1.3) saturate(1.5);
            stroke-width: 4 !important;
            stroke: #ffd700 !important;
        }
    `;
    document.head.appendChild(style);
    
    
    // === LEAFLET MAP INTEGRATION ===
    const mapElement = document.getElementById('map');
    let map; // Global scope for resize handler
    
    if (mapElement && typeof L !== 'undefined') {
        // Harita oluştur - Avrupa merkez
        map = L.map('map').setView([50.0, 10.0], 4); // Avrupa merkez koordinatları
        
        // Tile layer ekle
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            minZoom: 3
        }).addTo(map);
        
        // Avrupa ülkeleri ve şehirleri (Popüler destinasyonlar)
        const avrupaUlkeleri = [
            {
                name: 'Fransa',
                city: 'Paris',
                coords: [48.8566, 2.3522],
                description: 'Eyfel Kulesi, Louvre Müzesi',
                flag: '🇫🇷'
            },
            {
                name: 'İtalya',
                city: 'Roma',
                coords: [41.9028, 12.4964],
                description: 'Kolezyum, Vatikan',
                flag: '🇮🇹'
            },
            {
                name: 'İspanya',
                city: 'Barcelona',
                coords: [41.3851, 2.1734],
                description: 'Sagrada Familia, Park Güell',
                flag: '🇪🇸'
            },
            {
                name: 'Almanya',
                city: 'Berlin',
                coords: [52.5200, 13.4050],
                description: 'Brandenburg Kapısı, Berlin Duvarı',
                flag: '🇩🇪'
            },
            {
                name: 'İngiltere',
                city: 'Londra',
                coords: [51.5074, -0.1278],
                description: 'Big Ben, Buckingham Sarayı',
                flag: '🇬🇧'
            },
            {
                name: 'Hollanda',
                city: 'Amsterdam',
                coords: [52.3676, 4.9041],
                description: 'Kanallar, Van Gogh Müzesi',
                flag: '🇳🇱'
            },
            {
                name: 'Yunanistan',
                city: 'Atina',
                coords: [37.9838, 23.7275],
                description: 'Akropolis, Parthenon',
                flag: '🇬🇷'
            },
            {
                name: 'İsviçre',
                city: 'Zürich',
                coords: [47.3769, 8.5417],
                description: 'Alpler, Göller',
                flag: '🇨🇭'
            },
            {
                name: 'Avusturya',
                city: 'Viyana',
                coords: [48.2082, 16.3738],
                description: 'Schönbrunn Sarayı, Opera',
                flag: '🇦🇹'
            },
            {
                name: 'Çek Cumhuriyeti',
                city: 'Prag',
                coords: [50.0755, 14.4378],
                description: 'Charles Köprüsü, Prag Kalesi',
                flag: '🇨🇿'
            },
            {
                name: 'Portekiz',
                city: 'Lizbon',
                coords: [38.7223, -9.1393],
                description: 'Belém Kulesi, Alfama',
                flag: '🇵🇹'
            },
            {
                name: 'Norveç',
                city: 'Oslo',
                coords: [59.9139, 10.7522],
                description: 'Fiyordlar, Kuzey Işıkları',
                flag: '🇳🇴'
            }
        ];
        
        // Custom icon - Bayrak icon'u gibi
        const customIcon = L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        
        // Marker'ları ekle
        avrupaUlkeleri.forEach(function(ulke) {
            const marker = L.marker(ulke.coords, { icon: customIcon }).addTo(map);
            
            const popupContent = `
                <div class="map-popup">
                    <div style="font-size: 24px; margin-bottom: 8px;">${ulke.flag}</div>
                    <h5 style="margin: 0 0 5px 0; color: #4ecdc4; font-weight: 700;">${ulke.city}</h5>
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; font-weight: 600;">${ulke.name}</p>
                    <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5;">${ulke.description}</p>
                    <a href="#" style="color: #ff6b6b; font-weight: 600; text-decoration: none; font-size: 13px;">
                        Detayları Gör →
                    </a>
                </div>
            `;
            
            marker.bindPopup(popupContent, {
                maxWidth: 250,
                className: 'custom-popup'
            });
            
            // Marker hover efekti
            marker.on('mouseover', function() {
                this.openPopup();
            });
        });
        
        // Map style için dark mode desteği
        function updateMapTheme() {
            const theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                // Dark mode için alternatif tile layer
                L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                    maxZoom: 19
                }).addTo(map);
            }
        }
        
        updateMapTheme();
    }
    
    // === MOBILE SUBMENU TOGGLE ===
    (function(){
        const isDesktop = () => window.innerWidth >= 992;
        document.addEventListener('click', function(e){
            const trigger = e.target.closest('.menu-item.position-relative > .item-link');
            if (!trigger) return;
            if (isDesktop()) return; // desktopta hover çalışsın
            e.preventDefault();
            const parent = trigger.closest('.menu-item');
            if (parent) parent.classList.toggle('open');
        });
        window.addEventListener('resize', function(){
            if (isDesktop()) {
                document.querySelectorAll('.menu-item.open').forEach(el => el.classList.remove('open'));
            }
        });
    })();

    
    // ==== INITIAL LOAD CALLS (kept inside same DOMContentLoaded for scope) ====
    try { loadNotifications(); } catch(e) { console.error(e); }
    try { loadStories(); } catch(e) { console.error(e); }
    try { loadSiteSettings(); } catch(e) { console.error(e); }
    try { loadCategoriesMenu(); } catch(e) { console.error(e); }
    try { loadCategoriesWidget(); } catch(e) { console.error(e); }
    try { loadFeaturedAndRecentPosts(); } catch(e) { console.error(e); }

    // Hash route dinleme (#post/<slug>)
    function handleHashRoute() {
        const m = location.hash.match(/^#post\/(.+)$/);
        if (m && m[1]) {
            loadPostDetailBySlug(decodeURIComponent(m[1]));
            return;
        }
        const c = location.hash.match(/^#category\/(\d+)$/);
        if (c && c[1]) {
            loadPostsByCategory(c[1]);
            return;
        }
    }
    window.addEventListener('hashchange', handleHashRoute);
    handleHashRoute();

    // === LAZY LOADING IMAGES ===
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(function(img) {
        img.classList.add('loading');
        imageObserver.observe(img);
    });
    
    
    // === COOKIE CONSENT ===
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(function() {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.classList.remove('show');
        });
    }
    
    
    // === CATEGORY SLIDER NAVIGATION ===
    const categorySlider = document.querySelector('.category-slider');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    
    if (sliderPrev && sliderNext && categorySlider) {
        sliderPrev.addEventListener('click', function() {
            categorySlider.scrollBy({
                left: -150,
                behavior: 'smooth'
            });
        });

        sliderNext.addEventListener('click', function() {
            categorySlider.scrollBy({
                left: 150,
                behavior: 'smooth'
            });
        });
    }
    
    
    // === SEARCH FUNCTIONALITY ===
    const searchModal = document.getElementById('search');
    const searchInput = searchModal ? searchModal.querySelector('input[type="search"]') : null;
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Burada arama fonksiyonu implementasyonu yapılabilir
            console.log('Arama:', searchTerm);
        });
    }
    
    
    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#search' && href !== '#bildirim' && href !== '#mobileMenu') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    
    // === STICKY HEADER ===
    let lastScroll = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    
    // === PERFORMANCE OPTIMIZATION ===
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Resize handler
    const handleResize = debounce(function() {
        // Map resize
        if (map && typeof map.invalidateSize === 'function') {
            map.invalidateSize();
        }
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    
    // === ANALYTICS TRACKING ===
    function trackEvent(category, action, label) {
        // Google Analytics veya başka analytics sistemleri için
        console.log('Event:', category, action, label);
        
        // Örnek: gtag tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    }
    
    // Link click tracking
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            const url = this.href;
            const text = this.textContent.trim();
            trackEvent('Link', 'Click', text);
        });
    });
    
    
    // === NOTIFICATIONS ===
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    
    // === FORM VALIDATION (İletişim formu için hazır) ===
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validasyon
            let isValid = true;
            Object.keys(data).forEach(key => {
                if (!data[key]) {
                    isValid = false;
                    showNotification(`${key} alanı boş bırakılamaz!`, 'error');
                }
            });
            
            if (isValid) {
                // Form gönderimi
                console.log('Form Data:', data);
                showNotification('Form başarıyla gönderildi!', 'success');
                this.reset();
            }
        });
    });
    
    
    // === SEO - STRUCTURED DATA ===
    function addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Pars Gezi",
            "url": window.location.origin,
            "logo": window.location.origin + "/assets/img/logo-dark.png",
            "description": "SEO uyumlu gezi ve seyahat blogu",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "TR"
            }
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
    
    addStructuredData();
    
    
    console.log('🚀 Pars Gezi Teması yüklendi!');
});


// === KEYBOARD SHORTCUTS ===
document.addEventListener('keydown', function(e) {
    // Ctrl + K: Arama aç
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const searchModal = new bootstrap.Modal(document.getElementById('search'));
        searchModal.show();
        setTimeout(() => {
            document.querySelector('#search input').focus();
        }, 300);
    }
    
    // ESC: Modal'ları kapat
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            bootstrap.Modal.getInstance(modal)?.hide();
        });
    }
});


// === SERVICE WORKER (PWA Support - İsteğe bağlı) ===
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker kayıtlı'))
        //     .catch(err => console.log('Service Worker hatası:', err));
    });
}

// === UTIL: Escape HTML ===
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// === LOAD NOTIFICATIONS ===
function loadNotifications() {
    fetch('api/crud.php?action=list&table=notifications')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('notificationsContainer');
            const countEl = document.getElementById('notificationCount');
            if (!container) return;

            if (data.success && Array.isArray(data.data)) {
                const active = data.data.filter(n => Number(n.is_active) === 1);
                if (countEl) countEl.textContent = active.length;

                if (active.length === 0) {
                    container.innerHTML = '<div class="text-muted">Gösterilecek bildirim yok.</div>';
                    return;
                }

                container.innerHTML = active.map(n => `
                    <div class="notification-item mb-3">
                        <p>
                            <strong>${escapeHtml(n.title || 'Bildirim')}:</strong> ${escapeHtml(n.message || '')}
                            ${n.url ? `<a href="${n.url}" class="ms-1">İncele</a>` : ''}
                        </p>
                        <small class="text-muted">${escapeHtml(n.time_text || '')}</small>
                    </div>
                `).join('');
            } else {
                container.innerHTML = '<div class="text-danger">Bildirimler yüklenemedi.</div>';
            }
        })
        .catch(err => {
            const container = document.getElementById('notificationsContainer');
            if (container) container.innerHTML = '<div class="text-danger">Bildirimler yüklenirken hata oluştu.</div>';
            console.error('Bildirim hatası:', err);
        });
}

// === LOAD STORIES ===
function loadStories() {
    const wrapper = document.querySelector('.stories-wrapper');
    if (!wrapper) return;
    fetch('api/crud.php?action=list&table=stories')
        .then(res => res.json())
        .then(data => {
            if (!(data.success && Array.isArray(data.data))) {
                // API başarısız ise placeholderları koru
                return;
            }
            const active = data.data
                .filter(s => Number(s.is_active) === 1)
                .sort((a,b) => Number(a.order||0) - Number(b.order||0));

            if (active.length === 0) {
                // Aktif hikaye yoksa placeholderları koru
                return;
            }

            wrapper.innerHTML = active.map(s => {
                const isNewClass = Number(s.is_new) === 1 ? ' new' : '';
                const img = s.image || 'https://picsum.photos/200/200?blur=3';
                const short = s.short_title || (s.title ? s.title.slice(0,10) + '...' : 'Hikaye');
                const content = `
                    <div class="story-item${isNewClass}" ${s.url ? `data-url="${s.url}"` : ''}>
                        <div class="story-avatar">
                            <img src="${img}" alt="${escapeHtml(s.title || 'Hikaye')}" loading="lazy">
                        </div>
                        <span class="story-title">${escapeHtml(short)}</span>
                    </div>`;
                return content;
            }).join('');
        })
        .catch(err => {
            console.error('Hikayeler yüklenirken hata:', err);
        });
}

// === CATEGORY BOXES AND INFO CARDS LOADING ===
// Removed duplicate DOMContentLoaded block to avoid ReferenceError

function loadCategoryBoxes() {
    fetch('api/crud.php?action=list&table=category_boxes')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data) {
                const container = document.getElementById('categoryBoxesContainer');
                const activeBoxes = data.data.filter(box => box.is_active == 1);
                
                if (activeBoxes.length > 0) {
                    container.innerHTML = activeBoxes.map(box => `
                        <div class="col-lg-3 col-md-6">
                            <div class="category-box-card">
                                <div class="category-box-icon">
                                    <i class="${box.icon || 'fas fa-box'}"></i>
                                </div>
                                <h3 class="category-box-title">${box.title}</h3>
                                <p class="category-box-description">${box.description || ''}</p>
                                <a href="#" class="category-box-link" onclick="loadCategoryBoxPosts(${box.id}); return false;">
                                    Gönderileri Görüntüle <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    `).join('');
                } else {
                    container.innerHTML = '<div class="col-12"><p class="text-center">Henüz kategori kutusu eklenmemiş.</p></div>';
                }
            }
        })
        .catch(error => {
            console.error('Kategori kutuları yüklenirken hata oluştu:', error);
        });
}

function loadInfoCards() {
    fetch('api/crud.php?action=list&table=info_cards')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data) {
                const container = document.getElementById('infoCardsContainer');
                const activeCards = data.data.filter(card => card.is_active == 1);
                
                if (activeCards.length > 0) {
                    container.innerHTML = activeCards.map(card => `
                        <div class="col-lg-4 col-md-6">
                            <div class="info-card">
                                <div class="info-card-header">
                                    <h3 class="info-card-title">${card.title}</h3>
                                </div>
                                <div class="info-card-body">
                                    <p class="info-card-description">${card.description || ''}</p>
                                    <a href="#" class="info-card-link" onclick="loadInfoCardPosts(${card.id}); return false;">
                                        Detayları Gör <i class="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `).join('');
                } else {
                    container.innerHTML = '<div class="col-12"><p class="text-center">Henüz bilgi kartı eklenmemiş.</p></div>';
                }
            }
        })
        .catch(error => {
            console.error('Bilgi kartları yüklenirken hata oluştu:', error);
        });
}

function loadCategoryBoxPosts(categoryBoxId) {
    // Load posts for a specific category box
    fetch(`api/crud.php?action=list&table=category_box_posts`)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data) {
                const posts = data.data.filter(post => 
                    post.category_box_id == categoryBoxId && post.is_active == 1
                );
                
                // Display posts in the main content area
                displayPostsInContentArea(posts, 'Kategori Kutusu Gönderileri');
            }
        })
        .catch(error => {
            console.error('Kategori kutusu gönderileri yüklenirken hata oluştu:', error);
        });
}

function loadInfoCardPosts(infoCardId) {
    // Load posts for a specific info card
    fetch(`api/crud.php?action=list&table=info_card_posts`)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data) {
                const posts = data.data.filter(post => 
                    post.info_card_id == infoCardId && post.is_active == 1
                );
                
                // Display posts in the main content area
                displayPostsInContentArea(posts, 'Bilgi Kartı Gönderileri');
            }
        })
        .catch(error => {
            console.error('Bilgi kartı gönderileri yüklenirken hata oluştu:', error);
        });
}

function displayPostsInContentArea(posts, title) {
    const contentArea = document.getElementById('dynamicContentArea');
    const postsList = document.getElementById('postsList');
    const categoryTitle = document.getElementById('categoryTitle');
    
    // Set title
    categoryTitle.textContent = title;
    
    // Generate posts list
    if (posts.length > 0) {
        postsList.innerHTML = posts.map(post => `
            <article class="blog-list-item" onclick="loadPostDetail(${post.id}, 'custom')">
                <div class="blog-list-content">
                    <h6>${post.title}</h6>
                    <p>${post.excerpt || ''}</p>
                    <div class="blog-list-meta">
                        <span><i class="fa-regular fa-clock"></i> ${new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                        <span><i class="fa-regular fa-eye"></i> ${post.view_count || 0} görüntüleme</span>
                    </div>
                </div>
            </article>
        `).join('');
    } else {
        postsList.innerHTML = '<p>Bu kategori için henüz gönderi eklenmemiş.</p>';
    }
    
    // Show content area
    contentArea.style.display = 'block';
    
    // Scroll to content
    contentArea.scrollIntoView({ behavior: 'smooth' });
}
