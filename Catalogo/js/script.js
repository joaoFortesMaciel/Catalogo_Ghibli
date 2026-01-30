const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const slideInterval = 8000; // 8 segundos

function nextSlide() {
    // Remove a classe 'active' do slide atual
    slides[currentSlide].classList.remove('active');
    
    // Calcula o próximo slide (volta ao zero se chegar no fim)
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Adiciona a classe 'active' ao novo slide
    slides[currentSlide].classList.add('active');
}

// Inicia o loop
setInterval(nextSlide, slideInterval);