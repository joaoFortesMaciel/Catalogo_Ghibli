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
    let lista = JSON.parse(localStorage.getItem('ghibliLista')) || [];
    lista = lista.filter(f => f.titulo !== titulo);
    
    localStorage.setItem('ghibliLista', JSON.stringify(lista));
    location.reload();
}