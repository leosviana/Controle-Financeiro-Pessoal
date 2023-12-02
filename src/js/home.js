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
        date.innerHTML = transaction.date; /* Adicionando a data */
        li.appendChild(date); /* Adicionando data como item filho da lista  */


        orderedList.appendChild(li); // Adicionando item lista como filho da lista
    });
    /* FOREACH é o mesmo que utilizar o laço FOR abaixo, mas de uma forma simplificada
       for (i=0; i<transactions.lenght; i++) {
         let transaction = transactions[i];
       }
    */


}

const fakeTransations = [{ /* ARRAY COM INFORMAÇÕES FAKE PARA TESTE */
    type: 'expense',
    date: '2023-01-04',
    money: {
        currenty: 'R$', /* Atributo moeda */ 
        value: 10 /* Valor */
    },
    transactionType: 'Supermercado'
}, { 
    type: 'income',
    date: '2023-01-03',
    money: {
        currenty: 'R$', /* Atributo moeda */ 
        value: 5000 /* Valor */
    },
    transactionType: 'Salário',
    description: 'Empresa A'
}, { 
    type: 'expense',
    date: '2023-01-01',
    money: {
        currenty: 'EUR', /* Atributo moeda */ 
        value: 10 /* Valor */
    },
    transactionType: 'Transporte',
    description: 'Metro ida e volta'
},{ 
    type: 'expense',
    date: '2023-01-01',
    money: {
        currenty: 'USD', /* Atributo moeda */ 
        value: 600 /* Valor */
    },
    transactionType: 'Aluguel',
    description: 'Mensalidade'

}]