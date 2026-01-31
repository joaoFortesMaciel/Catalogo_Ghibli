document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid-favoritos');
    const msgVazia = document.getElementById('lista-vazia');
    const lista = JSON.parse(localStorage.getItem('ghibliLista')) || [];

    if (lista.length === 0) {
        if (msgVazia) msgVazia.style.display = 'block';
        return;
    }

    if (msgVazia) msgVazia.style.display = 'none';

    grid.classList.add('grid-lista');

    grid.innerHTML = lista.map(filme => `
        <article class="card">
            <img src="${filme.imagem}" alt="${filme.titulo}" loading="lazy">
            <div class="card-info">
                <h3>${filme.titulo}</h3>
                <span class="ano-info">${filme.ano}</span>
                <div class="streaming-tag">
                    <i class="fas fa-play-circle"></i> ${filme.streaming || 'Não informado'}
                </div>
                <button onclick="removerDaLista('${filme.titulo}')" class="btn-remover">
                    <i class="fas fa-trash-alt"></i> Remover
                </button>
            </div>
        </article>
    `).join('');
});

function removerDaLista(titulo) {
    const cards = document.querySelectorAll('.card');
    
    const cardParaRemover = Array.from(cards).find(card => {
        return card.querySelector('h3').innerText === titulo;
    });

    if (cardParaRemover) {
        cardParaRemover.classList.add('removendo');

        setTimeout(() => {
            let lista = JSON.parse(localStorage.getItem('ghibliLista')) || [];
            lista = lista.filter(f => f.titulo !== titulo);
            localStorage.setItem('ghibliLista', JSON.stringify(lista));

            cardParaRemover.remove();

            if (lista.length === 0) {
                const msgVazia = document.getElementById('lista-vazia');
                if (msgVazia) msgVazia.style.display = 'block';
            }
        }, 500); 
    }
}