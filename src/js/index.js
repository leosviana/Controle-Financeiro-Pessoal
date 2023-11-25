function onChangeEmail(){    
    toggleButtonsDisable(); //Utilizando a função de validação de botões
    toggleEmailErros(); //Utilizando a função de validação de erros no email
}

function onChangePassword(){
    toggleButtonsDisable(); //Utilizando a função de validação de botões
    togglePasswordError(); //Utilizando a função de validação de erros na senha
}

function isEmailValid(){ // Validar campo email    
    const email = document.getElementById("email").value; //verdadeiro
    if(!email){ //Se email é diferente de preenchido
        return false; //Retorna falso       
    }
    return validateEmail(email); //retorno verdadeiro ou falso  
}

function toggleEmailErros(){
    const email = document.getElementById('email').value;
    if(!email){
        document.getElementById('email-required-error').style.display = "block"; 
        //Alterando propriedade do css para exibir o erro em "bloco"
    }else{
        document.getElementById('email-required-error').style.display = "none";
        //Alterando propriedade do css para não exibir o erro
    }

    if(validateEmail(email)){
        document.getElementById('email-invalid-error').style.display = "none";
        //Alterando propriedade do css para não exibir o erro
    }else{
        document.getElementById('email-invalid-error').style.display = "block";
        //Alterando propriedade do css para exibir o erro em "bloco"
    }
}

function togglePasswordError(){
    const senha = document.getElementById('senha').value;
    if(!senha){
        document.getElementById('password-required-error').style.display = "block";
    }else{
        document.getElementById('password-required.error').style.display = "none";
    }
}

function toggleButtonsDisable(){
    const emailValid = isEmailValid();
    document.querySelector(".btRecuperarSenha").disabled = !emailValid; // Habilita/Desabilita campo email
    // se verdadeiro, entao habilita o botão de recuperar senha
    // se falso, entao desabilita o botão de recuperar senha
    const passwordValid = isPasswordValid();
    document.querySelector(".btEntrar").disabled = !emailValid || !passwordValid; // Habilita/Desabilita campo senha
    // se verdadeiro, entao habilita o botão de entrar
    // se falso, entao desabilita o botão de entrar
}

function isPasswordValid(){ // Validar campo senha
    const senha = document.getElementById("senha").value; //verdadeiro
    if(!senha){ //Se senha é diferente de preenchido
        return false; //Retorna falso
    }
    return true; //Retorna verdadeiro ou falso
}

function validateEmail(email){ // Verifica se a descrição do email está no padrão
    var parametro = /\S+@\S+\.\S+/;
    return parametro.test(email);
    // texto@texto.com -> true
    // texto@texto     -> false
    // texto.com       -> false
    // texto           -> false
}



    