document.addEventListener('DOMContentLoaded', function() {
    // Aktuális oldal kiemelése a dockban
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach(item => {
        const itemHref = item.getAttribute('data-href');
        if (itemHref === currentPage || 
            (currentPage === '' && itemHref === 'index.html')) {
            item.classList.add('active');
        }
    });

    // Oldalváltási animáció
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(transition);

    // Általános linkkezelés
    document.body.addEventListener('click', function(e) {
        const target = e.target.closest('a[href]:not([target="_blank"]):not([href^="http"]):not(.no-transition)') || 
                      e.target.closest('.dock-item[data-href]');
        
        if (target) {
            e.preventDefault();
            const href = target.href || target.getAttribute('data-href');
            
            // Kimenő animáció
            document.querySelector('.macos-window').classList.add('fade-out');
            setTimeout(() => {
                transition.classList.add('active');
            }, 100);
            
            // Átmenet után navigálás
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
    
    // Bérelérés animáció
    setTimeout(() => {
        const windowElement = document.querySelector('.macos-window');
        windowElement.style.opacity = '0';
        windowElement.style.transform = 'scale(0.98)';
        windowElement.style.filter = 'blur(2px)';
        
        setTimeout(() => {
            windowElement.style.transition = 
                'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), ' +
                'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), ' +
                'filter 0.6s ease';
            windowElement.style.opacity = '1';
            windowElement.style.transform = 'scale(1)';
            windowElement.style.filter = 'blur(0)';
        }, 10);
    }, 0);
});