document.addEventListener('DOMContentLoaded', function() {

    // 1. FUNCIÓN CARGAR COMPONENTES (Header y Footer)
    async function loadComponent(id, file) {
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error("No se pudo cargar el archivo: " + file);
            const data = await response.text();
            document.getElementById(id).innerHTML = data;
            
            // Si es el header, inicializamos su lógica específica
            if (id === 'nav-placeholder') {
                initNavbarLogic();
            }
        } catch (error) {
            console.warn("Error en Fetch: Para ver el header/footer, usa Live Server (VS Code) o un servidor real.", error);
        }
    }

    // Ejecutar la carga
    loadComponent('nav-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');

    // 2. LÓGICA DEL NAVBAR (Scroll y Dropdowns)
    function initNavbarLogic() {
        const nav = document.querySelector('.navbar');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Reinicializar los Dropdowns de Bootstrap (necesario por carga asíncrona)
        const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
        dropdownElementList.map(function (dropdownToggleEl) {
            return new bootstrap.Dropdown(dropdownToggleEl);
        });

        // Smooth Scroll para los enlaces
        document.querySelectorAll('a.nav-link, a.dropdown-item').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith("#")) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // 3. CAROUSEL HERO
    const heroCarousel = document.querySelector('#heroCarousel');
    if(heroCarousel) {
        new bootstrap.Carousel(heroCarousel, { interval: 5000, pause: 'hover' });
    }

    // 4. PARALLAX CTA
    window.addEventListener('scroll', function() {
        const ctaSection = document.querySelector('.cta-serve-section');
        if (ctaSection && window.innerWidth > 992) {
            ctaSection.style.backgroundPositionY = -(window.scrollY * 0.1) + 'px';
        }
    });
});