import { auth, db } from "./Firebase/config.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


    const buttonLogout = document.getElementById('buttonLogout');
    const buttonNovaVacina = document.getElementById('buttonNewVacina');

    

    const logoutUser = () =>{
        auth.signOut()
        .then(()=>{
            window.location.href = "login.html";
        })
        .catch((error) =>{
            console.log("erro logout: " + error);
        })
    }

    buttonLogout.addEventListener('click', logoutUser);

    buttonNovaVacina.addEventListener('click', () =>{
        window.location.href = "novaVacina.html";
    });

    auth.onAuthStateChanged((user) =>{
        if(!user){
            window.location.href = "login.html";
        }else{
            carregaVacina(user.uid);
        }
    });

    var vacinaData = [];
    

    const carregaVacina = (id) =>{
        const vacinas = collection(db, 'Vacinas');
        const queryVacinas = query(vacinas, where('userId','==',id));
        getDocs(queryVacinas)
        .then((snapshot) =>{
            snapshot.forEach((doc)=>{
                vacinaData.push(doc.data());
                console.log(vacinaData);
            });
            renderCards(vacinaData);
        })
        .catch((error)=>{
            console.log(error);
        })
    } 
    const CardComponent = (id) => { /*Function que cria as estrutura do card e retorna o card*/

        const cardsVacina = document.createElement('div');
        cardsVacina.classList.add('cardsVacinas');

        const nameVacina = document.createElement('h1');
        nameVacina.classList.add('nameVacina');

        const numberDose = document.createElement('p');
        numberDose.classList.add('numberDose');

        const dateDose = document.createElement('p');
        dateDose.classList.add('dateDose');

        const comprovanteImg = document.createElement('img');
        comprovanteImg.classList.add('comprovanteImg');

        const proxDose = document.createElement('span');
        proxDose.classList.add('proxDose');

        cardsVacina.setAttribute('idVacina', id);
        cardsVacina.appendChild(nameVacina);
        cardsVacina.appendChild(numberDose);
        cardsVacina.appendChild(dateDose);
        cardsVacina.appendChild(comprovanteImg);
        cardsVacina.appendChild(proxDose);

        return cardsVacina;
    }; 
    
    const renderCards = (vacinas) =>{ /*function que renderiza os cards*/
        const sectionCards = document.getElementById('sectionCards');

        if(vacinas){

            vacinas.forEach((card) => {/*percorre o arrayVacinas*/
                const cardsVacina = CardComponent(card.vacinaID);
                
                const nameVacina = cardsVacina.querySelector(".nameVacina");
                const numberDose = cardsVacina.querySelector(".numberDose");
                const dateDose = cardsVacina.querySelector(".dateDose");
                const comprovanteImg = cardsVacina.querySelector(".comprovanteImg");
                const proxDose = cardsVacina.querySelector(".proxDose");
                const imagemPath = "../Img/image-comprovante.png";
                nameVacina.textContent = card.nome
                numberDose.textContent = card.dose;
                dateDose.textContent = card.data;
                comprovanteImg.setAttribute('src', imagemPath);
                proxDose.textContent = card.proxDose;

                sectionCards.appendChild(cardsVacina);

                cardsVacina.addEventListener('click', (event) =>{/*adiciona o evento clique passando event como paramento pra pegar o card clicado no momento*/
                    const idVacina = event.currentTarget.getAttribute('idVacina');
                    window.location.href = "editarVacina.html?id="+idVacina;
                });

            });
        }
    }
    

    if(vacinaData){/*If responsavel por criar uma validação para abrir o card pra edição*/
        const cards = document.querySelectorAll('.cardsVacinas');

        cards.forEach((card) =>{/*percorre todos os cards aplicando um avento de clique neles*/
            card.addEventListener('click', (event) =>{/*adiciona o evento clique passando event como paramento pra pegar o card clicado no momento*/
                const idVacina = event.currentTarget.getAttribute('idVacina');
                
                window.location.href = "editarVacina.html?id="+idVacina;
            });
        });
    }
