    import { auth } from "./Firebase/config.js";
    import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

    const buttonEntrar = document.getElementById('buttonEntrar');
    const buttonCriarConta = document.getElementById('buttonCriarConta');
    const buttonEsqueciSenha = document.getElementById('buttonEsqueciSenha');
    const inputEmail = document.getElementById('email');
    const inputSenha = document.getElementById('senha');
    

    /*Faz a navegação para Criar Conta*/
    buttonCriarConta.addEventListener('click', () => {
        window.location.href = "criarConta.html";
    });
    
    
    /*Faz a navegação para recuperarSenha*/
    buttonEsqueciSenha.addEventListener('click', () => {
        window.location.href = "recuperarSenha.html";
    });

    auth.onAuthStateChanged((user) =>{
        if(user){
            window.location.href = "home.html";
        }
    })

    const logarUser = () =>{
        const email = inputEmail.value;
        const senha = inputSenha.value;
        signInWithEmailAndPassword(auth, email, senha)
        .then((loggedUser) =>{
            window.location.href = "home.html";
        })
        .catch((error) =>{
            console.log("Erro de login");
        })

    }
    
    buttonEntrar.addEventListener('click', logarUser);
