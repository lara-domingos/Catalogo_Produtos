(function () {
    const CHAVE = 'cantinho_carrinho';
    const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
 
    const catalogo = (typeof PRODUTOS !== 'undefined') ? PRODUTOS : [];
    const porId = Object.fromEntries(catalogo.map(p => [p.id, p]));
 
    /* ---------- dados do carrinho ---------- */
    // Guarda só {id, qtd}. O preço sempre vem do catálogo (produtos.js).
    function ler() {
        try {
            const dados = JSON.parse(localStorage.getItem(CHAVE));
            if (!Array.isArray(dados)) return [];
            return dados.filter(i => porId[i.id] && Number.isInteger(i.qtd) && i.qtd > 0);
        } catch {
            return [];
        }
    }
 
    function salvar(itens) {
        try { localStorage.setItem(CHAVE, JSON.stringify(itens)); } catch { /* sem armazenamento */ }
        atualizarContador();
    }
 
    // Soma em centavos (inteiros) para não acumular erro de ponto flutuante.
    const centavos = p => Math.round(p.preco * 100);
    const valorItem = i => centavos(porId[i.id]) * i.qtd / 100;
    const total = itens => itens.reduce((soma, i) => soma + centavos(porId[i.id]) * i.qtd, 0) / 100;
    const quantidade = itens => itens.reduce((soma, i) => soma + i.qtd, 0);
 
    function adicionar(id) {
        const itens = ler();
        const existente = itens.find(i => i.id === id);
        if (existente) existente.qtd = Math.min(existente.qtd + 1, 99);
        else itens.push({ id, qtd: 1 });
        salvar(itens);
    }
 
    function alterarQtd(id, delta) {
        const itens = ler();
        const item = itens.find(i => i.id === id);
        if (!item) return;
        item.qtd = Math.min(item.qtd + delta, 99);
        salvar(itens.filter(i => i.qtd > 0));
    }
 
    function remover(id) {
        salvar(ler().filter(i => i.id !== id));
    }
 
    function limpar() {
        salvar([]);
    }
 
    /* ---------- ícone do carrinho no menu ---------- */
    function atualizarContador() {
        const badge = document.getElementById('cart-count');
        if (!badge) return;
        const n = quantidade(ler());
        badge.textContent = n > 99 ? '99+' : String(n);
        badge.hidden = n === 0;
    }
 
    function animarContador() {
        const badge = document.getElementById('cart-count');
        if (!badge) return;
        badge.classList.remove('bump');
        void badge.offsetWidth; // reinicia a animação
        badge.classList.add('bump');
    }
 
    /* ---------- helper para criar elementos ---------- */
    function el(tag, classe, texto) {
        const e = document.createElement(tag);
        if (classe) e.className = classe;
        if (texto !== undefined) e.textContent = texto;
        return e;
    }
 
    /* ---------- loja (index.html) ---------- */
    function criarCard(p) {
        const col = el('div', 'col');
        const card = el('article', 'card produto-card h-100');
        card.id = 'produto-' + p.id;
 
        const foto = el('div', 'produto-foto');
        const img = document.createElement('img');
        img.src = p.imagem;
        img.alt = p.nome;
        img.loading = 'lazy';
        img.addEventListener('error', () => { img.style.display = 'none'; });
        foto.appendChild(img);
 
        const corpo = el('div', 'card-body d-flex flex-column');
        corpo.appendChild(el('h4', 'produto-nome', p.nome));
        corpo.appendChild(el('p', 'produto-descricao', p.descricao));
 
        const rodape = el('div', 'produto-rodape');
        rodape.appendChild(el('span', 'produto-preco', moeda.format(p.preco)));
 
        const botao = el('button', 'btn btn-topete btn-comprar', 'Comprar');
        botao.type = 'button';
        let timer;
        botao.addEventListener('click', () => {
            adicionar(p.id);
            animarContador();
            botao.textContent = 'Adicionado';
            clearTimeout(timer);
            timer = setTimeout(() => { botao.textContent = 'Comprar'; }, 1200);
        });
        rodape.appendChild(botao);
 
        corpo.appendChild(rodape);
        card.append(foto, corpo);
        col.appendChild(card);
        return col;
    }
 
    function renderLoja() {
        const alvo = document.getElementById('loja-produtos');
        if (!alvo) return;
 
        const cats = (typeof CATEGORIAS !== 'undefined') ? CATEGORIAS : [];
        cats.forEach((cat, idx) => {
            const itens = catalogo.filter(p => p.categoria === cat.id);
            if (itens.length === 0) return;
 
            const titulo = el('div', 'grupo-titulo');
            titulo.appendChild(el('h3', '', cat.titulo));
            titulo.appendChild(el('p', '', cat.texto));
 
            const linha = el('div', 'row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4' + (idx < cats.length - 1 ? ' mb-5' : ''));
            itens.forEach(p => linha.appendChild(criarCard(p)));
 
            alvo.append(titulo, linha);
        });
    }
 
    /* ---------- página do carrinho (carrinho.html) ---------- */
    function renderCarrinho() {
        const lista = document.getElementById('carrinho-itens');
        if (!lista) return;
 
        const itens = ler();
        const vazio = document.getElementById('carrinho-vazio');
        const conteudo = document.getElementById('carrinho-conteudo');
 
        vazio.hidden = itens.length > 0;
        conteudo.hidden = itens.length === 0;
        lista.replaceChildren();
 
        itens.forEach(i => {
            const p = porId[i.id];
            const linha = el('div', 'item-carrinho');
 
            const info = el('div', 'item-info');
            info.appendChild(el('strong', '', p.nome));
            info.appendChild(el('span', 'item-unitario', moeda.format(p.preco) + ' cada'));
 
            const qtd = el('div', 'item-qtd');
            const menos = el('button', 'btn btn-outline-secondary btn-sm', '−');
            menos.type = 'button';
            menos.setAttribute('aria-label', 'Diminuir quantidade de ' + p.nome);
            menos.addEventListener('click', () => { alterarQtd(i.id, -1); renderCarrinho(); });
            const numero = el('span', 'item-numero', String(i.qtd));
            const mais = el('button', 'btn btn-outline-secondary btn-sm', '+');
            mais.type = 'button';
            mais.setAttribute('aria-label', 'Aumentar quantidade de ' + p.nome);
            mais.addEventListener('click', () => { alterarQtd(i.id, 1); renderCarrinho(); });
            qtd.append(menos, numero, mais);
 
            const subtotal = el('div', 'item-subtotal', moeda.format(valorItem(i)));
 
            const rem = el('button', 'btn btn-link btn-sm item-remover', 'Remover');
            rem.type = 'button';
            rem.addEventListener('click', () => { remover(i.id); renderCarrinho(); });
 
            linha.append(info, qtd, subtotal, rem);
            lista.appendChild(linha);
        });
 
        document.getElementById('carrinho-total').textContent = moeda.format(total(itens));
    }
 
    function iniciarFormularioPedido() {
        const form = document.getElementById('form-pedido');
        if (!form) return;
        const status = document.getElementById('pedido-status');
 
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
 
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
 
            const itens = ler();
            if (itens.length === 0) return;
 
            const botao = form.querySelector('button[type="submit"]');
            botao.disabled = true;
            botao.textContent = 'Enviando...';
 
            const resumo = itens
                .map(i => i.qtd + 'x ' + porId[i.id].nome + ' (' + moeda.format(valorItem(i)) + ')')
                .join('\n');
 
            const dados = new FormData(form);
            dados.set('pedido', resumo);
            dados.set('total', moeda.format(total(itens)));
 
            try {
                const resposta = await fetch(form.action, {
                    method: 'POST',
                    body: dados,
                    headers: { 'Accept': 'application/json' }
                });
                const json = await resposta.json();
 
                if (resposta.ok && (json.success === true || json.success === 'true')) {
                    limpar();
                    form.reset();
                    form.classList.remove('was-validated');
                    document.getElementById('carrinho-conteudo').hidden = true;
                    document.getElementById('carrinho-vazio').hidden = true;
                    document.getElementById('pedido-sucesso').hidden = false;
                } else {
                    throw new Error();
                }
            } catch {
                status.replaceChildren();
                status.appendChild(el('div', 'alert alert-danger', 'Não foi possível enviar o pedido. Tente novamente em instantes.'));
            } finally {
                botao.disabled = false;
                botao.textContent = 'Enviar pedido';
            }
        });
    }
 
    /* ---------- início ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        atualizarContador();
        renderLoja();
        renderCarrinho();
        iniciarFormularioPedido();
    });
 
    // se o carrinho mudar em outra aba, atualiza aqui também
    window.addEventListener('storage', () => { atualizarContador(); renderCarrinho(); });
})();