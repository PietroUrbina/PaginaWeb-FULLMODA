document.addEventListener('DOMContentLoaded', function() {
    // ============ NAVBAR ==============
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileClose = document.querySelector('.mobile-close-btn');
    const nav = document.querySelector('.nav');
    const menuHeaders = document.querySelectorAll('.mobile-menu-header');

    // Función para cerrar todos los menús
    function closeAllMenus() {
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.classList.remove('active');
    });
    document.querySelectorAll('.mobile-expand').forEach(expand => {
        expand.classList.remove('active');
    });
    document.querySelectorAll('.mobile-menu-header a').forEach(link => {
        link.classList.remove('active');
    });
    }

    // Función para cerrar otros menús excepto el actual
    function closeOtherMenus(currentHeader) {
    menuHeaders.forEach(header => {
        if (header !== currentHeader) {
        const expand = header.querySelector('.mobile-expand');
        const submenu = header.parentElement.querySelector('.submenu');
        const link = header.querySelector('a');
        
        expand.classList.remove('active');
        submenu.classList.remove('active');
        link.classList.remove('active');
        }
    });
    }

    // Toggle del menú móvil
    mobileToggle.addEventListener('click', function() {
    nav.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeAllMenus();
    });

    mobileClose.addEventListener('click', function() {
    nav.classList.remove('active');
    document.body.style.overflow = '';
    });

    // Toggle de submenús en móvil
    menuHeaders.forEach(header => {
    header.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
        const expand = this.querySelector('.mobile-expand');
        const submenu = this.parentElement.querySelector('.submenu');
        const link = this.querySelector('a');
        
        // Cerrar otros menús primero
        closeOtherMenus(this);
        
        // Alternar el menú actual
        expand.classList.toggle('active');
        submenu.classList.toggle('active');
        link.classList.toggle('active');
        
        // Prevenir cualquier acción por defecto
        e.preventDefault();
        }
    });
    });

    // Cambiar navbar al hacer scroll (solo escritorio)
    window.addEventListener('scroll', function() {
    if (window.innerWidth > 768) { // Solo aplicar en escritorio
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
    });

    // ===== CARRUSEL INFINITO =====
    const carousel = document.querySelector('.hero-carousel');
    const slidesContainer = document.querySelector('.hero-slides');
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    if (slides.length > 0) {
        // Clonar slides para efecto infinito
        const firstSlide = slides[0].cloneNode(true);
        const lastSlide = slides[slides.length - 1].cloneNode(true);
        slidesContainer.appendChild(firstSlide);
        slidesContainer.insertBefore(lastSlide, slides[0]);
        
        const allSlides = document.querySelectorAll('.hero-slide');
        let currentIndex = 1;
        let isAnimating = false;
        let autoSlideInterval;

        // Configuración
        const config = {
            slideDuration: 5000,
            transitionSpeed: 600
        };

        // Función para calcular índice real
        function calculateRealIndex(index) {
            return index === 0 ? slides.length - 1 : 
                   index === allSlides.length - 1 ? 0 : 
                   index - 1;
        }

        // Función para actualizar indicadores
        function updateIndicators(realIndex) {
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === realIndex);
            });
        }

        // Función principal para mover el carrusel
        function goToSlide(index, animate = true) {
            if (isAnimating) return;
            isAnimating = true;
            
            const realIndex = calculateRealIndex(index);
            updateIndicators(realIndex);
            
            slidesContainer.style.transition = animate ? 
                `transform ${config.transitionSpeed}ms ease-in-out` : 'none';
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
            
            slidesContainer.addEventListener('transitionend', () => {
                if (index === 0) {
                    currentIndex = allSlides.length - 2;
                    slidesContainer.style.transition = 'none';
                    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
                } else if (index === allSlides.length - 1) {
                    currentIndex = 1;
                    slidesContainer.style.transition = 'none';
                    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
                } else {
                    currentIndex = index;
                }
                isAnimating = false;
            }, { once: true });
        }

        // Navegación
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        // Control de auto-slide
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(() => {
                nextSlide();
            }, config.slideDuration);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        if (nextBtn) nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    stopAutoSlide();
                    goToSlide(index + 1);
                    startAutoSlide();
                });
            });
        }

        // Touch events
        let touchStartX = 0;
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const threshold = 50;
            
            if (touchEndX < touchStartX - threshold) nextSlide();
            else if (touchEndX > touchStartX + threshold) prevSlide();
            
            startAutoSlide();
        }, { passive: true });

        // Pausar al interactuar
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);

        // Inicialización
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators(0);
        startAutoSlide();
    }

    // ============ BOTÓN "VOLVER ARRIBA" ==============
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            backToTopBtn.classList.toggle('visible', scrollPosition > 300);
        });

        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    //============== CINTA PROMOCIONAL ====================
    const content = document.querySelector('.scrolling-content-content');
        const text = content.innerHTML;
        
        // Repetir suficiente veces para llenar y superar el ancho de la pantalla
        while (content.scrollWidth < window.innerWidth * 2) {
            content.innerHTML += text;
        }
});