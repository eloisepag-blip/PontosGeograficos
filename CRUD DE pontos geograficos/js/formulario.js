
const API_URL = window.API_URL;

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const formulario = document.getElementById("form-ponto");
const titulo = document.querySelector("h2");
const botaoSalvar = formulario.querySelector('button[type="submit"]');

function mostrarErro(campo, mensagem) {
    const elementoErro = document.getElementById(`erro-${campo}`);

    elementoErro.textContent = mensagem;
}

async function carregarPonto() {
    try {
       const ponto = await buscarPonto(id);

        document.getElementById("name").value = ponto.name;
        document.getElementById("description").value = ponto.description || "";
        document.getElementById("latitude").value = ponto.latitude;
        document.getElementById("longitude").value = ponto.longitude;

        titulo.textContent = "Editar Ponto Geográfico";

    } catch (erro) {
       mostrarErro("name", erro.message);
    }
}

if (id) {
    titulo.textContent = "Editar Ponto Geográfico";
    botaoSalvar.textContent = "Atualizar";

    carregarPonto();
}

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const latitudeVazia = document.getElementById("latitude").value.trim() === "";
    const longitudeVazia = document.getElementById("longitude").value.trim() === "";
    
    mostrarErro("name", "");
    mostrarErro("latitude", "");
    mostrarErro("longitude", "");

    mostrarErro("description", "");

    if (latitudeVazia) {
    mostrarErro("latitude", "A latitude não pode estar vazia.");
}

if (longitudeVazia) {
    mostrarErro("longitude", "A longitude não pode estar vazia.");
}


    const ponto = {
        name: document.getElementById("name").value.trim(),
        description: document.getElementById("description").value.trim(),
        latitude: Number(document.getElementById("latitude").value),
        longitude: Number(document.getElementById("longitude").value)
    };

    if (ponto.name === "") {
    mostrarErro("name", "O nome do ponto não pode estar vazio.");
}

if (ponto.name.length > 100) {
    mostrarErro("name", "O nome deve ter no máximo 100 caracteres.");
}

if (ponto.description.length > 255) {
    mostrarErro("description", "A descrição deve ter no máximo 255 caracteres.");
}

    if(
        document.getElementById("latitude").value.trim() === "" ||
        !Number.isFinite(ponto.latitude) ||
        ponto.latitude < -90 ||
        ponto.latitude > 90
    ) {
        mostrarErro("latitude", "A latitude deve estar entre -90 e 90. ");
    }

    if (
        document.getElementById("longitude").value.trim() ==="" ||
        !Number.isFinite(ponto.longitude) ||
        ponto.longitude < -180 ||
        ponto.longitude > 180
    ){
        mostrarErro("longitude", "A longitude deve estar entre -180 e 180.");
    }

    if (
    ponto.name === "" ||
    ponto.name.length > 100 ||
    ponto.description.length > 255 ||
    latitudeVazia ||
    longitudeVazia ||
    !Number.isFinite(ponto.latitude) ||
    ponto.latitude < -90 ||
    ponto.latitude > 90 ||
    !Number.isFinite(ponto.longitude) ||
    ponto.longitude < -180 ||
    ponto.longitude > 180
) {
    return;
}


    botaoSalvar.disabled = true;
    botaoSalvar.textContent = "Salvando...";

    try {
       if (id) {
    await atualizarPonto(id, ponto);
    } else {
        await criarPonto(ponto);
    }

    const mensagemSucesso = id
        ? "Ponto atualizado com sucesso!"
        : "Ponto cadastrado com sucesso!";

    sessionStorage.setItem("mensagemSucesso", mensagemSucesso);

    window.location.href = "index.html";

    } catch (erro) {
        mostrarErro("name", erro.message);

    } finally {
        botaoSalvar.disabled = false;
        botaoSalvar.textContent = id ? "Atualizar" : "Salvar";
    }
});
