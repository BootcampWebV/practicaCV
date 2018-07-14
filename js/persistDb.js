export class PersistDB {
    constructor() {
        this.aContacts = [];
        this.sURL = 'http://localhost:3000/contacts';
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        this.eSection = document.querySelector('#listContacts');
    }

    search() {
        this.aContacts = [];
        fetch(this.sURL)
        .then((response) => {
            return response.json();
        })
        .then((response) => {                
            response.forEach(
                element => { this.aContacts.push(element);}                    
            ) // Fin del forEach                
            this.createList(this.aContacts);
        })
        .catch(error => console.log('Hubo un problema con la petición Fetch:' + error.message));

        return this.aContacts; 
    }

    save(oData) {
        fetch(this.sURL, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(oData)
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            console.log('Se ha grabado correctamente:', response); 
            this.search()}
        );
    }

    createList(aData) {
        if (aData.length) {
            let list = '<h3>Contactos:</h3><article>';
            aData.forEach(item => {
                list += `<ul><li><span>${item.name}</span></li><li>${item.email ? item.email:''}</li><li>${item.phone?item.phone:''}</li><li>${item.message?item.message:''}</li><li>${item.selection?item.selection:''}</li><li>${item.other?item.other:''}</li></ul>`;
            });
            list += "</article>";
            this.eSection.innerHTML = list;
        }
    }
}