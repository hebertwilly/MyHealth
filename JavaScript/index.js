    import { auth } from "./Firebase/config.js";

    const buttonLogin = document.getElementById('buttonLogin');
    const buttonCriarConta = document.getElementById('buttonNovaConta')

    /*Faz a navegação para a home*/
    buttonLogin.addEventListener('click', () => {
        window.location.href = "login.html";
    });

    /*Faz a navegação para Criar Conta*/
    buttonCriarConta.addEventListener('click', () =>{
        window.location.href = "criarConta.html"
    })
    
    auth.onAuthStateChanged((user) =>{
        if(user){
            window.location.href = "home.html";
        }
    })

    