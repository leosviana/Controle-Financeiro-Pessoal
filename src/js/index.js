function validateFields(){    
    const emailValid = isEmailValid();
    document.querySelector(".btRecuperarSenha").disabled = !emailValid; // Habilita/Desabilita campo email
    // se verdadeiro, entao habilita o botão de recuperar senha
    // se falso, entao desabilita o botão de recuperar senha
    const passwordValid = isPasswordValid();
    document.querySelector(".btEntrar").disabled = !emailValid || !passwordValid; // Habilita/Desabilita campo senha
    // se verdadeiro, entao habilita o botão de entrar
    // se falso, entao desabilita o botão de entrar
}

function isEmailValid(){ // Validar campo email    
    const email = document.getElementById("email").value; //verdadeiro
    if(!email){ //Se email é diferente de preenchido
        return false; //Retorna falso       
    }
    return validateEmail(email); //retorno verdadeiro ou falso  
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



    