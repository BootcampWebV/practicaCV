//import { FormContact} from './form-contact.js'
import { Menu } from './menu.js';

export class Main {
    constructor() {
        // elementos del DOM
        // skills
        this.oMenuButtonWhoiam = document.querySelector('#menu-btn-whoiam');         
        this.oSkillsJava = document.querySelector('#skills-java');
        this.oSkillsSql = document.querySelector('#skills-sql');
        this.oSkillsHtml = document.querySelector('#skills-html');
        this.oSkillsCss = document.querySelector('#skills-css');
        this.oSkillsJs = document.querySelector('#skills-js'); 
        //this.oBotonOlderPost = document.querySelector('#olderPostsBtn')
        //this.oInputName = document.querySelector('#name')
        this.oMenus = new Menu();
        //this.oFormContact = new FormContact()
        console.log(this);
        this.defineEventListeners()
    }

    defineEventListeners() {
        //this.oBotonOlderPost.onclick = this.verOlderPosts
        // eventos
        this.oMenuButtonWhoiam.addEventListener('click', this.toShowSkills.bind(this));    
        /*this.oBotonOlderPost.addEventListener('click', this.verOlderPosts.bind(this))
        this.oInputName.addEventListener('change', this.probarInput.bind(this))
        this.oInputName.addEventListener('input', this.probarInput.bind(this))*/
    }

    toShowSkills() {
        console.info('Mostrando habilidades!!!');             
        this.oSkillsJava.classList.add('skill-java-loading');
        this.oSkillsSql.classList.add('skill-sql-loading');
        this.oSkillsHtml.classList.add('skill-html-loading');
        this.oSkillsCss.classList.add('skill-css-loading');
        this.oSkillsJs.classList.add('skill-js-loading');
    }

    /*verOlderPosts(oE) {
        console.dir(oE)
    }

    probarInput(oE) {
        if(oE.type == "change") {
            console.log('change')
            console.dir(oE.target.value)
        } else if (oE.type == "input") {
            console.log('input')
            console.dir(oE.target.value)
        }
    }*/
}

