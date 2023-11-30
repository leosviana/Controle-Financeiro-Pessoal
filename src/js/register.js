
function onChangeEmail(){
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block"; // Se email for válido, esconde a mensagem de erro da tela. Se não, exibe a mensagem de erro na tela.
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block"; // Se email for válido, esconde a mensagem de erro da tela. Se não, exibe a mensagem de erro na tela.
}

function onChangePassword(){
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
    validatePasswordMatch();
}

function onChangeConfirmPassword(){
    validatePasswordMatch();
}

function validatePasswordMatch(){
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display = 
        password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable(){
    form.registerButton().disable = !isFormValid();
}

function isFormValid(){ //Validar se o formulário com todos os campos é válido
    const email = form.email().value;
    if(!email || !validateEmail(email)){ //Se email for inválido
        return false; //Retorna falso
    }

    const password = form.password().value;
    if(!password || password.length < 6){ //Se senha conter menos que 6 caracteres
        return false; //Retorna falso
    }

    const confirmPassword = form.confirmPassword().value;
    if(password != confirmPassword){ //Se senha form diferente da confirmação de senha
        return false; //Retorna falso
    }
    return true; //Retorna true
}

const form = { //Criando objeto do formulário
    email: () => document.getElementById('email'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    registerButton: () => document.getElementById('register-button')
}