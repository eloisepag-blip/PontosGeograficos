const API_URL = window.API_URL;

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const mensagem = document.getElementById("mensagem-ponto");
const detalhes = document.getElementById("detalhes-ponto");
const botaoExcluir = document.getElementById("botao-excluir");
const botaoEditar = document.getElementById("botao-editar");

botaoEditar.style.pointerEvents = "none";
botaoEditar.style.opacity = "0.5";
botaoExcluir.disabled = true;

async function buscarPonto() {
    if (!id) {
        mensagem.textContent = "ID do ponto não informado.";
        detalhes.style.display = "none";
        return;
    }

    try {
        mensagem.textContent = "Carregando ponto...";

        const resposta = await fetch(`${API_URL}/${id}`);

        if (resposta.status === 404) {
            throw new Error("Ponto não encontrado.");
        }

        if (!resposta.ok) {
             throw new Error("Ocorreu um erro ao carregar o ponto. Tente novamente.");
        }

        const ponto = await resposta.json();

        document.getElementById("nome-ponto").textContent = ponto.name;
        document.getElementById("descricao-ponto").textContent = ponto.description || "Sem descrição";
        document.getElementById("latitude-ponto").textContent = ponto.latitude;
        document.getElementById("longitude-ponto").textContent = ponto.longitude;

        document.getElementById("botao-editar").href = `formulario.html?id=${id}`;

        botaoEditar.style.pointerEvents = "auto";
        botaoEditar.style.opacity = "1";
        botaoExcluir.disabled = false;

        mensagem.textContent = "";

    } catch (erro) {
    mensagem.textContent = erro.message;
    detalhes.style.display = "none";
    botaoEditar.style.pointerEvents = "none";
    botaoEditar.style.opacity = "0.5";
    botaoExcluir.disabled = true;
}
}

buscarPonto();

// Excluir ponto
botaoExcluir.addEventListener("click", async function () {
    if (botaoExcluir.disabled) {
    return;
    }
    if (!id) {
        return;
    }

    const confirmar = confirm("Tem certeza que deseja excluir este ponto?");

    if (!confirmar) {
        return;
    }

    botaoExcluir.disabled = true;
    botaoExcluir.textContent = "Excluindo...";

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
    botaoExcluir.disabled = false;
    botaoExcluir.textContent = "Excluir";
    } 
});
