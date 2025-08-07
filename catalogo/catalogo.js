document.addEventListener('DOMContentLoaded', function() {
    // Cambiar navbar al hacer scroll
    const header = document.querySelector('.header-transparent');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                header.style.background = 'var(--white)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.classList.remove('scrolled');
                header.style.background = 'transparent';
                header.style.boxShadow = 'none';
            }
        });
    }

    // Filtro de productos
    const filtroSelect = document.getElementById('filtro');
    if (filtroSelect) {
        filtroSelect.addEventListener('change', function() {
            console.log('Filtrar productos por:', this.value);
            // Aquí iría la lógica para filtrar los productos
        });
    }

    // Paginación
    document.querySelectorAll('.paginacion-container a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase activa de todos los enlaces
            document.querySelectorAll('.paginacion-container a').forEach(a => {
                a.classList.remove('pagina-activa');
            });
            
            // Agregar clase activa al enlace clickeado
            this.classList.add('pagina-activa');
            
            // Simular cambio de página
            console.log('Cambiar a página:', this.textContent);
        });
    });

    // Efectos hover en tarjetas
    document.querySelectorAll('.producto-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
        });
    });

    // Efectos hover en botones de género
    document.querySelectorAll('.btn-genero').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
    });
});