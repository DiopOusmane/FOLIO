     // Gestion des modals et carousel
     document.addEventListener('DOMContentLoaded', function() {
        const projectCards = document.querySelectorAll('.project-card');
        const modals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.close-modal');
        
        // Ouvrir la modal correspondante au projet cliqué
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                const modal = document.getElementById(`modal${projectId}`);
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Empêche le défilement du body
            });
        });
        
        // Fermer la modal en cliquant sur le bouton de fermeture
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                modal.classList.remove('show');
                document.body.style.overflow = 'auto'; // Réactive le défilement du body
            });
        });
        
        // Fermer la modal en cliquant en dehors du contenu
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            });
        });
        
        // Gestion des carousels
        const carousels = document.querySelectorAll('.carousel');
        
        carousels.forEach(carousel => {
            const carouselInner = carousel.querySelector('.carousel-inner');
            const prevButton = carousel.querySelector('.carousel-prev');
            const nextButton = carousel.querySelector('.carousel-next');
            const items = carousel.querySelectorAll('.carousel-item');
            let currentIndex = 0;
            
            // Configuration initiale
            updateCarousel();
            
            // Bouton suivant
            nextButton.addEventListener('click', function(e) {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            });
            
            // Bouton précédent
            prevButton.addEventListener('click', function(e) {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateCarousel();
            });
            
            function updateCarousel() {
                carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        });

        // --- Ajout gestion active section dans navbar ---
        const sections = Array.from(document.querySelectorAll('section'));
        const navLinks = document.querySelectorAll('.nav-list a');
        function updateActiveNavLink() {
            const scrollY = window.scrollY;
            sections.forEach((section, i) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - 100) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLinks[i].classList.add('active');
                }
            });
        }
        window.addEventListener('scroll', updateActiveNavLink);
        updateActiveNavLink(); // Initialisation
        // --- Fin gestion active section dans navbar ---

    //     // Défilement fluide des logos (marquee JS)
    //     document.querySelectorAll('.logo-banner').forEach((banner, i) => {
    //         const inner = banner.querySelector('.logo-banner-inner');
    //         if (!inner) return;
    //         // Duplique dynamiquement jusqu'à ce que la séquence soit assez longue
    //         const bannerWidth = banner.offsetWidth;
    //         let originalContent = inner.innerHTML;
    //         while (inner.scrollWidth < bannerWidth * 2.5) {
    //             inner.innerHTML += originalContent;
    //         }
    //         let scrollAmount = 0;
    //         let paused = false;
    //         // Direction et vitesse uniques par bannière
    //         const baseSpeed = 1;
    //         const speed = baseSpeed + (i * 0.5); // chaque ligne va plus vite
    //         const direction = i % 2 === 0 ? 1 : -1; // une sur deux va à gauche
    //         const resetAt = inner.scrollWidth / 2;

    //         function animate() {
    //             if (!paused) {
    //                 scrollAmount += speed * direction;
    //                 if (direction === 1 && scrollAmount >= resetAt) {
    //                     scrollAmount = 0;
    //                 } else if (direction === -1 && scrollAmount <= 0) {
    //                     scrollAmount = resetAt;
    //                 }
    //                 inner.style.transform = `translateX(${-scrollAmount}px)`;
    //             }
    //             requestAnimationFrame(animate);
    //         }
    //         banner.addEventListener('mouseenter', () => { paused = true; });
    //         banner.addEventListener('mouseleave', () => { paused = false; });
    //         animate();
    //     });
    // });
    document.querySelectorAll('.logo-banner').forEach((banner, i) => {
        const inner = banner.querySelector('.logo-banner-inner');
        if (!inner) return;
    
        const bannerWidth = banner.offsetWidth;
        const originalContent = inner.innerHTML;
        // Duplication plus longue pour un scroll plus fluide
        while (inner.scrollWidth < bannerWidth * 6) {
            inner.innerHTML += originalContent;
        }
        let scrollAmount = 0;
        let paused = false;
    
        const baseSpeed = 1;
        const speed = baseSpeed + (i * 0.5);
        const direction = i % 2 === 0 ? 1 : -1;
        const scrollLimit = inner.scrollWidth / 2;
    
        function animate() {
            if (!paused) {
                scrollAmount += speed * direction;
                // Évite de trop accumuler les pixels
                scrollAmount %= scrollLimit;
    
                inner.style.transform = `translate3d(${-scrollAmount}px, 0, 0)`;
            }
            requestAnimationFrame(animate);
        }
    
        banner.addEventListener('mouseenter', () => paused = true);
        banner.addEventListener('mouseleave', () => paused = false);
    
        animate();
    });

    // Empêche l'ouverture de la modal quand on clique sur 'Voir le projet'
    document.querySelectorAll('.project-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});