let filmeAtual = {};

function abrirDetalhes(elemento) {
    const d = elemento.dataset;

    // Criando o objeto com os dados do filme
    filmeAtual = {
        titulo: d.titulo,
        imagem: d.imagem,
        ano: d.ano,
        streaming: d.streaming
    };

    // Preenchimento do Modal
    document.getElementById('m-titulo').innerText = d.titulo;
    document.getElementById('m-ano').innerText = d.ano;
    document.getElementById('m-diretor').innerText = d.diretor;
    document.getElementById('m-genero').innerText = d.genero;
    document.getElementById('m-linguagens').innerText = d.linguagens;
    document.getElementById('m-sinopse').innerText = d.sinopse;
    document.getElementById('m-img').src = d.imagem;
    
    const streamingTxt = document.getElementById('m-streaming');
    if(streamingTxt) streamingTxt.innerText = `Onde assistir: ${d.streaming}`;

    gerarEstrelas(parseInt(d.nota));
    
    document.getElementById('modalDetalhes').style.display = 'flex';

    // Lógica do Botão de Favoritos (Verificação)
    atualizarBotaoLista(d.titulo);
}

// Função auxiliar para evitar repetição de código
function atualizarBotaoLista(titulo) {
    const listaVerificacao = JSON.parse(localStorage.getItem('ghibliLista')) || [];
    const btn = document.getElementById('btn-lista');
    const jaExiste = listaVerificacao.some(f => f.titulo === titulo);

    if (jaExiste) {
        btn.innerHTML = '<i class="fas fa-heart"></i> Na sua Lista';
        btn.style.backgroundColor = "#e74c3c"; 
        btn.style.color = "white";
    } else {
        btn.innerHTML = '<i class="fas fa-plus"></i> Adicionar à Lista';
        btn.style.backgroundColor = "#f1c40f";
        btn.style.color = "#1a1a1a";
    }
}

function fecharDetalhes() {
    document.getElementById('modalDetalhes').style.display = 'none';
    filmeAtual = {}; // Limpa o filme atual por segurança
}

function gerarEstrelas(nota) {
    const container = document.getElementById('m-stars'); // Verifique se o ID é m-estrelas ou m-stars
    if(container) {
        container.innerHTML = '★'.repeat(nota) + '☆'.repeat(5 - nota);
    }
}

function toggleLista() {
    let lista = JSON.parse(localStorage.getItem('ghibliLista')) || [];
    const existeIndex = lista.findIndex(f => f.titulo === filmeAtual.titulo);
    const btn = document.getElementById('btn-lista');

    if (existeIndex === -1) {
        lista.push(filmeAtual);
        btn.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
        btn.style.backgroundColor = "#2ecc71";
        btn.style.color = "white";
        
        // Se quiser adicionar o efeito de confete aqui:
        // confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 } });
    } else {
        lista.splice(existeIndex, 1);
        btn.innerHTML = '<i class="fas fa-trash"></i> Removido';
        btn.style.backgroundColor = "#95a5a6";
        btn.style.color = "white";
    }

    localStorage.setItem('ghibliLista', JSON.stringify(lista));

    // Retorna o botão ao estado normal após 2 segundos
    setTimeout(() => {
        atualizarBotaoLista(filmeAtual.titulo);
    }, 2000);
}

// Fecha modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modalDetalhes');
    if (event.target === modal) {
        fecharDetalhes();
    }
}

// Busca por filmes definitiva
const inputBusca = document.getElementById('input-busca');

if (inputBusca) {
    inputBusca.addEventListener('input', (e) => {
        const termoBusca = e.target.value.toLowerCase().trim();
        // Seleciona todos os elementos que têm a borda e o fundo (o card completo)
        const cards = document.querySelectorAll('.card'); 

        cards.forEach(card => {
            // Buscamos o título dentro do card atual
            const tituloElemento = card.querySelector('h3');
            
            // Se o card não tiver um h3 (pode acontecer em estruturas diferentes), 
            // vamos tentar buscar no alt da imagem como backup
            const tituloText = tituloElemento ? 
                               tituloElemento.innerText.toLowerCase() : 
                               card.querySelector('img').alt.toLowerCase();

            if (tituloText.includes(termoBusca)) {
                // Se o termo estiver no título, o card fica visível
                card.style.display = ""; 
                card.style.opacity = "1";
            } else {
                // Se NÃO estiver, o card desaparece TOTALMENTE do layout
                card.style.display = "none";
                card.style.opacity = "0";
            }
        });
    });
}