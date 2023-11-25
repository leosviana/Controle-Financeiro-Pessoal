
function validateFields(){
    const emailValid = isEmailValid();
    document.getElementById("btRecuperarSenha").disabled = !emailValid; // Desabilita quando for inválido
    // Verificar se o email não é vazio e se o email é valido
    // se verdadeiro, entao habilita o botão de recuperar senha
    // se falso, entao desabilita o botão de recuperar senha    
}

function isEmailValid(){ // Validar email
    const email = document.getElementById("email").value;
    if(!email){
        return false;
    }
    return validateEmail(email); 
}

function validateEmail(email){ // Verifica se o campo email é válido
    var parametro = /\S+@\S+\.\S+/;
    return parametro.test(email);
    // texto@texto.com -> true
    // texto@texto     -> false
    // texto.com       -> false
    // texto           -> false
}



    