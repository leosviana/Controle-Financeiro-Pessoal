function showLoading(){ //Função para exibir o loading
    const div = document.createElement("div"); //Criando o elemento "div" do HTML
    div.classList.add("loading", "centralize"); //Adicionando as classes "loading" e "centralize"
    document.body.appendChild(div); //Utilizando o elemento filho "div" ao body

    const label = document.createElement("label"); //Criando o elemento "label" do HTML
    label.innerHTML = "Carregando...";
    div.appendChild(label); //Utilizando o elemento filho "label" a div

    // setTimeout(() => hideLoading(), 2000); //Aguardando 2 segundos e utilizando função "hideLoading"
}

function hideLoading(){ //Função para esconder o loading
    const loadings = document.getElementsByClassName("loading"); //Capturando uma lista com todas as classes com o nome "loading"
    if(loadings.length){ //Verificar tamanho da classe. Caso tenha mais de um elemento
        loadings[0].remove(); //Remove somente o primeiro elemento (loading)
    }
}