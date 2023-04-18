"use strict";

(function() {
    const output = document.getElementById("output");

    const address = "http://localhost:8080";

    // document.getElementById("popup").style.display = "none";


    async function getPeople() {
        try {
            output.innerHTML = "";
            const res = await axios.get(`${address}/getAll`);
            // console.log(res.data);
            res.data.forEach(person => renderPerson(person));
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    }

    function renderPerson({id,fullName, oldNess, occupation}) {
        const person = document.createElement("div");
        person.classList.add("col");
        const personCard = document.createElement("div");
        personCard.classList.add("card");

        const personBody = document.createElement("div");
        personBody.classList.add("card-body");
        const personName = document.createElement("p");
        personName.innerText = `Name: ${fullName}`;
        personName.classList.add("card-text");
        personBody.appendChild(personName);

        const personAge = document.createElement("p");
        personAge.innerText = `Age: ${  oldNess}`;
        personAge.classList.add("card-text");
        personBody.appendChild(personAge);

        const personOccupation = document.createElement("p");
        personOccupation.innerText = `Occupation: ${occupation}`;
        personOccupation.classList.add("card-text");
        personBody.appendChild(personOccupation);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = 'DELETE';
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.addEventListener('click', () => deletePerson(id));
        personBody.appendChild(deleteBtn);
        personCard.appendChild(personBody);
        person.appendChild(personCard);

        const updateBtn = document.createElement("button");
        updateBtn.innerText='UPDATE';
        updateBtn.classList.add("btn","btn-warning");
        updateBtn.addEventListener('click',() => updatePerson(id));
        personBody.appendChild(updateBtn);
        personCard.appendChild(personBody);
        person.appendChild(personCard);

        output.appendChild(person);
    }

    async function updatePerson(id){
        // const res = await axios.patch(`${address}/update/${id}`)
        document.getElementById("popup").style.display ="block";
    }


    var cancelUpdatePersonButton = document.querySelector("#cancel-btn");
    cancelUpdatePersonButton.addEventListener("click",function(){
        document.getElementById("popup").style.display="none";
    })


    var updatePersonButton = document.querySelector("#update-btn");
    updatePersonButton.addEventListener("click",async function(){
        const {uName, uAge, uOccupation} = this;
        
        const updatedPerson = {
            fullName: uName.value,
            oldNess: uAge.value,
            occupation: uOccupation.value,
        }
        this.reset();
        uName.focus();
        try {
            const res = await axios.patch(`${address}/update`, updatedPerson);
            document.getElementById("popup").style.display="none";
            console.log(updatedPerson)
            getPeople();
        } catch(error) {
            console.error(error);
        }
    })

    async function deletePerson(id) {
        const res = await axios.delete(`${address}/remove/${id}`);
        getPeople();
    }


    document.getElementById("personForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        const {pName, age, occupation, niNumber} = this;
        
        const newPerson = {
            fullName: pName.value,
            oldNess: age.value,
            occupation: occupation.value,
            notNiNumber: niNumber.value
        }
        this.reset();
        pName.focus();
        try {
            const res = await axios.post(`${address}/create`, newPerson);
            getPeople();
        } catch(error) {
            console.error(error);
        }
    });
    

    getPeople();
    
})();