
const API_URL = window.API_URL;

const tabela = document.getElementById("lista-pontos");
const mensagem = document.getElementById("mensagem-pontos");
const campoBusca = document.getElementById("buscar-pontos");

let pontos = [];

// Buscar os pontos na API
async function carregarPontos() {
    try {
        mensagem.textContent = "Carregando pontos...";

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os pontos.");
        }

        pontos = await resposta.json();

        mostrarPontos(pontos);

    } catch (erro) {
        mensagem.textContent = erro.message;
    }
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

        const nome = document.createElement("td");
        nome.textContent = ponto.name;

        const descricao = document.createElement("td");
        descricao.textContent = ponto.description || "Sem descrição";

        const latitude = document.createElement("td");
        latitude.textContent = ponto.latitude;

        const longitude = document.createElement("td");
        longitude.textContent = ponto.longitude;

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
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível excluir o ponto.");
        }

        alert("Ponto excluído com sucesso!");

        carregarPontos();

    } catch (erro) {
        alert(erro.message);
    }
}

// Iniciar a listagem
carregarPontos();
