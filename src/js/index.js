function onChangeEmail(){ //Ações no campo email   
    toggleButtonsDisable(); //Utilizando a função de validação de botões
    toggleEmailErros(); //Utilizando a função de validação de erros no email
}

function onChangePassword(){ //Ações no campo senha
    toggleButtonsDisable(); //Utilizando a função de validação de botões
    togglePasswordError(); //Utilizando a função de validação de erros na senha
}

function login(){
    //Ver todas as propriedades do window.location:
    /*window.location
    console.log('### window', window);*/

    firebase.auth().signInWithEmailAndPassword( //Função de autenticação de email e senha
        form.email().value, form.senha().value //Verificando valor dos campos de email e senha
        ).then (response => { //Caso seja sucesso
        console.log('sucess', response);
        window.location.href = "home.html"; //Ir para a página principal
    }).catch(error => { //Caso seja erro
        alert(getErrorMessage(error)); //Exibir os erros de login tratados
        console.log('error', error); 
    });
}

function getErrorMessage(error){ //Função de erros de login tratados
    if (error.code == "auth/invalid-login-credentials"){ //Quando ocorrer esse erro
        return "Usuário não encontrado"; //Será retornado essa outra mensagem
    }
    return error.message; //Caso não seja os erros acima, será retornado outros erros
}

function register(){
    window.location.href = "register.html"; //Ir para a página de registro
}

function isEmailValid(){ // Validar campo email    
    const email = form.email().value; //verdadeiro
    if(!email){ //Se email é diferente de preenchido
        return false; //Retorna falso       
    }
    return validateEmail(email); //retorno verdadeiro ou falso  
}

function toggleEmailErros(){ //Erros do campo email
    const email = form.email().value;
    form.emailRequiresError().style.display = email ? "none" : "block"; //Utilizando operador ternário para abreviar o if..else abaixo:
    /*if(!email){ //Campo de email vazio
        form.emailRequiresError().style.display = "block"; 
        //Alterando propriedade do css para exibir o erro em "bloco"
    }else{
        form.emailRequiresError().style.display = "none";
        //Alterando propriedade do css para não exibir o erro
    }*/

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block"; //Utilizando operador ternário para abreviar o if..else abaixo:
    /*if(validateEmail(email)){ //Campo de email inválido
        form.emailInvalidError().style.display = "none";
        //Alterando propriedade do css para não exibir o erro
    }else{
        form.emailInvalidError().style.display = "block";
        //Alterando propriedade do css para exibir o erro em "bloco"
    }*/
}

function togglePasswordError(){ //Erros do campo senha
    const senha = form.senha().value;
    form.passwordRequiredError().style.display = senha ? "none" : "block"; //Utilizando operador ternário para abreviar o if..else abaixo:
    /*if(!senha){ //Campo de senha vazio
        form.passwordRequiredError().style.display = "block";
    }else{
        form.passwordRequiredError().style.display = "none";
    }*/
}

function toggleButtonsDisable(){ //Desabilitar campos
    const emailValid = isEmailValid();
    form.btRecuperarSenha().disabled = !emailValid; // Habilita/Desabilita campo email
    // se verdadeiro, entao habilita o botão de recuperar senha
    // se falso, entao desabilita o botão de recuperar senha
    const passwordValid = isPasswordValid();
    form.btEntrar().disabled = !emailValid || !passwordValid; // Habilita/Desabilita campo senha
    // se verdadeiro, entao habilita o botão de entrar
    // se falso, entao desabilita o botão de entrar
}

function isPasswordValid(){ // Validar campo senha
    const senha = form.senha().value; //verdadeiro
    if(!senha){ //Se senha é diferente de preenchido
        return false; //Retorna falso
    }
    return true; //Retorna verdadeiro ou falso
}

const form = { //Função de formulario para encapsular os campos do HTML
    email: () => document.getElementById('email'),
    senha: () => document.getElementById('senha'),
    emailRequiresError: () => document.getElementById('email-required-error'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    btRecuperarSenha: () => document.querySelector(".btRecuperarSenha"),
    btEntrar: () => document.querySelector(".btEntrar")
}

    