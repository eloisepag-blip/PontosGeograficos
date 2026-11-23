
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const mensagem = document.getElementById("mensagem-ponto");
const detalhes = document.getElementById("detalhes-ponto");
const botaoExcluir = document.getElementById("botao-excluir");
const botaoEditar = document.getElementById("botao-editar");

// Desabilitar os botões inicialmente
botaoEditar.style.pointerEvents = "none";
botaoEditar.style.opacity = "0.5";
botaoExcluir.disabled = true;

// Exibir os dados do ponto na tela
function exibirPonto(ponto) {
    document.getElementById("nome-ponto").textContent = ponto.name;
    document.getElementById("descricao-ponto").textContent = ponto.description || "Sem descrição";
    document.getElementById("latitude-ponto").textContent = ponto.latitude;
    document.getElementById("longitude-ponto").textContent = ponto.longitude;

    botaoEditar.href = `formulario.html?id=${id}`;
    botaoEditar.style.pointerEvents = "auto";
    botaoEditar.style.opacity = "1";
    botaoExcluir.disabled = false;

    mensagem.textContent = "";
}

// Buscar os dados do ponto
async function carregarPonto() {
    if (!id) {
        mensagem.textContent = "ID do ponto não informado.";
        detalhes.style.display = "none";
        return;
    }

    try {
        mensagem.textContent = "Carregando ponto...";

        const ponto = await buscarPonto(id);

        exibirPonto(ponto);

    } catch (erro) {
        mensagem.textContent = erro.message;
        detalhes.style.display = "none";
        botaoEditar.style.pointerEvents = "none";
        botaoEditar.style.opacity = "0.5";
        botaoExcluir.disabled = true;
    }
}

// Excluir o ponto
async function excluirPonto() {
    if (botaoExcluir.disabled || !id) {
        return;
    }

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

    botaoExcluir.disabled = true;
    botaoExcluir.textContent = "Excluindo...";

    try {
        await excluirPontoAPI(id);

        sessionStorage.setItem("mensagemSucesso", "Ponto excluído com sucesso!");
window.location.href = "index.html";

    } catch (erro) {
        mensagem.textContent = erro.message;
        botaoExcluir.disabled = false;
        botaoExcluir.textContent = "Excluir";
    }
}

carregarPonto();

botaoExcluir.addEventListener("click", excluirPonto);
