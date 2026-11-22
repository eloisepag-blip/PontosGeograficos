
const API_URL = window.API_URL;

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const formulario = document.getElementById("form-ponto");
const titulo = document.querySelector("h2");
const botaoSalvar = formulario.querySelector('button[type="submit"]');

async function carregarPonto() {
    try {
        const resposta = await fetch(`${API_URL}/${id}`);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o ponto.");
        }

        const ponto = await resposta.json();

        document.getElementById("name").value = ponto.name;
        document.getElementById("description").value = ponto.description || "";
        document.getElementById("latitude").value = ponto.latitude;
        document.getElementById("longitude").value = ponto.longitude;

        titulo.textContent = "Editar Ponto Geográfico";

    } catch (erro) {
        alert(erro.message);
    }
}

if (id) {
    titulo.textContent = "Editar Ponto Geográfico";
    botaoSalvar.textContent = "Atualizar";

    carregarPonto();
}

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const ponto = {
        name: document.getElementById("name").value.trim(),
        description: document.getElementById("description").value.trim(),
        latitude: Number(document.getElementById("latitude").value),
        longitude: Number(document.getElementById("longitude").value)
    };

    if (
        !Number.isFinite(ponto.latitude) ||
        !Number.isFinite(ponto.longitude) ||
        ponto.latitude < -90 ||
        ponto.latitude > 90 ||
        ponto.longitude < -180 ||
        ponto.longitude > 180
    ) {
        alert("Informe uma latitude entre -90 e 90 e uma longitude entre -180 e 180.");
        return;
    }

    botaoSalvar.disabled = true;
    botaoSalvar.textContent = "Salvando...";

    try {
        const resposta = await fetch(
            id ? `${API_URL}/${id}` : API_URL,
            {
                method: id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ponto)
            }
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível salvar o ponto.");
        }

        alert(id ? "Ponto atualizado com sucesso!" : "Ponto cadastrado com sucesso!");

        window.location.href = "index.html";

    } catch (erro) {
        alert(erro.message);

    } finally {
        botaoSalvar.disabled = false;
        botaoSalvar.textContent = id ? "Atualizar" : "Salvar";
    }
});
