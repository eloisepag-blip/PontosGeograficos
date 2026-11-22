    window.API_URL = "https://geopoint-6x4u.onrender.com/api/points";

    async function listarPontos() {
        const resposta = await fetch(window.API_URL);

        if(!resposta.ok) {
            throw new Error("Não foi possível carregar os pontos.");
        }

        return await resposta.json();
    }

    async function buscarPontos(id) {
        const respostas = await fetch (`${window.API_URL}/${id}`);

        if (!resposta.ok) {
            throw new Error("Não foi possivel buscar o ponto.");
        }

        return await respostas.json();
    }

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

    async function excluirPontoAPI(id) {
    const resposta = await fetch(`${window.API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!resposta.ok) {
        throw new Error("Não foi possível excluir o ponto.");
    }
    }