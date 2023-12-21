    import { auth, db} from "./Firebase/config.js";
    import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
    import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

    const buttonTenhoConta = document.getElementById('buttonLogin');
    const buttonCadastrar = document.getElementById('buttonCadastrar');
    const inputName = document.getElementById('name');
    const inputNascimento = document.getElementById('nascimento');
    const inputEmail = document.getElementById('email');
    const inputSenha = document.getElementById('senha');
    const inputRepetirSenha = document.getElementById('repetirSenha');
    const aviso = document.querySelector('.aviso');
        
        buttonTenhoConta.addEventListener('click', () => {
            window.location.href = "login.html";
        });

        /*auth.onAuthStateChanged((user) =>{
            if(user){
                window.location.href = "home.html";
            }
        })*/

        

        const validaSenha = () =>{
            let senha = inputSenha.value;
            let repetirSenha = inputRepetirSenha.value;

            if(senha != repetirSenha){     
                senha = null;
            }else{
                senha = inputSenha.value;
            }

            return senha;
        }

        const createUser = () =>{
            const inputSexo = document.querySelector('input[name="sexo"]:checked').value;
            const user = auth.currentUser;
            return{
                name: inputName.value,
                sexo: inputSexo,
                nascimento: inputNascimento.value,
                userCredentials: {
                    email: user.email,
                    userId: auth.currentUser.uid
                }
            }
        }

        const cadastrarUsuario = () =>{

            const validacao = validaSenha();
            if(validacao != null){
                createUserWithEmailAndPassword(auth, inputEmail.value, inputSenha.value)
                .then(() =>{
                    const Users = createUser();
                    addDoc(collection(db, "Users"), Users)
                    .then((result) =>{
                        console.log("Cadastrado")
                        window.location.href = "home.html"
                    })
                    .catch((error) =>{
                        console.log(JSON.stringify(error))
                    })
                })
                .catch((error) =>{
                  console.log(JSON.stringify(error));      
                })
            }else{
                aviso.style.display = 'block';
                inputSenha.value = "";
                inputRepetirSenha.value = "";
            }
        }

        buttonCadastrar.addEventListener('click', cadastrarUsuario);


/*
    const inputSenha = document.getElementById('senha');
    const inputRepetirSenha = document.getElementById('repetirSenha');
       
    const senha = inputSenha.value;
    const repetirSenha = inputRepetirSenha.value;
       
    if(senha != repetirSenha){     
        aviso.style.display = 'block';
    }else{
        window.location.href = "login.html";
    }
*/