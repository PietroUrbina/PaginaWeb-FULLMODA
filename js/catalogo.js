document.addEventListener('DOMContentLoaded', function() {
    // Datos de productos de ejemplo
    const productsData = {
        polos: Array(32).fill().map((_, i) => ({
            id: `P${i+1}`,
            name: `Polo Full Moda ${i+1}`,
            price: 30 + (i % 10),
            image: `assets/img/Polos/polo${(i % 5) + 1}.jpg`
        })),
        shorts: Array(24).fill().map((_, i) => ({
            id: `S${i+1}`,
            name: i % 2 === 0 ? `Short Urbano ${i+1}` : `Pantalón Moderno ${i+1}`,
            price: 70 + (i % 15),
            image: `assets/img/Shorts/${i % 2 === 0 ? 'short' : 'pantalon'}${(i % 3) + 1}.png`
        })),
        zapatillas: Array(18).fill().map((_, i) => ({
            id: `Z${i+1}`,
            name: `Zapatillas Urbanas ${i+1}`,
            price: 150 + (i % 30),
            image: `assets/img/Zapatillas/zapatilla${(i % 4) + 1}.jpg`
        }))
    };

    // Variables de estado
    let currentCategory = 'polos';
    let currentPage = 1;
    const productsPerPage = 16;

    // Elementos del DOM
    const productGrid = document.getElementById('product-grid');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const prevTopBtn = document.getElementById('prev-page-top');
    const nextTopBtn = document.getElementById('next-page-top');
    const prevBottomBtn = document.getElementById('prev-page-bottom');
    const nextBottomBtn = document.getElementById('next-page-bottom');
    const currentPageTop = document.getElementById('current-page-top');
    const currentPageBottom = document.getElementById('current-page-bottom');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const backToTopBtn = document.getElementById('backToTop');

    // Función para renderizar productos
    function renderProducts() {
        const products = productsData[currentCategory];
        const startIdx = (currentPage - 1) * productsPerPage;
        const endIdx = startIdx + productsPerPage;
        const paginatedProducts = products.slice(startIdx, endIdx);

        // Limpiar grid
        productGrid.innerHTML = '';

        // Agregar productos
        paginatedProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-img-container">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                </div>
                <div class="product-info">
                    <p class="product-name">${product.name}</p>
                    <p class="product-price">${product.price.toFixed(2)}</p>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        // Actualizar paginación
        updatePagination(products.length);
    }

    // Función para actualizar paginación
    function updatePagination(totalProducts) {
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        
        // Actualizar indicadores de página
        currentPageTop.textContent = currentPage;
        currentPageBottom.textContent = currentPage;
        
        // Habilitar/deshabilitar botones
        const isFirstPage = currentPage === 1;
        const isLastPage = currentPage === totalPages || totalPages === 0;
        
        [prevTopBtn, prevBottomBtn].forEach(btn => {
            btn.parentElement.classList.toggle('disabled', isFirstPage);
        });
        
        [nextTopBtn, nextBottomBtn].forEach(btn => {
            btn.parentElement.classList.toggle('disabled', isLastPage);
        });
    }

    // Función para cambiar de página
    function changePage(isNext) {
        const totalProducts = productsData[currentCategory].length;
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        
        if (isNext && currentPage < totalPages) {
            currentPage++;
            renderProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (!isNext && currentPage > 1) {
            currentPage--;
            renderProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Event listeners para botones de categoría
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Cambiar categoría activa
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Actualizar categoría y resetear paginación
            currentCategory = btn.dataset.category;
            currentPage = 1;
            renderProducts();
        });
    });

    // Event listeners para paginación
    [prevTopBtn, prevBottomBtn].forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            changePage(false);
        });
    });

    [nextTopBtn, nextBottomBtn].forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            changePage(true);
        });
    });

    // Inicialización
    document.body.classList.add('hombres-page');
    renderProducts();
});