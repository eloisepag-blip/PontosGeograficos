
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

            mostrarPontos(pontos);

        } catch (erro) {
            mensagem.textContent = erro.message;
        }
    }
    function criarCelula(texto) {
        const celula = document.createElement("id");
        celula.textContent = texto;
        return celula;
    }

    // Mostrar os pontos na tabela
    function mostrarPontos(lista) {
        tabela.innerHTML = "";

        if (lista.length === 0) {
            mensagem.textContent = "Nenhum ponto encontrado.";
            return;
        }

        mensagem.textContent = "";

        lista.forEach(function (ponto) {
            const linha = document.createElement("tr");

            const nome = criarCelula(ponto.name);
            const descricao = criarCelula(ponto.description || "Sem descrição");
            const latitude = criarCelula(ponto.latitude);
            const longitude = criarCelula(ponto.longitude);

            const acoes = document.createElement("td");

            const botaoVer = document.createElement("a");
            botaoVer.href = `ponto.html?id=${ponto.id}`;
            botaoVer.textContent = "Ver";

            const botaoEditar = document.createElement("a");
            botaoEditar.href = `formulario.html?id=${ponto.id}`;
            botaoEditar.textContent = "Editar";

            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.type = "button";
            botaoExcluir.addEventListener("click", function () {
                excluirPonto(ponto.id);
            });

            acoes.append(botaoVer, " | ", botaoEditar, " | ", botaoExcluir);

            linha.append(nome, descricao, latitude, longitude, acoes);

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
        const confirmar = confirm("Tem certeza que deseja excluir este ponto?");

        if (!confirmar) {
            return;
        }

        try {
           await excluirPontoAPI(id);

            alert("Ponto excluído com sucesso!");

            carregarPontos();

        } catch (erro) {
            alert(erro.message);
        }
    }

    // Iniciar a listagem
    carregarPontos();