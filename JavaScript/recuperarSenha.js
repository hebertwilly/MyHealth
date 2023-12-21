import { auth } from "./Firebase/config.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const inputEmail = document.getElementById('email');
const buttonRedefinirSenha = document.getElementById('buttonRecuperar');


const getEmail = () =>{
    return inputEmail.value;
}

const modalEmailRedefinicao = () =>{
    modal.style.display = 'block';
    setTimeout(() => {
        window.location.href = "login.html";
    }, 3000);
}

const modalError = () =>{
    const message1 = document.getElementById('text1');
    const message2 = document.getElementById('text2');

    message1.innerHTML = 'NÃO FOI POSSIVEL ENVIAR E-MAIL DE REDEFINIÇÃO';
    message2.innerHTML = '';

    modal.style.display = 'block'
    setTimeout(() => {
        window.location.reload();
    }, 3000);
}

auth.onAuthStateChanged((user) =>{
    if(user){
        window.location.href = "home.html";
    }
})

const recuperarSenha = () => {
    
    sendPasswordResetEmail(auth, getEmail())
    .then(() =>{
        inputEmail.value = "";
        modalEmailRedefinicao();
    })
    .catch((error) =>{
        console.log(JSON.stringify(error));
        modalError();
    })
}

buttonRedefinirSenha.addEventListener('click', recuperarSenha);