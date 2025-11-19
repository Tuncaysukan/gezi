-- Dummy Data for Gezi Blog Site
-- Created: 2025-11-19

-- Kategoriler (Ülkeler)
INSERT INTO `categories` (`name`, `slug`, `description`, `icon`, `color`, `order`, `is_active`) VALUES
('Türkiye', 'turkiye', 'Türkiye\'nin en güzel yerlerini keşfedin', 'fa-solid fa-flag', '#e74c3c', 1, 1),
('Belarus', 'belarus', 'Belarus gezilecek yerler ve kültür', 'fa-solid fa-flag', '#27ae60', 2, 1),
('Almanya', 'almanya', 'Almanya seyahat rehberi', 'fa-solid fa-flag', '#3498db', 3, 1),
('Fransa', 'fransa', 'Paris ve Fransa\'nın en romantik şehirleri', 'fa-solid fa-flag', '#9b59b6', 4, 1),
('İtalya', 'italya', 'İtalya\'nın tarihi ve kültürel zenginlikleri', 'fa-solid fa-flag', '#1abc9c', 5, 1),
('İspanya', 'ispanya', 'İspanya gezilecek yerler', 'fa-solid fa-flag', '#f39c12', 6, 1),
('Yunanistan', 'yunanistan', 'Yunan adaları ve antik kentler', 'fa-solid fa-flag', '#2980b9', 7, 1),
('Hollanda', 'hollanda', 'Hollanda lale bahçeleri ve Amsterdam', 'fa-solid fa-flag', '#e67e22', 8, 1),
('Avusturya', 'avusturya', 'Avusturya Alpler ve Viyana', 'fa-solid fa-flag', '#c0392b', 9, 1),
('İsviçre', 'isvicre', 'İsviçre Alpler ve doğa', 'fa-solid fa-flag', '#16a085', 10, 1);

-- Gönderiler (Her kategori için 2-3 gönderi)
INSERT INTO `posts` (`title`, `slug`, `content`, `excerpt`, `category_id`, `featured_image`, `is_active`, `is_featured`, `created_at`) VALUES
-- Türkiye Gönderileri
('Kapadokya\'nın Peri Bacaları ve Balon Turu', 'kapadokya-peri-bacalari', '<p>Kapadokya, Türkiye\'nin en büyüleyici destinasyonlarından biri. Peri bacaları ve sıcak hava balonlarıyla ünlü bu bölge, her yıl milyonlarca turist ağırlıyor.</p><p>Güneşin doğuşunda yapılan balon turları, hayatınızda unutamayacağınız anılar bırakacak. Göreme Açık Hava Müzesi, Uçhisar Kalesi ve yeraltı şehirleri mutlaka görülmesi gereken yerler arasında.</p><p>Kapadokya\'da konaklama için mağara oteller tercih edebilirsiniz. Bölgeye özgü testi kebabı ve Kapadokya şarabını tatmayı unutmayın!</p>', 'Kapadokya\'nın büyülü peri bacaları ve balon turları rehberi', 1, 'https://picsum.photos/800/500?random=1', 1, 1, NOW()),
('Pamukkale Beyaz Cennet Travertenleri', 'pamukkale-travertenler', '<p>Pamukkale, Denizli\'nin incisi ve UNESCO Dünya Mirası Listesi\'nde yer alan eşsiz bir doğa harikası. Beyaz traverten havuzları ve Hierapolis antik kenti ile ünlü.</p><p>Termal sular sayesinde oluşan travertenler, yüzyıllardır insanları cezbediyor. Antik havuzda yüzmek benzersiz bir deneyim sunuyor.</p><p>Gün batımında travertenlerin görüntüsü büyüleyici. Fotoğraf tutkunları için harika fırsatlar sunuyor.</p>', 'Pamukkale\'nin beyaz travertenleri ve termal suları', 1, 'https://picsum.photos/800/500?random=2', 1, 0, DATE_SUB(NOW(), INTERVAL 2 DAY)),
('İstanbul Boğazı\'nda Gün Batımı', 'istanbul-bogazinda-gun-batimi', '<p>İstanbul Boğazı, dünyanın en güzel boğazlarından biri. Avrupa ve Asya\'yı birbirinden ayıran bu doğal güzellik, tarihi ve modern yapıları bir araya getiriyor.</p><p>Ortaköy\'de kahve içerken Boğaz manzarası, Çamlıca Tepesi\'nden panoramik görüntü ve Galata Kulesi\'nden şehir manzarası İstanbul\'un vazgeçilmezleri.</p><p>Boğaz turu yaparak Dolmabahçe Sarayı, Beylerbeyi Sarayı ve Rumeli Hisarı\'nı denizden görebilirsiniz.</p>', 'İstanbul Boğazı\'nın eşsiz güzellikleri', 1, 'https://picsum.photos/800/500?random=3', 1, 0, DATE_SUB(NOW(), INTERVAL 5 DAY)),

-- Belarus Gönderileri
('Minsk Modern Bir Başkent', 'minsk-modern-baskent', '<p>Belarus\'un başkenti Minsk, Sovyet mimarisinin en güzel örneklerini barındırıyor. Bağımsızlık Meydanı, Avrupa\'nın en büyük meydanlarından biri.</p><p>Troitskoye Vorstadt bölgesi, renkli evleri ve kafe kültürüyle şehrin en canlı yeri. KGB Binası ve Ulusal Sanat Müzesi mutlaka görülmeli.</p><p>Yerel mutfağından draniki (patates pankeki) ve machanka (domuz eti güveç) denemeyi unutmayın!</p>', 'Minsk\'in modern mimarisi ve tarihi dokusu', 2, 'https://picsum.photos/800/500?random=4', 1, 0, DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Mir ve Nesvizh Şatolari', 'mir-nesvizh-satolari', '<p>Belarus\'un en ünlü şatoları Mir ve Nesvizh, UNESCO Dünya Mirası listesinde yer alıyor. Ortaçağ mimarisi ve görkemli sarayları ile büyülüyor.</p><p>Mir Kalesi, 16. yüzyıldan kalma ve mükemmel restore edilmiş durumda. Nesvizh Şatosu ise Radziwill ailesinin eski konutu ve harika bahçeleriyle ünlü.</p><p>İki şato da Minsk\'ten günübirlik tur olarak ziyaret edilebilir.</p>', 'Belarus\'un UNESCO mirası şatoları', 2, 'https://picsum.photos/800/500?random=5', 1, 0, DATE_SUB(NOW(), INTERVAL 3 DAY)),

-- Almanya Gönderileri
('Berlin Duvarı ve Tarihi', 'berlin-duvari-tarihi', '<p>Berlin Duvarı, Soğuk Savaş\'ın en önemli sembollerinden biri. East Side Gallery, dünyanın en uzun açık hava galerisi olarak duvarın kalıntılarını sergiliyor.</p><p>Brandenburg Kapısı, Reichstag Binası ve Checkpoint Charlie, Berlin\'in mutlaka görülmesi gereken tarihi noktaları.</p><p>Berlin\'in alternatif kültür sahnesi, gece hayatı ve müze adası da görülmeye değer.</p>', 'Berlin Duvarı\'nın tarihi ve East Side Gallery', 3, 'https://picsum.photos/800/500?random=6', 1, 0, DATE_SUB(NOW(), INTERVAL 4 DAY)),
('Neuschwanstein Şatosu Masal Kalesi', 'neuschwanstein-satosu', '<p>Bavyera Alpleri\'nin kalbinde yer alan Neuschwanstein Şatosu, Disney\'in ilham aldığı masal kalesi. Kral II. Ludwig tarafından 19. yüzyılda inşa edildi.</p><p>Şatonun iç dekorasyonu Wagner operalarından esinlenmiş. Marienbrücke köprüsünden şatonun en ikonik fotoğrafları çekilebilir.</p><p>Füssen kasabası ve Alpsee Gölü de ziyaret edilmeye değer.</p>', 'Almanya\'nın masal şatosu Neuschwanstein', 3, 'https://picsum.photos/800/500?random=7', 1, 0, DATE_SUB(NOW(), INTERVAL 6 DAY)),

-- Fransa Gönderileri
('Paris Eyfel Kulesi ve Seine Nehri', 'paris-eyfel-kulesi', '<p>Eyfel Kulesi, Paris\'in ve Fransa\'nın en ünlü simgesi. 1889 yılında Dünya Fuarı için inşa edilen kule, yılda 7 milyon ziyaretçi ağırlıyor.</p><p>Seine Nehri\'nde tekne turu, Paris\'i farklı bir açıdan görme fırsatı sunuyor. Louvre Müzesi, Notre-Dame Katedrali ve Montmartre tepesi mutlaka görülmeli.</p><p>Fransız mutfağından croissant, macaron ve escargot tatmayı unutmayın!</p>', 'Paris\'in romantik atmosferi ve Eyfel Kulesi', 4, 'https://picsum.photos/800/500?random=8', 1, 1, DATE_SUB(NOW(), INTERVAL 7 DAY)),
('Provence Lavanta Tarlaları', 'provence-lavanta-tarlalari', '<p>Güney Fransa\'daki Provence bölgesi, sonsuz lavanta tarlaları ve şirin köyleriyle ünlü. Haziran-Temmuz ayları lavantaların çiçek açtığı dönem.</p><p>Gordes, Roussillon ve Valensole gibi köyler görülmeye değer. Bölgenin şarap ve zeytinyağı da dünyaca ünlü.</p><p>Provence mutfağından ratatouille ve bouillabaisse denemelisiniz.</p>', 'Provence\'ın mor lavanta tarlaları', 4, 'https://picsum.photos/800/500?random=9', 1, 0, DATE_SUB(NOW(), INTERVAL 8 DAY)),

-- İtalya Gönderileri
('Roma Kolezyum ve Forum', 'roma-kolezyum-forum', '<p>Roma\'nın kalbinde yer alan Kolezyum, antik dünyanın en büyük amfi tiyatrosu. MS 80 yılında tamamlanan yapı, 50.000 kişi kapasiteli.</p><p>Forum Romanum, antik Roma\'nın siyasi ve ticari merkezi. Pantheon, Trevi Çeşmesi ve Vatikan da mutlaka görülmeli.</p><p>İtalyan mutfağından pizza, pasta ve gelato denemeyi unutmayın!</p>', 'Roma\'nın antik mimarisi ve Kolezyum', 5, 'https://picsum.photos/800/500?random=10', 1, 0, DATE_SUB(NOW(), INTERVAL 9 DAY)),
('Venedik Kanalları ve Gondol Turu', 'venedik-kanallari-gondol', '<p>Venedik, su üzerinde kurulu benzersiz bir şehir. Grand Canal\'da gondol turu, Venedik deneyiminin vazgeçilmezi.</p><p>San Marco Meydanı, Dükler Sarayı ve Rialto Köprüsü şehrin en ünlü noktaları. Murano cam ürünleri ve Burano\'nun renkli evleri de görülmeye değer.</p><p>Cicchetti (Venedik tapası) ve tiramisu denemelisiniz.</p>', 'Venedik\'in romantik kanalları ve gondolları', 5, 'https://picsum.photos/800/500?random=11', 1, 0, DATE_SUB(NOW(), INTERVAL 10 DAY)),

-- İspanya Gönderileri
('Barcelona Sagrada Familia', 'barcelona-sagrada-familia', '<p>Antoni Gaudí\'nin başyapıtı Sagrada Familia, 1882\'den beri inşaat halinde olan görkemli bir bazilika. Barcelona\'nın sembolü ve en çok ziyaret edilen yapısı.</p><p>Park Güell, Casa Batlló ve La Rambla caddesi de mutlaka görülmeli. Gotik Mahalle\'nin dar sokakları tarihe yolculuk yaptırıyor.</p><p>Tapas, paella ve sangria İspanyol mutfağının vazgeçilmezleri.</p>', 'Barcelona\'nın ikonik Sagrada Familia bazilikası', 6, 'https://picsum.photos/800/500?random=12', 1, 0, DATE_SUB(NOW(), INTERVAL 11 DAY)),
('Madrid Prado Müzesi ve Sanat', 'madrid-prado-muzesi', '<p>Prado Müzesi, dünyanın en önemli sanat müzelerinden biri. Velázquez, Goya ve El Greco\'nun eserleri burada sergileniyor.</p><p>Retiro Parkı, Kraliyet Sarayı ve Plaza Mayor Madrid\'in en ünlü yerlerinde. Flamenco gösterisi mutlaka izlenmeli.</p><p>Churros con chocolate İspanyol kahvaltısının vazgeçilmezi.</p>', 'Madrid\'in sanat hazinesi Prado Müzesi', 6, 'https://picsum.photos/800/500?random=13', 1, 0, DATE_SUB(NOW(), INTERVAL 12 DAY)),

-- Yunanistan Gönderileri
('Santorini Beyaz Evler ve Mavi Kubbeler', 'santorini-beyaz-evler', '<p>Santorini, Ege Denizi\'nin incisi ve dünyanın en romantik adalarından biri. Beyaz evler ve mavi kubbeli kiliseler adanın simgesi.</p><p>Oia kasabasında gün batımı izlemek unutulmaz bir deneyim. Kırmızı ve siyah plajlar, antik Akrotiri harabeleri de görülmeye değer.</p><p>Yunan meze ve raki eşliğinde Ege mutfağının tadını çıkarın.</p>', 'Santorini\'nin büyülü beyaz evleri', 7, 'https://picsum.photos/800/500?random=14', 1, 1, DATE_SUB(NOW(), INTERVAL 13 DAY)),
('Atina Akropolis ve Parthenon', 'atina-akropolis-parthenon', '<p>Akropolis, antik Yunan medeniyetinin en önemli kalıntısı. MÖ 5. yüzyılda inşa edilen Parthenon tapınağı dünya miraslarındandır.</p><p>Plaka Mahallesi, Syntagma Meydanı ve Ulusal Arkeoloji Müzesi mutlaka görülmeli. Monastiraki\'de antika alışverişi yapılabilir.</p><p>Moussaka, souvlaki ve baklava Yunan mutfağının lezzetleri.</p>', 'Atina\'nın antik Akropolis\'i ve Parthenon tapınağı', 7, 'https://picsum.photos/800/500?random=15', 1, 0, DATE_SUB(NOW(), INTERVAL 14 DAY)),

-- Hollanda Gönderileri
('Amsterdam Kanal Turları', 'amsterdam-kanal-turlari', '<p>Amsterdam, 165 kanalın iç içe geçtiği su şehri. Kanal turları Amsterdam\'ı en iyi tanımanın yolu. Anne Frank Evi, Van Gogh Müzesi ve Rijksmuseum mutlaka görülmeli.</p><p>Lale bahçeleri ve bisiklet turu Amsterdam deneyiminin vazgeçilmezleri. Jordaan mahallesi ve Zaanse Schans köyü de görülmeye değer.</p><p>Hollanda peynirleri ve stroopwafel denemeyi unutmayın!</p>', 'Amsterdam\'ın romantik kanalları', 8, 'https://picsum.photos/800/500?random=16', 1, 0, DATE_SUB(NOW(), INTERVAL 15 DAY)),

-- Avusturya Gönderileri
('Viyana Schönbrunn Sarayı', 'viyana-schonbrunn-sarayi', '<p>Schönbrunn Sarayı, Habsburg hanedanının yazlık ikametgahı. Barok mimarinin en güzel örneklerinden biri ve UNESCO Dünya Mirası.</p><p>1.441 odalı saray ve görkemli bahçeleri görülmeye değer. Viyana Devlet Operası, St. Stephen Katedrali ve Belvedere Sarayı da mutlaka görülmeli.</p><p>Viyana kahvesi ve Sachertorte pastası denemelisiniz.</p>', 'Viyana\'nın görkemli Schönbrunn Sarayı', 9, 'https://picsum.photos/800/500?random=17', 1, 0, DATE_SUB(NOW(), INTERVAL 16 DAY)),

-- İsviçre Gönderileri
('İsviçre Alpleri Matterhorn Dağı', 'isvicre-alpleri-matterhorn', '<p>Matterhorn, İsviçre Alpleri\'nin en ünlü dağı. 4.478 metre yüksekliğindeki piramit şeklindeki dağ, dünyanın en çok fotoğraflanan dağlarından biri.</p><p>Zermatt kasabası dağın eteğinde yer alıyor. Gornergrat demiryolu ile 3.089 metre yüksekliğe çıkarak panoramik manzara izlenebilir.</p><p>İsviçre çikolatası ve fondue denemeyi unutmayın!</p>', 'İsviçre Alpleri\'nin ikonik Matterhorn dağı', 10, 'https://picsum.photos/800/500?random=18', 1, 0, DATE_SUB(NOW(), INTERVAL 17 DAY)),
('Lozan Cenevre Gölü Kıyısı', 'lozan-cenevre-golu', '<p>Lozan, Cenevre Gölü kıyısında muhteşem bir şehir. Olimpiyat Müzesi, IOC\'nin merkezi ve göl manzarası ile ünlü.</p><p>Lavaux bağları UNESCO Dünya Mirası listesinde. Eski şehir ve Katedrali mutlaka görülmeli. Göl kıyısında yürüyüş yaparak Montreux\'e kadar gidilebilir.</p><p>İsviçre peyniri raclette ve rösti denemelisiniz.</p>', 'Lozan\'ın Cenevre Gölü manzarası', 10, 'https://picsum.photos/800/500?random=19', 1, 0, DATE_SUB(NOW(), INTERVAL 18 DAY));

-- Breaking News (Kayan Haberler)
INSERT INTO `breaking_news` (`title`, `url`, `is_active`, `order`) VALUES
('Kapadokya balon turları yeniden başladı!', '#', 1, 1),
('Paris 2024 Olimpiyatları için hazırlıklar sürüyor', '#', 1, 2),
('İtalya\'da yeni UNESCO Dünya Mirası alanı ilan edildi', '#', 1, 3),
('Santorini\'de erken rezervasyon fırsatları', '#', 1, 4),
('İsviçre Alpleri kış sezonu açılıyor', '#', 1, 5);

-- Stories
INSERT INTO `stories` (`title`, `short_title`, `image`, `url`, `order`, `is_active`, `is_new`) VALUES
('Kapadokya', 'Kapado...', 'https://picsum.photos/200/200?random=21', '#', 1, 1, 1),
('Paris', 'Paris', 'https://picsum.photos/200/200?random=22', '#', 2, 1, 0),
('Roma', 'Roma', 'https://picsum.photos/200/200?random=23', '#', 3, 1, 0),
('Amsterdam', 'Amster...', 'https://picsum.photos/200/200?random=24', '#', 4, 1, 0),
('Santorini', 'Santor...', 'https://picsum.photos/200/200?random=25', '#', 5, 1, 1),
('Barcelona', 'Barcel...', 'https://picsum.photos/200/200?random=26', '#', 6, 1, 0),
('Viyana', 'Viyana', 'https://picsum.photos/200/200?random=27', '#', 7, 1, 0),
('Berlin', 'Berlin', 'https://picsum.photos/200/200?random=28', '#', 8, 1, 0);

-- Hashtags
INSERT INTO `hashtags` (`name`, `url`, `order`, `is_active`) VALUES
('#gezi', '#', 1, 1),
('#seyahat', '#', 2, 1),
('#tatil', '#', 3, 1),
('#avrupa', '#', 4, 1),
('#kültür', '#', 5, 1),
('#tarih', '#', 6, 1),
('#doğa', '#', 7, 1),
('#gastronomi', '#', 8, 1);

-- Bildirimler
INSERT INTO `notifications` (`title`, `message`, `time_text`, `url`, `is_active`, `created_at`) VALUES
('Hoş Geldiniz!', 'Gezi blogumuza hoş geldiniz. En güncel seyahat haberleri için bizi takip edin.', 'Az önce', '#', 1, NOW()),
('Yeni İçerik', 'Kapadokya rehberimiz yayınlandı!', '2 saat önce', '#', 1, DATE_SUB(NOW(), INTERVAL 2 HOUR));
