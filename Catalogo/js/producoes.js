function abrirDetalhes(elemento) {
    // 1. Pegar os dados que estão escondidos no HTML do card (data-attributes)
    const dados = elemento.dataset;

    // 2. Preencher os textos do Modal
    document.getElementById('m-titulo').innerText = dados.titulo;
    document.getElementById('m-ano').innerText = dados.ano;
    document.getElementById('m-diretor').innerText = dados.diretor;
    document.getElementById('m-genero').innerText = dados.genero;
    document.getElementById('m-linguagens').innerText = dados.linguagens;
    document.getElementById('m-sinopse').innerText = dados.sinopse;
    
    // 3. Atualizar a imagem do modal
    document.getElementById('m-img').src = dados.imagem;

    // 4. Gerar as estrelas dinamicamente
    const nota = parseInt(dados.nota); // Converte "5" texto para número 5
    let estrelasHTML = '';
    
    // Cria estrelas cheias
    for(let i=0; i < nota; i++) {
        estrelasHTML += '★'; 
    }
    // Completa com estrelas vazias até chegar em 5
    for(let i=nota; i < 5; i++) {
        estrelasHTML += '☆';
    }
    
    document.getElementById('m-estrelas').innerHTML = estrelasHTML;
    document.getElementById('m-estrelas').style.color = "#FFD700"; // Cor dourada

    // 5. Mostrar o Modal
    document.getElementById('modalDetalhes').style.display = 'flex';
}

function fecharDetalhes() {
    document.getElementById('modalDetalhes').style.display = 'none';
}

// Fechar se clicar fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('modalDetalhes');
    if (event.target == modal) {
        fecharDetalhes();
    }
}