const API_URL = window.API_URL;

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const mensagem = document.getElementById("mensagem-ponto");
const detalhes = document.getElementById("detalhes-ponto");
const botaoExcluir = document.getElementById("botao-excluir");

async function buscarPonto() {
    if (!id) {
        mensagem.textContent = "ID do ponto não informado.";
        detalhes.style.display = "none";
        return;
    }

    try {
        mensagem.textContent = "Carregando ponto...";

        const resposta = await fetch(`${API_URL}/${id}`);

        if (!resposta.ok) {
            throw new Error("Não foi possível buscar o ponto.");
        }

        const ponto = await resposta.json();

        document.getElementById("nome-ponto").textContent = ponto.name;
        document.getElementById("descricao-ponto").textContent = ponto.description || "Sem descrição";
        document.getElementById("latitude-ponto").textContent = ponto.latitude;
        document.getElementById("longitude-ponto").textContent = ponto.longitude;

        document.getElementById("botao-editar").href = `formulario.html?id=${id}`;

        mensagem.textContent = "";

    } catch (erro) {
        mensagem.textContent = erro.message;
        detalhes.style.display = "none";
        botaoExcluir.disabled = true;
    }
}

buscarPonto();

// Excluir ponto
botaoExcluir.addEventListener("click", async function () {
    if (!id) {
        return;
    }

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
        window.location.href = "index.html";

    } catch (erro) {
        alert(erro.message);
    }
});
