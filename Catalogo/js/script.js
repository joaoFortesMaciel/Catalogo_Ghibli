const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const slideInterval = 5500;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, slideInterval);