firebase.auth().onAuthStateChanged(user => { //Verifica se ocorre mudança de estado de logado para deslogado
    if(!user){ //Caso seja usuário diferente de logado
        window.location.href = "index.html"; //É redirecionado para página principal novamente
    }
})