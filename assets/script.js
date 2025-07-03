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
    
    