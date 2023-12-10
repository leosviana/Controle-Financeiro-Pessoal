getTransactionUid();

function getTransactionUid(){
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('uid'));
}

function onChangeDate(){ //Função de validação da data
    const date = form.date().value; //Declarando a variavel data na função
    form.dateRequiredError().style.display = !date ? "block" : "none"; //Caso não exista a data, mostra o erro
    toogleSaveButtonDisable();
}

function onChangeValue(){
    const value = form.value().value;
    form.valueRequiredError().style.display = !value ? "block" : "none";
    form.valueLessOrEqualToZeroError().style.display = value <= 0 ? "block" : "none";
    toogleSaveButtonDisable();
}

function onChangeTransactionType(){
    const transactionType = form.transactionType().value;
    //console.log(transactionType);
    form.transactionTypeRequiredError().style.display = !transactionType ? "block" : "none";
    toogleSaveButtonDisable();
}

function toogleSaveButtonDisable(){
    form.saveButton().disabled = !isFormValid();
}

function isFormValid(){
    const date = form.date().value;
    if (!date) {
        return false;
    }

    const value = form.value().value;
    if (!value || value <= 0){
        return false;
    }

    const transactionType = form.transactionType().value;
    if (!transactionType){
        return false;
    }

    return true;
}

function saveTransaction(){
    showLoading();
    const transaction = createTransaction();
    //console.log(transaction);
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

function createTransaction(){
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
    currency: () => document.getElementById('currency'),
    description: () => document.getElementById('description'),
    saveButton: () => document.getElementById('save-button')
}