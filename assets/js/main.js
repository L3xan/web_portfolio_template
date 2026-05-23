// Sayfa Yüklendiğinde Fonksiyonları Çalıştır
document.addEventListener('DOMContentLoaded', () => {
    initDynamicProjects();
    initProjectFilter();
    initProjectSlider();
    initThemeToggle();
    initSearch();
});

// Projeleri Kategorilere Göre Filtreleme
const initProjectFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectCards = document.querySelectorAll('.project-card');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
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
                }, 400); 
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

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    setInterval(nextSlide, 5000);
};

// Dark/Light Mode Toggle (YENİ SİSTEME GÖRE DÜZENLENDİ)
const initThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '🌙';
    } else {
        themeToggle.innerHTML = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '🌙';
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '☀️';
        }
    });
};

// İletişim Formu Gönderim İşlemi (Toast Bildirimi + PHP)
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Gönderiliyor...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch('../gonder.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    showToast('Başarılı!', 'Mesajınız bana ulaştı, en kısa sürede dönüş yapacağım.', 'success');
                    contactForm.reset(); 
                } else {
                    showToast('Hata!', data.message || 'Bir sorun oluştu.', 'error');
                }
            })
            .catch(error => {
                showToast('Bağlantı Hatası!', 'Lütfen internet bağlantınızı kontrol edin.', 'error');
            })
            .finally(() => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    function showToast(title, message, type) {
        const toast = document.createElement('div');
        toast.classList.add('toast-notification');
        
        const icon = type === 'success' ? '✓' : '✕';
        const iconColor = type === 'success' ? 'var(--primary-color)' : '#ff4d4d';
        
        toast.innerHTML = `
            <div class="toast-icon" style="color: ${iconColor}">${icon}</div>
            <div class="toast-content">
                <h4 style="color: ${iconColor}">${title}</h4>
                <p>${message}</p>
            </div>
        `;

        document.body.appendChild(toast);
        setTimeout(() => { toast.classList.add('show'); }, 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => { toast.remove(); }, 500);
        }, 4000);
    }
});

// Mobil Menü İşlemleri
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.nav-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuBtn && mobileNav) {
        let menuOpen = false;
        
        menuBtn.addEventListener('click', () => {
            menuOpen = !menuOpen;
            mobileNav.classList.toggle('open', menuOpen);
            document.body.style.overflow = menuOpen ? 'hidden' : '';

            const spans = menuBtn.querySelectorAll('span');
            if (menuOpen) {
                spans[0].style.transform = 'translateY(8.5px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8.5px) rotate(-45deg)';
            } else {
                spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
            }
        });

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

// Projeleri JSON'dan Çekme ve Favori Mantığı
const initDynamicProjects = async () => {
    const grid = document.getElementById('dynamic-project-grid');
    if (!grid) return; 

    try {
        const response = await fetch('../data.json'); 
        const projects = await response.json();
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const renderProjects = () => {
            grid.innerHTML = ''; 
            
            projects.forEach(project => {
                const isFavorited = favorites.includes(project.id);
                const heartIcon = isFavorited ? '❤️' : '🤍';
                
                const card = document.createElement('div');
                card.className = `project-card glass ${project.category}`;
                card.setAttribute('data-category', project.category);
                
                card.innerHTML = `
                    <div class="project-img ${project.bgClass}"></div>
                    <div class="project-info">
                        <div class="project-header" style="display: flex; justify-content: space-between; align-items: center;">
                            <h3>${project.title}</h3>
                            <button class="fav-btn" data-id="${project.id}" aria-label="Favorilere Ekle">
                                ${heartIcon}
                            </button>
                        </div>
                        <p>${project.description}</p>
                    </div>
                `;
                grid.appendChild(card);
            });

            document.querySelectorAll('.fav-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const projectId = parseInt(btn.getAttribute('data-id'));
                    
                    if (favorites.includes(projectId)) {
                        favorites = favorites.filter(id => id !== projectId);
                    } else {
                        favorites.push(projectId);
                    }
                    
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    renderProjects();
                });
            });
        };

        renderProjects(); 

    } catch (error) {
        console.error("Projeler yüklenirken bir hata oluştu:", error);
        grid.innerHTML = '<p>Projeler yüklenemedi. Lütfen bağlantınızı kontrol edin.</p>';
    }
};

// Arama Kutusu Filtreleme
const initSearch = () => {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const desc = card.querySelector('p').innerText.toLowerCase();
            
            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => { card.style.display = 'none'; }, 400);
            }
        });
    });
};