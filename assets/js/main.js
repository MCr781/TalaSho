document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // MOBILE MENU TOGGLE LOGIC
    // ==========================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    const openMenu = () => {
        // RTL translation logic: remove translate-x-full to slide in
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        
        // Show overlay
        mobileMenuOverlay.classList.remove('hidden');
        // Small delay to allow display block to apply before animating opacity
        setTimeout(() => {
            mobileMenuOverlay.classList.remove('opacity-0');
            mobileMenuOverlay.classList.add('opacity-100');
        }, 10);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        
        mobileMenuOverlay.classList.remove('opacity-100');
        mobileMenuOverlay.classList.add('opacity-0');
        
        setTimeout(() => {
            mobileMenuOverlay.classList.add('hidden');
        }, 300); // match transition duration

        // Restore body scroll
        document.body.style.overflow = '';
    };

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMenu);
    }

    // ==========================================
    // SWIPER INIT
    // ==========================================
    const heroSwiperElement = document.querySelector('.hero-swiper');
    
    if (heroSwiperElement) {
        new Swiper('.hero-swiper', {
            // Essential RTL setup
            dir: 'rtl',
            
            // Loop functionality
            loop: true,
            
            // Auto play configuration
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },

            // Fade effect for luxurious feel
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            
            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // ==========================================
    // VIP COVERFLOW SWIPER INIT
    // ==========================================
    const vipSwiperElement = document.querySelector('.vip-swiper');
    
    if (vipSwiperElement) {
        new Swiper('.vip-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            dir: 'rtl',
            loop: true,
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false, // Disabled default shadows to retain glassmorphism transparency
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        });
    }
});
