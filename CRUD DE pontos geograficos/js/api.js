   window.API_URL = "https://geopoint-6x4u.onrender.com/api/points";

// Listar todos os pontos
async function listarPontos() {
    const resposta = await fetch(window.API_URL);

    if (!resposta.ok) {
        throw new Error("Não foi possível carregar os pontos.");
    }

    return await resposta.json();
}

// Buscar um ponto pelo ID
async function buscarPonto(id) {
    const resposta = await fetch(`${window.API_URL}/${id}`);

    if (!resposta.ok) {
        if (resposta.status === 404) {
            throw new Error("Ponto não encontrado.");
        }

        throw new Error("Não foi possível buscar o ponto.");
    }

    return await resposta.json();
}

// Criar um ponto
async function criarPonto(ponto) {
    const resposta = await fetch(window.API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ponto)
    });

    if (!resposta.ok) {
        throw new Error("Não foi possível cadastrar o ponto.");
    }

    return await resposta.json();
}

// Atualizar um ponto
async function atualizarPonto(id, ponto) {
    const resposta = await fetch(`${window.API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ponto)
    });

    if (!resposta.ok) {
        throw new Error("Não foi possível atualizar o ponto.");
    }

    return await resposta.json();
}

// Excluir um ponto
async function excluirPontoAPI(id) {
    const resposta = await fetch(`${window.API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!resposta.ok) {
        throw new Error("Não foi possível excluir o ponto.");
    }
}
