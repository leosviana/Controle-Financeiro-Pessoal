firebase.auth().onAuthStateChanged(user => { //Verifica se ocorre mudança de estado de logado para deslogado
    if(user){
        window.location.href="home.html";
    }
}) 

function onChangeEmail(){
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block"; // Se email for válido, esconde a mensagem de erro da tela. Se não, exibe a mensagem de erro na tela.
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block"; // Se email for válido, esconde a mensagem de erro da tela. Se não, exibe a mensagem de erro na tela.
    toggleRegisterButtonDisable(); //Botão Registro desabilitado
}

function onChangePassword(){
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
    validatePasswordMatch();
    toggleRegisterButtonDisable(); //Botão Registro desabilitado
}

function onChangeConfirmPassword(){
    validatePasswordMatch();
    toggleRegisterButtonDisable(); //Botão Registro desabilitado
}


function register(){
    showLoading();

    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(
        email,password    
    ).then(() => {
        hideLoading(); //Esconde o loading
        window.location.href="home.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error){
    if (error.code == "auth/email-already-in-use"){
        return "Email já está em uso";
    }
    return error.message;
}

function validatePasswordMatch(){
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display = 
        password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable(){ //Botão Registro desabilitado
    form.registerButton().disabled = !isFormValid();
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