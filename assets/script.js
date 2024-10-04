// Tableau avec les images du slider

const slides = [
	{
		"src":"./assets/images/slideshow/slide1.jpg",
		"image":"slide1.jpg",
		"alt":"Banner Print-it",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"src":"./assets/images/slideshow/slide2.jpg",
		"image":"slide2.jpg",
		"alt":"Photo d'un open-space",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"src":"./assets/images/slideshow/slide3.jpg",
		"image":"slide3.jpg",
		"alt":"Photo d'un nuancier de couleurs",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"src":"./assets/images/slideshow/slide4.png",
		"image":"slide4.png",
		"alt":"Illustration avec des autocollants amusants",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]

// Index de l'image actuelle

let currentIndex = 0;

// Variable pour stocker l'identifiant de l'intervalle d'autoplay

let autoplayId;

// Déclaration des variables qui seront utiles

const bannerImg = document.querySelector('.banner-img');

const leftArrow = document.querySelector('.arrow_left');

const rightArrow = document.querySelector('.arrow_right');

const dotsContainer = document.getElementById('dotsContainer');

const tagLineElement = document.querySelector('.tagline');

// Fonction pour démarrer l'autoplay

function startAutoplay(interval = 5000) {

    // Arrêter tout autoplay existant
    stopAutoplay();

    autoplayId = setInterval(() => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlide();
    }, interval);
}

// Fonction pour arrêter l'autoplay

function stopAutoplay() {
    clearInterval(autoplayId);
}

// Fonction pour mettre à jour les slides

function updateSlide() {

    // Diminuer l'opacité avant de changer l'image
    bannerImg.style.opacity = 0;

    // Diminuer l'opacité avant de changer la tagline
    tagLineElement.style.opacity = 0;

    setTimeout(() => {

    // Mettre à jour l'image
    bannerImg.src = slides[currentIndex].src;

	// Mettre à jour l'attribut alt
	bannerImg.alt = slides[currentIndex].alt;

	// Mettre à jour la tagLine
    tagLineElement.innerHTML = slides[currentIndex].tagLine;

    // Augmenter l'opacité pour montrer la nouvelle image
    bannerImg.style.opacity = 1;

    // Augmenter l'opacité pour montrer la nouvelle tagline
    tagLineElement.style.opacity = 1;

    // Mettre à jour les dot_selected
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('dot_selected');
        } else {
            dot.classList.remove('dot_selected');
        }
    });

// Délai avant de changer l'image et la tagline et de remettre l'opacité
}, 1000);

}

// Délai de transition entre les slides

bannerImg.style.transition = "opacity 1s ease";
tagLineElement.style.transition = "opacity 1s ease";

// Ajout de gestionnaires d'événements sur les flèches

leftArrow.addEventListener('click', function() {
	currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateSlide();

    // Redémarrer l'autoplay après interaction manuelle
    startAutoplay();
});

rightArrow.addEventListener('click', function() {
	currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateSlide();

    // Redémarrer l'autoplay après interaction manuelle
    startAutoplay();
});

// Modifie le curseur de la souris au survol des flèches afin d'améliorer l'accessibilité

document.getElementById('arrowLeft').addEventListener('mouseover', function() {
    this.style.cursor = 'pointer';
});

document.getElementById('arrowLeft').addEventListener('mouseout', function() {
    this.style.cursor = 'default';
});

document.getElementById('arrowRight').addEventListener('mouseover', function() {
    this.style.cursor = 'pointer';
});

document.getElementById('arrowRight').addEventListener('mouseout', function() {
    this.style.cursor = 'default';
});

// Comptage des entrées du tableau et ajout des bullet-points correspondants

// S'assure que le code est exécuté après le chargement complet du DOM.
document.addEventListener('DOMContentLoaded', function() {

    // Compter le nombre d'éléments dans le tableau slides
    const numberOfSlides = slides.length;

    // Générer les bullet points en fonction du nombre d'éléments dans slides
    for (let i = 0; i < numberOfSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';

		 // Modifie le curseur de la souris au survol des dots afin d'améliorer l'accessibilité
		 dot.addEventListener('mouseover', function() {
            this.style.cursor = 'pointer';
        });

        dot.addEventListener('mouseout', function() {
            this.style.cursor = 'default';
        });

        // Ajout de gestionnaires d'événements sur les dots

		dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlide();

            // Redémarrer l'autoplay après interaction manuelle
            startAutoplay();
        });
        dotsContainer.appendChild(dot);
    }
	// Mise à jour initiale de la diapositive et démarrage de l'autoplay
    updateSlide();
    startAutoplay();
});

// Déclaration du conteneur du slider

const sliderContainer = document.getElementById('banner');

// Fonction pour mettre en pause l'autoplay lors du survol

sliderContainer.addEventListener('mouseover', function() {
    stopAutoplay();
});

// Fonction pour redémarrer l'autoplay lorsque la souris quitte le diaporama
sliderContainer.addEventListener('mouseout', function() {
    startAutoplay();
});