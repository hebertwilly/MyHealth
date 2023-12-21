import { auth, db } from "./Firebase/config.js";
import { collection, deleteDoc, query, where, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


    const buttonVacinas = document.getElementById('buttonVacinas');
    const buttonSalvar = document.getElementById('buttonSalvar');
    const buttonAbreModal = document.getElementById('buttonDelete');
    const modal = document.getElementById('modal');
    const buttonSim = document.getElementById('buttonSim');
    const buttonCancelar = document.getElementById('buttonCancelar');
    const inputDataVacina = document.getElementById('dataVacina');
    const inputNameVacina = document.getElementById('vacina');
    const inputProxDose = document.getElementById('proxDose');
    
    buttonVacinas.addEventListener('click', () =>{
        window.location.href = "home.html";
    });

    auth.onAuthStateChanged((user) =>{
        if(!user){
            window.location.href = "login.html";
        }
    })

    const params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    const getVacina = (id) =>{
        const vacinas = collection(db, 'Vacinas');
        const queryVacinas = query(vacinas, where('vacinaID','==',id));
        getDocs(queryVacinas)
        .then((snapshot) =>{
            snapshot.forEach((doc)=>{
                const vacina = doc.data();
                renderVacina(vacina);
            });
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    getVacina(id);

    const renderVacina = (vacina) =>{
        inputDataVacina.value = vacina.data;
        inputNameVacina.value = vacina.nome;
        inputProxDose.value = vacina.proxDose;
    }

    buttonAbreModal.addEventListener('click', () =>{
        modal.style.display = 'block';
    });

    buttonCancelar.addEventListener('click', () =>{
        modal.style.display = 'none';
    });
  
    /*buttonSim.addEventListener('click', ()=>{
       arrayVacinas = remove(intId);

       if(arrayVacinas !== null){
        localStorage.setItem("vacinas", JSON.stringify(vacinas));
       }

       modal.style.display = 'none';
       limpaInputs();

       window.location.href = "home.html"
    });*/

    const saveVacina = (id) =>{
        const docRef = doc(db, "Vacinas", id);
        const newDoc = createVacina();
        updateDoc(docRef, newDoc)
        .then((result)=>{
            window.location.href = "home.html";
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const updateVacina = () =>{
        const params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        const vacinas = collection(db, 'Vacinas');
        const queryVacinas = query(vacinas, where('vacinaID','==',id));
        getDocs(queryVacinas)
        .then((snapshot) =>{
            snapshot.forEach((doc)=>{
                saveVacina(doc.id);
            });
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const removeVacina = (id) =>{
        const docRef = doc(db, "Vacinas", id);
        deleteDoc(docRef)
        .then(()=>{
            modal.style.display = 'none';
            window.location.href = "home.html"
        })
        .catch((error)=>{
            console.log(error);
            modal.style.display = 'none';
        })
    }

    const deleteVacina = () =>{
        const params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        const vacinas = collection(db, 'Vacinas');
        const queryVacinas = query(vacinas, where('vacinaID','==',id));
        getDocs(queryVacinas)
        .then((snapshot) =>{
            snapshot.forEach((doc)=>{
                removeVacina(doc.id);
            });
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const createVacina = () =>{
        const inputDose = document.querySelector('input[name="dose"]:checked').value;
        let proximaDose = null;

        if(inputDose === "Dose unica" || inputDose === "Reforco"){
            proximaDose = "Não há próxima dose";
        }else{
            proximaDose = inputProxDose.value;
        }

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

    buttonSalvar.addEventListener('click', updateVacina);
    buttonSim.addEventListener('click', deleteVacina);
    buttonAbreModal.addEventListener('click', () =>{
        modal.style.display = 'block';
    });

    buttonCancelar.addEventListener('click', () =>{
        modal.style.display = 'none';
    });
    
    /*
    inputDataVacina.value = vacina.date;
    inputNameVacina.value = vacina.name;
    inputProxDose.value = vacina.proxDose;

    buttonSalvar.addEventListener('click', () => {
        const inputDose = document.querySelector('input[name="dose"]:checked').value;
        vacina.name = inputNameVacina.value;
        vacina.date = inputDataVacina.value;
        vacina.dose = inputDose;
        

        if(inputDose === "Dose unica" || inputDose === "Reforco"){
            vacina.proxDose = "Não há próxima dose";
        }else{
            vacina.proxDose = inputProxDose.value;
        }

        vacina.id = vacina.date + vacina.name + vacina.proxDose;

        vacinas[intId] = vacina;

        localStorage.setItem("vacinas", JSON.stringify(vacinas));

        window.location.href = "home.html";
    });
  
    buttonSim.addEventListener('click', ()=>{
       arrayVacinas = remove(intId);

       if(arrayVacinas !== null){
        localStorage.setItem("vacinas", JSON.stringify(vacinas));
       }

       modal.style.display = 'none';
       limpaInputs();

       window.location.href = "home.html"
    });
 
    const remove = (id) =>{
        if(vacinas.length > 1){
            vacinas.splice(id, 1);

            return vacinas;
        }else{
            localStorage.clear();

            return null;
        }
    }

    const limpaInputs = () =>{
        inputDataVacina.value = "";
        inputNameVacina.value = "";
        inputProxDose.value = "";
    }*/

