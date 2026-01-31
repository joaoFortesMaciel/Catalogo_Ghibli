document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid-favoritos');
    const msgVazia = document.getElementById('lista-vazia');
    const lista = JSON.parse(localStorage.getItem('ghibliLista')) || [];

    if (lista.length === 0) {
        if (msgVazia) msgVazia.style.display = 'block';
        return;
    }

    if (msgVazia) msgVazia.style.display = 'none';

    // Garante que a classe de grid esteja presente
    grid.classList.add('grid-lista');

    // Mapeia os filmes e insere no HTML
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
    // 1. Localiza todos os cards na tela
    const cards = document.querySelectorAll('.card');
    
    // 2. Encontra o card específico que tem o título correspondente
    const cardParaRemover = Array.from(cards).find(card => {
        return card.querySelector('h3').innerText === titulo;
    });

    if (cardParaRemover) {
        // 3. Adiciona a classe de animação
        cardParaRemover.classList.add('removendo');

        // 4. Espera a animação terminar (500ms) para remover do banco e da tela
        setTimeout(() => {
            let lista = JSON.parse(localStorage.getItem('ghibliLista')) || [];
            lista = lista.filter(f => f.titulo !== titulo);
            localStorage.setItem('ghibliLista', JSON.stringify(lista));

            // Remove o elemento do HTML sem recarregar a página
            cardParaRemover.remove();

            // 5. Se a lista ficou vazia, mostra a mensagem de lista vazia
            if (lista.length === 0) {
                const msgVazia = document.getElementById('lista-vazia');
                if (msgVazia) msgVazia.style.display = 'block';
            }
        }, 500); 
    }
}