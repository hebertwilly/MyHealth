import { auth, db } from "./Firebase/config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


    const inputDataVacina = document.getElementById('dataVacina');
    const inputNameVacina = document.getElementById('vacina');
    const inputProxDose = document.getElementById('proxDose');
    const buttonCadastrar = document.getElementById('buttonCadastrar');
    const buttonVacinas = document.getElementById('buttonVacinas');
    
    buttonVacinas.addEventListener('click', () =>{
        window.location.href = "home.html";
    });

    auth.onAuthStateChanged((user) =>{
        if(!user){
            window.location.href = "login.html";
        }
    })

    const limpaInputs = () =>{
        inputDataVacina.value = "";
        inputNameVacina.value = "";
        inputProxDose.value = "";
    }

    const saveVacina = () =>{
        const vacina = createVacina();
        addDoc(collection(db, "Vacinas"), vacina)
        .then((result) =>{
            console.log(result);
            limpaInputs();
            window.location.href = "home.html"
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    function gerarId() {
        const timestamp = Date.now(); // Obtém o timestamp atual em milissegundos
        const randomNum = Math.floor(Math.random() * 10000); // Gera um número aleatório entre 0 e 9999
        const idVacina = `VAC.${timestamp}${randomNum}`; // Combina o timestamp e o número aleatório
        return idVacina;
    }
    const createVacina = () =>{
        const inputDose = document.querySelector('input[name="dose"]:checked').value;
        let proximaDose = null;

        if(inputDose === "Dose unica" || inputDose === "Reforco"){
            proximaDose = "Não há próxima dose";
        }else{
            proximaDose = inputProxDose.value;
        }

        const id = gerarId();

        const user = auth.currentUser;
        return{
            nome: inputNameVacina.value,
            data: inputDataVacina.value,
            dose: inputDose,
            proxDose: proximaDose,
            userEmail: user.email,
            userId: user.uid,
            vacinaID: id,

        }
    }
    
    buttonCadastrar.addEventListener('click',saveVacina);



/*
    if(localStorage.getItem("vacinas")){
        arrayVacinas = JSON.parse(localStorage.getItem("vacinas"));
    }else{
        arrayVacinas = [];
    }

    class Vacina{
        constructor(name, date, dose, proxDose, id){
            this.name = name,
            this.dose = dose,
            this.date = date,
            this.imageUrl = '../Img/image-comprovante.png',
            this.proxDose = proxDose,
            this.id = id;
        }
    };
    
    const addVacina = () =>{
        const inputDose = document.querySelector('input[name="dose"]:checked').value;
        let date = inputDataVacina.value;
        let name = inputNameVacina.value;
        let dose = inputDose;
        let proxDose = null;

        if(inputDose === "Dose unica" || inputDose === "Reforco"){
            proxDose = "Não há próxima dose";
        }else{
            proxDose = inputProxDose.value;
        }

        let id = geraId(date,name, proxDose);

        let novaVacina = new Vacina(name, date, dose, proxDose, id);

        arrayVacinas.push(novaVacina);
        
        localStorage.setItem("vacinas", JSON.stringify(arrayVacinas));
        
        console.log(arrayVacinas);
        limpaInputs();
        window.location.href = "home.html"
    };*/
