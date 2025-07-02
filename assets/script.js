// Gestion des modals et carousel
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Ouvrir la modal correspondante au projet cliqué
    projectCards.forEach(card => {
        card.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project');
            const modal = document.getElementById(`modal${projectId}`);
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Empêche le défilement du body
        });
    });
    
    // Fermer la modal en cliquant sur le bouton de fermeture
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Réactive le défilement du body
        });
    });
    
    // Fermer la modal en cliquant en dehors du contenu
    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
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
        nextButton.addEventListener('click', function (e) {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        });

        // Bouton précédent
        prevButton.addEventListener('click', function (e) {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        });
        
        function updateCarousel() {
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    });
    
    // Empêche l'ouverture de la modal quand on clique sur 'Voir le projet'
    document.querySelectorAll('.project-button').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });
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

// --- Menu burger ---
const burgerMenu = document.getElementById('burger-menu');
burgerMenu.addEventListener('click', function() {
    document.body.classList.toggle('nav-open');
});
// --- Fin menu burger ---

// --- Fermeture menu burger avancée ---
const closeBurger = document.getElementById('close-burger');
const nav = document.querySelector('nav');

// Ferme le menu quand on clique sur la croix
if(closeBurger) {
    closeBurger.addEventListener('click', function() {
        document.body.classList.remove('nav-open');
    });
}
// Ferme le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if(window.innerWidth <= 768) {
            document.body.classList.remove('nav-open');
        }
    });
});
// Ferme le menu quand on clique à l'extérieur du menu
window.addEventListener('click', function(e) {
    if(document.body.classList.contains('nav-open') && window.innerWidth <= 768) {
        if(!nav.contains(e.target) && !burgerMenu.contains(e.target)) {
            document.body.classList.remove('nav-open');
        }
    }
});
// --- Fin fermeture menu burger avancée ---
    
    