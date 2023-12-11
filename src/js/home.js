function logout(){ //Função para realizar logout do usuário
    firebase.auth().signOut().then(() => { //Se o usuário está deslogado
        window.location.href = "index.html"; //Volta para página principal
    }).catch(() => { //Caso ocorra algum erro..
        alert('Erro ao fazer logout'); //Exibe essa mensagem
    })
}

firebase.auth().onAuthStateChanged(user => {
    if(user){
        findTransactions(user); // Chamando a função de transação 
    }
})

function newTransaction(){
    window.location.href = "transaction.html";
}


function findTransactions(user){ // Buscar as transações do backend (FIRESTORE) para o usuário logado
    showLoading();
    firebase.firestore()
        .collection('transactions')
        .where('user.uid', '==', user.uid)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot =>{ //"Fotografia" do momento atual da base de dados para consulta
            hideLoading();
            const transactions = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id //Adicionando o id do usuário ao final da lista
            }));            
            addTransactionToScreen(transactions);
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Erro ao recuperar transações');
        })
}

/*function findTransaction(){ // Buscar as transações fake do backend para o usuário logado
    setTimeout(() => {
        addTransactionToScreen(fakeTransations); // Adicionando transação
    }, 1000) // Carregar 1 segundo 
}*/

function addTransactionToScreen(transactions){ // Função para adicionar as transações do backend
    const orderedList = document.getElementById('transactions'); // Chamando a lista ordenada do html 

    transactions.forEach(transaction => { // ARRAY de transações
        console.log(transactions);
        const li = document.createElement('li'); // Criando elemento 'li' (Lista)
        li.id = transaction.uid; //Carregando o id do usuario para cada transação
        li.classList.add(transaction.type); //Adicionando tipo de transação ('expense' ou 'income')
        li.addEventListener('click', () => {
            window.location.href = "transaction.html?uid=" + transaction.uid; //Ao clicar no item da lista, será direcionado para a tela de transação para atualizar o registro. Será enviado o id do usuário também
        })

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

        const deleteButton = document.createElement('button'); //Criando botão para deletar transação
        deleteButton.innerHTML = "Remover"; //Texto interno
        deleteButton.classList.add('outline', 'danger');
        deleteButton.addEventListener('click', event => { //Disparar evento ao clicar no botão deletar
            event.stopPropagation(); //Parar o evento de click no botão aqui nesse botão apenas
            askRemoveTransaction(transaction); //Executando função para remover transação
        })
        li.appendChild(deleteButton); //Adicionando botão de deletar como item filho da lista

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

function askRemoveTransaction(transaction){ //Pergunta se deseja remover a transação
    const shouldRemove = confirm('Deseja remover a transação?');
    if (shouldRemove){
        removeTransaction(transaction);
    }
    console.log(shouldRemove);
}

function removeTransaction(transaction){
    showLoading();
    firebase.firestore() //Acessando o banco de dados
        .collection("transactions") //Pegando a coleção de dados de transação do banco de dados
        .doc(transaction.uid) //Pelo id do usuário
        .delete() //Executando função de remover do firebase
        .then(() => { //Retorna uma promess
            hideLoading(); //Escondendo loading
            document.getElementById(transaction.uid).remove(); //Removendo elemento da tela
        })
        .cath(error => {
            hideLoading(); //Escondendo o loading
            console.log(error); //Exibir o erro no console
            alert('Erro ao remover transação');
        })
}

/*const fakeTransations = [{ // ARRAY COM INFORMAÇÕES FAKE PARA TESTE
    type: 'expense',
    date: '2023-01-04',
    money: {
        currency: 'R$', // Atributo moeda 
        value: 10 // Valor
    },
    transactionType: 'Supermercado'
}, { 
    type: 'income',
    date: '2023-01-03',
    money: {
        currency: 'R$', // Atributo moeda
        value: 5000 // Valor
    },
    transactionType: 'Salário',
    description: 'Empresa A'
}, { 
    type: 'expense',
    date: '2023-01-01',
    money: {
        currency: 'EUR', // Atributo moeda 
        value: 10 // Valor
    },
    transactionType: 'Transporte',
    description: 'Metro ida e volta'
},{ 
    type: 'expense',
    date: '2023-01-01',
    money: {
        currency: 'USD', // Atributo moeda
        value: 600 // Valor
    },
    transactionType: 'Aluguel',
    description: 'Mensalidade'

}]*/