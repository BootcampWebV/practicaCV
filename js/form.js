import { PersistDB } from './persistDb.js';

export class FormContact {
    constructor() {

        //Para la persistencia
        this.oPersistDb = new PersistDB();

        // elementos del DOM
        this.oFormContact =  document.querySelector('#contact');
        this.oInputName = document.querySelector('#name');
        this.oInputEmail = document.querySelector('#email');
        this.oInputPhone = document.querySelector('#phone');
        this.oTextMessage = document.querySelector('#message');
        this.oSelectSeleccion = document.querySelector('#selection');
        this.oOther = document.querySelector('#other');

        this.oData = {
            name: '',
            email: '',
            phone: '',
            message: '',
            seleccion: '',
            otro: ''
        }

        this.oInputName.addEventListener("keyup", this.validateName.bind(this));
        this.oInputEmail.addEventListener("keyup", this.validateEmail.bind(this));
        this.oInputPhone.addEventListener("keyup", this.validatePhone.bind(this));
        this.oTextMessage.addEventListener("keyup", this.validateTextMessage.bind(this));
        this.oSelectSeleccion.addEventListener("click", () => { new Event('change')});       this.oSelectSeleccion.addEventListener("change", this.showHideOther.bind(this));
        this.oFormContact.addEventListener('submit', this.readContact.bind(this));

        this.searchData();
        this.definirValidaciones();
    }

    definirValidaciones() {
        this.oInputName.setCustomValidity('El nombre es obligatorio');     
    }

    validateName(event) {
        this.isFormValidate = false;
        if(this.oInputName.value == '') {
            this.oInputName.setCustomValidity('El nombre es obligatorio');
        } else {
            this.oInputName.setCustomValidity('');
            this.isFormValidate = true;
        }
    }
    
    validateEmail(event) {
        this.isFormValidate = false;
        let exp = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/;
        if(this.oInputEmail.value !== '') {
            if(!exp.test(this.oInputEmail.value)) {
                this.oInputEmail.setCustomValidity('El email no es correcto');
            } else {
                this.oInputEmail.setCustomValidity('');
                this.isFormValidate = true;
            }
        }
    }

    validatePhone(event) {
        this.isFormValidate = false;
        let exp = /^\d{7}(?:\d{2})?$/;
        if(this.oInputPhone.value !== '') {
            if(!exp.test(this.oInputPhone.value)) {
                this.oInputPhone.setCustomValidity('El telefono no es correcto');
            } else {
                this.oInputPhone.setCustomValidity('');
                this.isFormValidate = true;
            }
        }    
    }

    validateTextMessage(event) {        
        this.isFormValidate = false;
        if(this.oTextMessage.value.split(" ").length > 150) {
            this.oTextMessage.setCustomValidity('El mensaje no puede exceder las 150 palabras');
        } else {
            this.oTextMessage.setCustomValidity('');
            this.isFormValidate = true;
        }
    }

    showHideOther() {
        if(this.oSelectSeleccion.value === 'Otros') {
            this.oOther.classList.remove('input-other-hide');
            this.oOther.classList.add('input-other-visible');
        } else {
            this.oOther.classList.add('input-other-hide');
            this.oOther.classList.remove('input-other-visible');
            this.oOther.value = '';
        }            
    }

    readContact(event) {
        event.preventDefault();
        if (this.isFormValidate) {
            this.saveData();
        }
    }

    saveData() {
        this.oData = {
            name:  this.oInputName.value,
            email: this.oInputEmail.value,
            phone: this.oInputPhone.value,
            message: this.oTextMessage.value,
            selection: this.oSelectSeleccion.options[this.oSelectSeleccion.selectedIndex].value
        }

        if(this.oOther.value !== '') {
            this.oData.other = this.oOther.value;
        }

        this.oPersistDb.save(this.oData);

        console.dir(this.oData);
    }

    searchData() {
        this.oPersistDb.search();
    }    
}