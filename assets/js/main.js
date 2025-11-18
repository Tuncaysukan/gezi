// ========================================
// Pars Gezi Teması - Ana JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === THEME TOGGLE (Dark/Light Mode) ===
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeLogo = document.getElementById('themeLogo');
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        document.cookie = `theme=${theme}; path=/; max-age=31536000`;
        
        // Icon değiştir
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            if (themeLogo) {
                themeLogo.src = 'assets/img/logo-light.svg';
            }
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            if (themeLogo) {
                themeLogo.src = 'assets/img/logo-dark.svg';
            }
        }
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
    
    
    // === STORIES INTERACTION ===
    const storyItems = document.querySelectorAll('.story-item');
    
    storyItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active from all
            storyItems.forEach(s => s.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            // Remove new badge after viewing
            this.classList.remove('new');
            
            // Show notification (you can replace with actual story modal)
            const title = this.querySelector('.story-title').textContent;
            console.log('Story clicked:', title);
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'story-ripple';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Smooth horizontal scroll for stories
    const storiesWrapper = document.querySelector('.stories-wrapper');
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
    const europeMap = document.getElementById('svg-avrupa-haritasi');
    
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
