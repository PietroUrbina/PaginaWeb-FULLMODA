document.addEventListener('DOMContentLoaded', function() {
    // Filtros
    document.querySelectorAll('.filtro select').forEach(select => {
        select.addEventListener('change', function() {
            console.log(`Filtrar por ${this.id}: ${this.value}`);
            // Aquí iría la lógica para filtrar los productos
        });
    });
    
    // Paginación
    document.querySelectorAll('.paginacion a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase activa de todos los enlaces
            document.querySelectorAll('.paginacion a').forEach(a => {
                a.classList.remove('pagina-activa');
            });
            
            // Agregar clase activa al enlace clickeado
            this.classList.add('pagina-activa');
            
            // Simular cambio de página
            console.log(`Ir a página: ${this.textContent}`);
        });
    });
    
    // Efecto hover en tarjetas de producto
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
});