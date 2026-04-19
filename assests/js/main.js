// Sayfa Yüklendiğinde Fonksiyonları Çalıştır
document.addEventListener('DOMContentLoaded', () => {
    initProjectFilter();
    initProjectSlider();
    initThemeToggle();
});

// Projeleri Kategorilere Göre Filtreleme (Gelişmiş)
const initProjectFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktif buton stilini değiştir
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Akıcı geçiş efekti
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 400); // Animasyon süresi
            });
        });
    });
}

// Proje Slider Fonksiyonu
const initProjectSlider = () => {
    const slider = document.querySelector('.slider-wrapper');
    if (!slider) return;

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0;

    const updateSlider = () => {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Dot'ları güncelle
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    };

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Dot'lara tıklama
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Otomatik geçiş (isteğe bağlı - 5 saniyede bir)
    setInterval(nextSlide, 5000);
};

// Dark/Light Mode Toggle
const initThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Kayıtlı tema tercihini kontrol et
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '🌙';
    } else {
        themeToggle.innerHTML = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Tema durumunu kaydet
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '🌙';
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '☀️';
        }
    });
};

// İletişim Formu Gönderim İşlemi (Toast Bildirimi)
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Formun sayfayı yenilemesini engeller

            // Mesaj kutusunu (div) oluştur
            const toast = document.createElement('div');
            toast.classList.add('toast-notification');
            
            // İçeriğini ekle
            toast.innerHTML = `
                <div class="toast-icon">✓</div>
                <div class="toast-content">
                    <h4>Başarılı!</h4>
                    <p>Mesajınız bana ulaştı, en kısa sürede dönüş yapacağım.</p>
                </div>
            `;

            // Sayfaya ekle
            document.body.appendChild(toast);

            // Animasyonu tetiklemek için çok küçük bir gecikme
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);

            // Form içindeki yazıları temizle
            contactForm.reset();

            // 4 saniye sonra bildirimi ekrandan kaldır
            setTimeout(() => {
                toast.classList.remove('show');
                
                // CSS animasyonu bittikten sonra elementi DOM'dan tamamen sil
                setTimeout(() => {
                    toast.remove();
                }, 500);
            }, 4000);
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.nav-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuBtn && mobileNav) {
        let menuOpen = false;
        
        menuBtn.addEventListener('click', () => {
            menuOpen = !menuOpen;
            
            // Menüyü aç/kapat (.open class'ını ekler/çıkarır)
            mobileNav.classList.toggle('open', menuOpen);
            
            // Menü açıkken arka plandaki sitenin kaymasını (scroll) engelle
            document.body.style.overflow = menuOpen ? 'hidden' : '';

            // Hamburger ikonunu animasyonlu bir "X" işaretine dönüştür
            const spans = menuBtn.querySelectorAll('span');
            if (menuOpen) {
                spans[0].style.transform = 'translateY(8.5px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8.5px) rotate(-45deg)';
            } else {
                spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
            }
        });

        // Kullanıcı menüdeki bir linke tıkladığında menüyü otomatik kapat
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuOpen = false;
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
                const spans = menuBtn.querySelectorAll('span');
                spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
            });
        });
    }
});
