function logout(){ //Função para realizar logout do usuário
    firebase.auth().signOut().then(() => { //Se o usuário está deslogado
        window.location.href = "index.html"; //Volta para página principal
    }).catch(() => { //Caso ocorra algum erro..
        alert('Erro ao fazer logout'); //Exibe essa mensagem
    })
}

findTransaction(); // Chamando a função de transação 

function findTransaction(){ // Buscar as transações do backend para o usuário logado
    setTimeout(() => {
        addTransactionToScreen(fakeTransations); // Adicionando transação
    }, 1000) // Carregar 1 segundo 
}

function addTransactionToScreen(transactions){ // Função para adicionar as transações do backend
    const orderedList = document.getElementById('transactions'); // Chamando a lista ordenada do html 

    transactions.forEach(transaction => { // ARRAY de transações
        const li = document.createElement('li'); // Criando elemento 'li' (Lista)
        li.classList.add(transaction.type); //Adicionando tipo de transação ('expense' ou 'income')

        const date = document.createElement('p'); // Criando elemento paragrafo
        date.innerHTML = formatDate(transaction.date); // Adicionando o formato data ao html
        li.appendChild(date); // Adicionando data como item filho da lista

        const money = document.createElement('p'); // Criando elemento paragrafo
        money.innerHTML = formatMoney(transaction.money); // Adicionando o formato dinheiro ao html
        li.appendChild(money); // Adicionando o dinheiro como item filho da lista

        const type = document.createElement('p'); // Criando elemento paragrafo
        type.innerHTML = transaction.transactionType; // Adicionando o formato tipo ao html
        li.appendChild(type); // Adicionando o tipo como item filho da lista

        if(transaction.description){
            const description = document.createElement('p'); // Criando elemento paragrafo
            description.innerHTML = transaction.description; // Adicionando o formato descrição ao html
            li.appendChild(description); // Adicionando a descrição como item filho da lista
        }

        orderedList.appendChild(li); // Adicionando item lista como filho da lista
    });
    /* FOREACH é o mesmo que utilizar o laço FOR abaixo, mas de uma forma simplificada
       for (i=0; i<transactions.lenght; i++) {
         let transaction = transactions[i];
       }
    */
}

function formatDate(date){ // Formatando a data para formato brasileiro
    return new Date(date).toLocaleDateString('pt-BR');
}

function formatMoney(money){ // Formatando o dinheiro
    return `${money.currency} ${money.value.toFixed(2)}` // toFixed(2) = Insere duas casas decimais no valor
}

const fakeTransations = [{ /* ARRAY COM INFORMAÇÕES FAKE PARA TESTE */
    type: 'expense',
    date: '2023-01-04',
    money: {
        currency: 'R$', /* Atributo moeda */ 
        value: 10 /* Valor */
    },
    transactionType: 'Supermercado'
}, { 
    type: 'income',
    date: '2023-01-03',
    money: {
        currency: 'R$', /* Atributo moeda */ 
        value: 5000 /* Valor */
    },
    transactionType: 'Salário',
    description: 'Empresa A'
}, { 
    type: 'expense',
    date: '2023-01-01',
    money: {
        currency: 'EUR', /* Atributo moeda */ 
        value: 10 /* Valor */
    },
    transactionType: 'Transporte',
    description: 'Metro ida e volta'
},{ 
    type: 'expense',
    date: '2023-01-01',
    money: {
        currency: 'USD', /* Atributo moeda */ 
        value: 600 /* Valor */
    },
    transactionType: 'Aluguel',
    description: 'Mensalidade'

}]