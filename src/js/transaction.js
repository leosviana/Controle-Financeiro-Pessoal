if (!isNewTransaction()){ //Caso não seja uma nova transação
    const uid = getTransactionUid(); //Declarando  o id do usuário da URL
    findTransactionsById(uid); //Recuperar a transação por id do usuário
    getTransactionUid(); 
}

function getTransactionUid(){ //Captura e retorna o id do usuário
    const urlParams = new URLSearchParams(window.location.search);
    //console.log(urlParams.get('uid')); //Exibe o código da transação no console
    return urlParams.get('uid');
}

function isNewTransaction(){ //É nova transação?
    return getTransactionUid() ? false : true; //Se a transação existir o id do usuário, retorna false, se não é true
}

function findTransactionsById(uid){ //Buscando transação no banco de dados
    showLoading();
    firebase.firestore() //Buscando o id do usuário da transação no banco de dados
      .collection("transactions")
      .doc(uid)
      .get()
      .then(doc => { //Objeto doc firebase
        hideLoading();
        if (doc.exists){ //Se o documento existe (Propriedade "exists" é do firebase)
            //console.log(doc.data()); //Escreve no console os dados do documento
            toogleSaveButtonDisable();
            fillTransactionScreen(doc.data());
        }else{
            alert("Documento não encontrado");
            window.location.href = "home.html";
        }
      })
      .catch(() =>{
        hideLoading;
        alert("Erro ao recuperar documento");
        window.location.href = "home.html";
      });
}

function fillTransactionScreen(transaction){ //Consultando transação - Capturando os dados do objeto e inserindo na tela
    //Trazendo o botão (Despesa / Receita) selecionado:
    if (transaction.type == "expense"){
        form.typeExpense().checked = "true";
    }else{
        form.typeIncome().checked = "true";
    }
    //Trazendo a data da transação:
    form.date().value = transaction.date;
    //Trazendo o tipo da moeda:
    form.currency().value = transaction.money.currency;
    //Trazendo o valor da moeda:
    form.value().value = transaction.money.value;
    //Trazendo o tipo de transação:
    form.transactionType().value = transaction.transactionType;
    //Trazendo a descrição:
    if (transaction.description){
        form.description().value = transaction.description;
    }

}

function onChangeDate(){ //Função de validação do campo data
    const date = form.date().value; //Declarando a variavel data na função
    form.dateRequiredError().style.display = !date ? "block" : "none"; //Caso não exista a data, mostra o erro
    toogleSaveButtonDisable();
}

function onChangeValue(){ //Função de validação do campo valor
    const value = form.value().value;
    form.valueRequiredError().style.display = !value ? "block" : "none";
    form.valueLessOrEqualToZeroError().style.display = value <= 0 ? "block" : "none";
    toogleSaveButtonDisable();
}

function onChangeTransactionType(){  //Função de validação do campo tipo de transação
    const transactionType = form.transactionType().value;
    //console.log(transactionType);
    form.transactionTypeRequiredError().style.display = !transactionType ? "block" : "none";
    toogleSaveButtonDisable();
}

function toogleSaveButtonDisable(){ //Desabilita o botão de salvar
    form.saveButton().disabled = !isFormValid(); //Caso o formulário sejá inválido
}

function isFormValid(){ //Verifica se os dados dos campos do formulário é válido
    const date = form.date().value; //Validando a data
    if (!date) {
        return false;
    }

    const value = form.value().value; //Validando o valor
    if (!value || value <= 0){
        return false;
    }

    const transactionType = form.transactionType().value; //Validando o tipo de transação
    if (!transactionType){
        return false;
    }
    return true;
}

function saveTransaction(){ //Verifica se é a criação ou atualização da transação
    showLoading();
    const transaction = createTransaction();
    //console.log(transaction); 
    if (isNewTransaction()){
        save(transaction);
    }else{
        update(transaction);
    }
}

function save(transaction){ //Salva a transação
    firebase.firestore()
        .collection('transactions')
        .add(transaction)
        .then(() => {
            hideLoading();
            window.location.href = "home.html";
        })
        .catch(() =>{
            hideLoading();
            alert('Erro ao salvar transação!');
        })
}

function update(transaction){ //Atualiza a transação
    showLoading();
    firebase.firestore()
        .collection("transactions")
        .doc(getTransactionUid())
        .update(transaction)
        .then(() => {
            hideLoading();
            window.location.href = "home.html";
        })
        .catch(() =>{
            hideLoading();
            alert('Erro ao atualizar transação!');
        })
}

function createTransaction(){ //Criando transação - Capturando os dados da tela e inserindo em um objeto
    return {
        type: form.typeExpense().checked ? "expense" : "income", // Se tiver marcado "despesa", envia despesa, se não envia "receita"
        date: form.date().value,
        money: { //Atributo - Objeto
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form.transactionType().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }
}

const form = { //OBJETO FORM - Campos do HTML
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),
    valueLessOrEqualToZeroError: () => document.getElementById('value-less-or-equal-to-zero-error'),
    transactionType: () => document.getElementById('transaction-type'),
    transactionTypeRequiredError: () => document.getElementById('transaction-type-required-error'),
    typeExpense: () => document.getElementById('expense'),
    typeIncome: () => document.getElementById('income'),
    currency: () => document.getElementById('currency'),
    description: () => document.getElementById('description'),
    saveButton: () => document.getElementById('save-button')
}