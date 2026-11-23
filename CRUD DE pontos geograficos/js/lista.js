
    const API_URL = window.API_URL;

    const tabela = document.getElementById("lista-pontos");
    const mensagem = document.getElementById("mensagem-pontos");
    const campoBusca = document.getElementById("buscar-pontos");

    let pontos = [];

    // Buscar os pontos na API
    async function carregarPontos() {
        try {
            mensagem.textContent = "Carregando pontos...";

            pontos = await listarPontos();

            const pesquisa = campoBusca.value.toLowerCase().trim();

const pontosFiltrados = pontos.filter(function (ponto) {
    return ponto.name.toLowerCase().includes(pesquisa);
});

mostrarPontos(pontosFiltrados);
        const mensagemSucesso = sessionStorage.getItem("mensagemSucesso");

        if (mensagemSucesso) {
            mensagem.textContent = mensagemSucesso;
            sessionStorage.removeItem("mensagemSucesso");
        }

        } catch (erro) {
            mensagem.textContent = erro.message;
        }
    }
    function criarCelula(texto) {
        const celula = document.createElement("td");
        celula.textContent = texto;
        return celula;
    }

  
    function criarLink(texto, destino) {
    const link = document.createElement("a");
    link.href = destino;
    link.textContent = texto;
    return link;
    }

    // Criar botões reutilizáveis
    function criarBotao(texto, acao) {
    const botao = document.createElement("button");
    botao.textContent = texto;
    botao.type = "button";
    botao.addEventListener("click", acao);
    return botao;
    }

    function criarLinhaPonto(ponto) {
        const linha = document.createElement("tr");
        const nome = document.createElement("td");

        const linkNome = criarLink(
            ponto.name,
            `ponto.html?id=${ponto.id}`
        );

        nome.appendChild(linkNome);
        const descricao = criarCelula(ponto.description || "Sem descrição");
        const latitude = criarCelula(ponto.latitude);
        const longitude = criarCelula(ponto.longitude);
        const acoes = document.createElement("td");

        const botaoVer = criarLink("Ver", `ponto.html?id=${ponto.id}`);

        const botaoEditar = criarLink("Editar", `formulario.html?id=${ponto.id}`);

        const botaoExcluir = criarBotao("Excluir", function () {
        excluirPonto(ponto.id);
        });

        acoes.append(botaoVer, botaoEditar, botaoExcluir);

        linha.append(nome, descricao, latitude, longitude, acoes);

        return linha;
    }

    function mostrarPontos(lista) {
        tabela.innerHTML = "";

        if (lista.length === 0) {
            mensagem.textContent = "Nenhum ponto encontrado.";
            return;
        }

        mensagem.textContent = "";

        lista.forEach(function (ponto) {
            const linha = criarLinhaPonto(ponto);
            tabela.appendChild(linha);
        });
    }

    // Filtrar pontos pelo nome
    campoBusca.addEventListener("input", function () {
        const pesquisa = campoBusca.value.toLowerCase();

        const resultado = pontos.filter(function (ponto) {
            return ponto.name.toLowerCase().includes(pesquisa);
        });

        mostrarPontos(resultado);

    });

    // Excluir um ponto
    async function excluirPonto(id) {
        const confirmar = await new Promise((resolve) => {
        const modal = document.getElementById("modal-exclusao");
        const botaoCancelar = document.getElementById("cancelar-exclusao");
        const botaoConfirmar = document.getElementById("confirmar-exclusao");

        modal.hidden = false;

        botaoCancelar.onclick = () => {
            modal.hidden = true;
            resolve(false);
        };

        botaoConfirmar.onclick = () => {
            modal.hidden = true;
            resolve(true);
        };
    });

    if (!confirmar) {
        return;
    }

        try {
           await excluirPontoAPI(id);

           await carregarPontos();

            mensagem.textContent = "Ponto excluído com sucesso!";

        } catch (erro) {
            alert(erro.message);
        }
    }

    carregarPontos();
