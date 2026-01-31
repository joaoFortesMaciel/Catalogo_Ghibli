let filmeAtual = {};

function abrirDetalhes(elemento) {
    const d = elemento.dataset;

    // Objeto centralizado para o localStorage
    filmeAtual = {
        titulo: d.titulo,
        imagem: d.imagem,
        ano: d.ano,
        streaming: d.streaming
    };

    // Preenchimento de textos e imagens
    document.getElementById('m-titulo').innerText = d.titulo;
    document.getElementById('m-ano').innerText = d.ano;
    document.getElementById('m-diretor').innerText = d.diretor;
    document.getElementById('m-genero').innerText = d.genero;
    document.getElementById('m-linguagens').innerText = d.linguagens;
    document.getElementById('m-sinopse').innerText = d.sinopse;
    document.getElementById('m-img').src = d.imagem;
    
    // Onde assistir
    const streamingTxt = document.getElementById('m-streaming');
    if(streamingTxt) streamingTxt.innerText = `Onde assistir: ${d.streaming}`;

    gerarEstrelas(parseInt(d.nota));
    
    document.getElementById('modalDetalhes').style.display = 'flex';

        // Adicione isso no final da função abrirDetalhes, antes de abrir o modal
    const listaVerificacao = JSON.parse(localStorage.getItem('ghibliLista')) || [];
    const btn = document.getElementById('btn-lista');
    const jaExiste = listaVerificacao.some(f => f.titulo === d.titulo);

    if (jaExiste) {
        btn.innerHTML = '<i class="fas fa-heart"></i> Na sua Lista';
        btn.style.backgroundColor = "#e74c3c"; // Vermelho ou outra cor de destaque
        btn.style.color = "white";
    } else {
        btn.innerHTML = '<i class="fas fa-plus"></i> Adicionar à Lista';
        btn.style.backgroundColor = "#f1c40f";
        btn.style.color = "#1a1a1a";
    }

}

function fecharDetalhes() {
    document.getElementById('modalDetalhes').style.display = 'none';
}

function gerarEstrelas(nota) {
    const container = document.getElementById('m-estrelas');
    container.innerHTML = '★'.repeat(nota) + '☆'.repeat(5 - nota);
}

function toggleLista() {
    let lista = JSON.parse(localStorage.getItem('ghibliLista')) || [];
    const existeIndex = lista.findIndex(f => f.titulo === filmeAtual.titulo);
    const btn = document.getElementById('btn-lista'); // Certifique-se que o botão tem este ID

    if (existeIndex === -1) {
        lista.push(filmeAtual);
        // Feedback visual de sucesso
        btn.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
        btn.style.backgroundColor = "#2ecc71"; // Verde
        btn.style.color = "white";
    } else {
        lista.splice(existeIndex, 1);
        // Feedback visual de remoção
        btn.innerHTML = '<i class="fas fa-plus"></i> Adicionar à Lista';
        btn.style.backgroundColor = "#f1c40f"; // Volta ao amarelo
        btn.style.color = "#1a1a1a";
    }

    localStorage.setItem('ghibliLista', JSON.stringify(lista));

    // Opcional: Volta o texto original após 2 segundos se quiser
    setTimeout(() => {
        if (lista.findIndex(f => f.titulo === filmeAtual.titulo) !== -1) {
            btn.innerHTML = '<i class="fas fa-heart"></i> Na sua Lista';
        }
    }, 2000);
}

// Fecha o modal ao clicar fora da caixa de conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('modalDetalhes');
    if (event.target === modal) {
        fecharDetalhes();
    }
}