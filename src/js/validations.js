function validateEmail(email){ // Verifica se a descrição do email está no padrão
    var parametro = /\S+@\S+\.\S+/;
    return parametro.test(email);
    // texto@texto.com -> true
    // texto@texto     -> false
    // texto.com       -> false
    // texto           -> false
}