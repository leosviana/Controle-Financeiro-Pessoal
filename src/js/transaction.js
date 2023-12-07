function onChangeDate(){ //Função de validação da data
    const date = form.date().value; //Declarando a variavel data na função
    form.dateRequiredError().style.display = !date ? "block" : "none"; //Caso não exista a data, mostra o erro

}

function onChangeValue(){
    const value = form.value().value;
    form.valueRequiredError().style.display = !value ? "block" : "none";
    form.valueLessOrEqualToZeroError().style.display = value <= 0 ? "block" : "none";
}

function onChangeTransactionType(){
    const transactionType = form.transactionType().value;
    //console.log(transactionType);
    form.transactionTypeRequiredError().style.display= !transactionType ? "block" : "none";
}

const form = { //OBJETO FROM - Campos do HTML
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),
    valueLessOrEqualToZeroError: () => document.getElementById('value-less-or-equal-to-zero-error'),
    transactionType: () => document.getElementById('transaction-type'),
    transactionTypeRequiredError: () => document.getElementById('transaction-type-required-error')
}