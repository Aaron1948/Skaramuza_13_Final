// SLIDER DE IMAGENES

const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 0;
let slideInterval;

if (slides) {
    function showSlide(index) {
        const slideWidth = slide[0].clientWidth;
        slides.style.transform = `translateX(${- index * slideWidth}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex < slide.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000); 
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Eventos para los botones de navegación
    prevButton.addEventListener('click', () => {
        stopSlider();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slide.length - 1;
        showSlide(currentIndex);
        startSlider();
    });

    nextButton.addEventListener('click', () => {
        stopSlider();
        nextSlide();
        startSlider();
    });

    // Iniciar el slider automáticamente
    startSlider();
} else {
    console.error('El elemento .slides no se encontró en el DOM.');
}