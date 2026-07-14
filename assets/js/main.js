/* ============================================================
   TALASHO — main.js
   Mobile menu toggle + Swiper initializations
   Vanilla JS only — no jQuery, no frameworks
   ============================================================ */

(function () {
    'use strict';

    // Wait for DOM
    document.addEventListener('DOMContentLoaded', function () {

        // ==========================================
        // 1) MOBILE MENU TOGGLE
        // ==========================================
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenuClose  = document.getElementById('mobileMenuClose');
        const mobileMenu       = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        function openMenu() {
            if (!mobileMenu || !mobileMenuOverlay) return;
            // RTL: slide in from start (right)
            mobileMenu.classList.remove('translate-x-full', 'rtl:translate-x-full');
            mobileMenu.classList.add('translate-x-0');

            mobileMenuOverlay.classList.remove('hidden');
            // Force reflow before opacity transition
            void mobileMenuOverlay.offsetWidth;
            mobileMenuOverlay.classList.remove('opacity-0');
            mobileMenuOverlay.classList.add('opacity-100');

            document.body.style.overflow = 'hidden';
            if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            if (!mobileMenu || !mobileMenuOverlay) return;
            mobileMenu.classList.add('translate-x-full', 'rtl:translate-x-full');
            mobileMenu.classList.remove('translate-x-0');

            mobileMenuOverlay.classList.remove('opacity-100');
            mobileMenuOverlay.classList.add('opacity-0');

            // Wait for transition to finish before hiding overlay
            setTimeout(function () {
                mobileMenuOverlay.classList.add('hidden');
            }, 300);

            document.body.style.overflow = '';
            if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }

        if (mobileMenuToggle)  mobileMenuToggle.addEventListener('click', openMenu);
        if (mobileMenuClose)   mobileMenuClose.addEventListener('click', closeMenu);
        if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });

        // ==========================================
        // 2) HERO SWIPER (fade effect, RTL, autoplay)
        // ==========================================
        const heroSwiperEl = document.querySelector('.hero-swiper');
        if (heroSwiperEl && typeof Swiper !== 'undefined') {
            new Swiper('.hero-swiper', {
                dir: 'rtl',
                loop: true,
                effect: 'fade',
                fadeEffect: { crossFade: true },
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
                speed: 800,
                pagination: {
                    el: '.hero-swiper .swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.hero-swiper .swiper-button-next',
                    prevEl: '.hero-swiper .swiper-button-prev',
                },
            });
        }

        // ==========================================
        // 3) AMAZING OFFERS SWIPER (horizontal scroll, RTL)
        // ==========================================
        const amazingSwiperEl = document.querySelector('.amazing-swiper');
        if (amazingSwiperEl && typeof Swiper !== 'undefined') {
            new Swiper('.amazing-swiper', {
                dir: 'rtl',
                slidesPerView: 'auto',
                spaceBetween: 16,
                grabCursor: true,
                freeMode: true,
                breakpoints: {
                    320:  { spaceBetween: 12 },
                    768:  { spaceBetween: 16 },
                    1024: { spaceBetween: 20 },
                },
            });
        }

        // ==========================================
        // 4) VIP COVERFLOW SWIPER
        // ==========================================
        const vipSwiperEl = document.querySelector('.vip-swiper');
        if (vipSwiperEl && typeof Swiper !== 'undefined') {
            new Swiper('.vip-swiper', {
                dir: 'rtl',
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                loop: true,
                speed: 600,
                coverflowEffect: {
                    rotate: 18,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                },
                pagination: {
                    el: '.vip-swiper .swiper-pagination',
                    clickable: true,
                },
                autoplay: {
                    delay: 4500,
                    disableOnInteraction: false,
                },
            });
        }

        // ==========================================
        // 5) DISCOUNT CODE — COPY TO CLIPBOARD
        // ==========================================
        const copyBtn = document.getElementById('copyCodeBtn');
        const codeEl  = document.getElementById('discountCode');
        const feedback = document.getElementById('copyFeedback');

        if (copyBtn && codeEl) {
            copyBtn.addEventListener('click', function () {
                const code = codeEl.textContent.trim();

                // Try modern clipboard API first, fallback to execCommand
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(code).then(showFeedback).catch(fallbackCopy);
                } else {
                    fallbackCopy();
                }

                function fallbackCopy() {
                    const textarea = document.createElement('textarea');
                    textarea.value = code;
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = '0';
                    document.body.appendChild(textarea);
                    textarea.select();
                    try { document.execCommand('copy'); showFeedback(); }
                    catch (e) { /* silent fail */ }
                    document.body.removeChild(textarea);
                }

                function showFeedback() {
                    if (!feedback) return;
                    feedback.style.opacity = '1';
                    setTimeout(function () { feedback.style.opacity = '0'; }, 2000);
                }
            });
        }

    }); // DOMContentLoaded

})();
