export class Menu {
    constructor () {

        // nav bar
        this.aMenuItems = document.querySelectorAll("nav#menu a");
        this.oButtonMenuOpen = document.querySelector('#menu-btn-open');
        this.oButtonMenuClose = document.querySelector('#menu-btn-close');        
        this.oMenu = document.querySelector('#menu');
        this.oMenuButtonHome = document.querySelector('#menu-btn-home');  
        this.oMenuButtonWhoiam = document.querySelector('#menu-btn-whoiam');         
        this.oMenuButtonWorkexperience = document.querySelector('#menu-btn-workexperience'); 
        this.oMenuButtonAboutme = document.querySelector('#menu-btn-aboutme');  
        this.oMenuButtonContact = document.querySelector('#menu-btn-contact');       
        
        // skills               
        this.oSkillsJava = document.querySelector('#skills-java');
        this.oSkillsSql = document.querySelector('#skills-sql');
        this.oSkillsHtml = document.querySelector('#skills-html');
        this.oSkillsCss = document.querySelector('#skills-css');
        this.oSkillsJs = document.querySelector('#skills-js');      

        // Otros        
        this.aSections = document.querySelectorAll("section");
        this.oOffsets = [];

        // eventos
        this.oButtonMenuOpen.addEventListener('click', this.toggleMenu.bind(this));
        this.oButtonMenuClose.addEventListener('click', this.toggleMenu.bind(this));
        this.aMenuItems.forEach(
            (item) => { item.addEventListener('click', this.activateItem.bind(this));}
        )
        window.addEventListener('scroll', this.changeMenuStyle.bind(this));
        
        this.oMenuButtonHome.addEventListener('click', this.smoothScroll.bind(this));
        this.oMenuButtonWhoiam.addEventListener('click', this.smoothScroll.bind(this));        
        this.oMenuButtonWorkexperience.addEventListener('click', this.smoothScroll.bind(this));
        this.oMenuButtonAboutme.addEventListener('click', this.smoothScroll.bind(this));
        this.oMenuButtonContact.addEventListener('click', this.smoothScroll.bind(this));
        
        /* Para controlar que la activacion del menu se realice solo en el metodo activateItem o en changeMenuStyle, 
        en los dos no porque se solapan */
        this.activate = true;

        //Para controlar origen en smoth scroll
        this.origin = '';
        this.prepareNavigation();
    }

    toggleMenu(oE) {
        // elimina la ejecucion del click en el elemento
        oE.preventDefault();
        // cambia su visibilidad
        oE.target.classList.toggle('hide');
        // cambia la visibilidad del otro icono
        if (oE.target.previousElementSibling) {
            oE.target.previousElementSibling.classList.toggle('hide');
        } else {
            oE.target.nextElementSibling.classList.toggle('hide');
        }
         // cambia la visibilidad del menu top para mobile
        this.oMenu.classList.toggle('hide');
    }

    // Se activa el elemento del menu sobre el que hagamos click
    activateItem(oE) {
        this.aMenuItems.forEach(
            (item) => { item.classList.remove('active');}
        )
        oE.target.classList.add('active');
        this.activate = false;
    }

    // Para poner activo el elemento del menu ha cuya seccion relacionada hayamos llegado a traves del scroll
    changeMenuStyle () {
        let pageOffset = window.pageYOffset;
        let menuItem = 0;
        this.toHideSkills();
        if (pageOffset >=  this.oOffsets['#home'] && pageOffset < this.oOffsets['#whoiam']) {
            menuItem = 0;
        } else if (pageOffset >=  this.oOffsets['#whoiam'] && pageOffset < this.oOffsets['#workexperience']) {
            this.toShowSkills();
            menuItem = 1;
        } else if (pageOffset >= this.oOffsets['#workexperience'] && pageOffset < this.oOffsets['#aboutme']) {
            menuItem = 2;
        } else if (pageOffset >= this.oOffsets['#aboutme'] && pageOffset < this.oOffsets['#contact']) {
            menuItem = 3;
        } else {
            menuItem = 4;
        }

        if ( this.activate === true) {
            this.aMenuItems.forEach( 
                (item) => item.classList.remove('active')            
            )
            this.aMenuItems[menuItem].classList.add('active');
        }
            
        this.activate = true;
    }

    prepareNavigation() {
        this.aSections.forEach(
            (item) => {
                let cumulative =  this.cumulativeOffset(item);
                this.oOffsets['#'+item.id] = cumulative;
            }
        )
        this.origin = '#home';
    }

    // Obtiene la posicion de cada seccion de la pagina
    cumulativeOffset (element) {
        var top = 0;
        do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
        } while(element);
        return top;
    }

    //Para mostrar las habilidades al llegar a la seccion sobre mi
    toShowSkills() {
        this.oSkillsJava.classList.add('skill-java-loading');
        this.oSkillsSql.classList.add('skill-sql-loading');
        this.oSkillsHtml.classList.add('skill-html-loading');
        this.oSkillsCss.classList.add('skill-css-loading');
        this.oSkillsJs.classList.add('skill-js-loading');
    }

    //Para ocultar las habilidades al llegar a la seccion sobre mi
    toHideSkills() {
        this.oSkillsJava.classList.remove('skill-java-loading');
        this.oSkillsSql.classList.remove('skill-sql-loading');
        this.oSkillsHtml.classList.remove('skill-html-loading');
        this.oSkillsCss.classList.remove('skill-css-loading');
        this.oSkillsJs.classList.remove('skill-js-loading');   
    }

    smoothScroll(aE) {        
        let origin = this.oOffsets[this.origin];
        let destiny = this.oOffsets[aE.target.hash];

        // seteamos el nuevo origen
        this.origin = aE.target.hash;
        let distance = destiny > origin ? destiny - origin : origin - destiny;
        let speed = Math.round(distance / 100);
        let step = Math.round(distance / 25);
        let diferenceOriginDestiny = destiny > origin ? origin + step : origin - step;
        let timer = 0;

        if (distance < 100) {
            scrollTo(0, destiny); 
            return;
        }
       
        if (speed >= 20) {
            speed = 20;
        }
             
        if (destiny > origin) {
            for ( let i=origin; i<destiny; i+=step ) {
                setTimeout("window.scrollTo(0, " + diferenceOriginDestiny + ")", timer * speed);
                diferenceOriginDestiny += step; 
                if (diferenceOriginDestiny > destiny) {
                    diferenceOriginDestiny = destiny; 
                }
                timer++;
            } return;
        }

        for ( let i=origin; i>destiny; i-=step ) {
            setTimeout("window.scrollTo(0, " + diferenceOriginDestiny + ")", timer * speed);
            diferenceOriginDestiny -= step; 
            if (diferenceOriginDestiny < destiny) {
                diferenceOriginDestiny = destiny; 
            }
            timer++;
        }        
    }
}