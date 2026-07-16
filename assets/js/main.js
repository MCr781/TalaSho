/* ============================================================
   TALASHO — main.js (v3 — built part-by-part)
   Vanilla JS only — no jQuery, no frameworks
   ============================================================ */

(function () {
    'use strict';

    // Run immediately if DOM is already loaded, otherwise wait for DOMContentLoaded.
    // Scripts at the bottom of <body> may execute AFTER DOMContentLoaded has fired.
    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    onReady(function () {

        // ==========================================
        // 1) MOBILE MENU TOGGLE
        // ==========================================
        const mobileMenuToggle  = document.getElementById('mobileMenuToggle');
        const mobileMenuClose   = document.getElementById('mobileMenuClose');
        const mobileMenu        = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        function openMenu() {
            if (!mobileMenu || !mobileMenuOverlay) return;
            mobileMenu.classList.remove('translate-x-full', 'rtl:translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            mobileMenuOverlay.classList.remove('hidden');
            void mobileMenuOverlay.offsetWidth;
            mobileMenuOverlay.classList.remove('opacity-0');
            mobileMenuOverlay.classList.add('opacity-100');
            document.body.style.overflow = 'hidden';
            if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
            if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'false');
        }

        function closeMenu() {
            if (!mobileMenu || !mobileMenuOverlay) return;
            mobileMenu.classList.add('translate-x-full', 'rtl:translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
            mobileMenuOverlay.classList.remove('opacity-100');
            mobileMenuOverlay.classList.add('opacity-0');
            setTimeout(function () { mobileMenuOverlay.classList.add('hidden'); }, 300);
            document.body.style.overflow = '';
            if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
            if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'true');
        }

        if (mobileMenuToggle)  mobileMenuToggle.addEventListener('click', openMenu);
        if (mobileMenuClose)   mobileMenuClose.addEventListener('click', closeMenu);
        if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });


        // ==========================================
        // 2) HERO SWIPER (spec §4: hero banner carousel)
        //    Delayed init to ensure grid layout is computed before Swiper reads
        //    container width. Without this, Swiper can read a bogus width (33M+ px)
        //    when the container is inside a CSS grid that hasn't been laid out yet.
        // ==========================================
        function initHeroSwiper() {
            try {
                var el = document.querySelector('.hero-swiper');
                if (!el || typeof Swiper === 'undefined') return;

                // Destroy any existing Swiper instance (from cache or double-init)
                if (el.swiper) {
                    el.swiper.destroy(true, true);
                }

                // Calculate the correct width from the parent (flex container)
                var parent = el.parentElement;
                var parentWidth = parent.offsetWidth;
                var prize = parent.querySelector('.ts-banner');
                var prizeWidth = prize ? prize.offsetWidth : 0;
                var gap = parentWidth > 1024 ? 20 : 12;
                var w = parentWidth - prizeWidth - gap;
                if (w < 100 || w > 10000) w = Math.round(parentWidth * 0.66);

                // Set width permanently — flex item would otherwise expand to 33M+ px
                el.style.width = w + 'px';
                el.style.maxWidth = w + 'px';
                el.style.flex = 'none';

                var heroSwiper = new Swiper(el, {
                    dir: 'rtl',
                    loop: true,
                    width: w,
                    autoplay: { delay: 6000, disableOnInteraction: false },
                    speed: 800,
                    pagination: { el: '.hero-swiper .swiper-pagination', clickable: true },
                    navigation: {
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    },
                });

                // Update on resize
                var resizeTimer;
                window.addEventListener('resize', function() {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function() {
                        var newW = parent.offsetWidth - (prize ? prize.offsetWidth : 0) - gap;
                        if (newW < 100 || newW > 10000) newW = Math.round(parent.offsetWidth * 0.66);
                        el.style.width = newW + 'px';
                        el.style.maxWidth = newW + 'px';
                        heroSwiper.params.width = newW;
                        heroSwiper.update();
                    }, 200);
                });
            } catch(e) {
                console.error('Hero swiper init failed:', e);
            }
        }

        if (document.querySelector('.hero-swiper')) {
            setTimeout(initHeroSwiper, 300);
        }


        // ==========================================
        // 2b) FLASH SALE SWIPER (spec §6: horizontal product carousel)
        // ==========================================
        if (typeof Swiper !== 'undefined' && document.querySelector('.flash-sale-swiper')) {
            new Swiper('.flash-sale-swiper', {
                dir: 'rtl',
                slidesPerView: 'auto',
                spaceBetween: 8,
                grabCursor: true,
                freeMode: true,
                breakpoints: {
                    768:  { spaceBetween: 12 },
                    1024: { spaceBetween: 16 },
                },
            });
        }


        // ==========================================
        // 3) DISCOUNT CODE — COPY TO CLIPBOARD
        //    (Will be added in a later part; stub kept for reference.)
        // ==========================================
        const copyBtn   = document.getElementById('copyCodeBtn');
        const codeEl    = document.getElementById('discountCode');
        const feedback  = document.getElementById('copyFeedback');

        if (copyBtn && codeEl) {
            copyBtn.addEventListener('click', function () {
                const code = codeEl.textContent.trim();
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

    }); // onReady

})();
