export class Menu {
    constructor () {
        // navs

        this.aMenuItems = document.querySelectorAll("nav#menu-top a");
       
        this.oBotonMenu1 = document.querySelector('#menu-btn-1')
        this.oBotonMenu2 = document.querySelector('#menu-btn-2')
        this.oMenuTop =  document.querySelector('#menu-top')
        // Otros
        this.aSections = document.querySelectorAll("section")
        this.oOffsets = []
        // eventos
        this.oBotonMenu1.addEventListener('click', this.toggleMenu.bind(this));
        this.oBotonMenu2.addEventListener('click', this.toggleMenu.bind(this));
        this.aMenuItems.forEach(
            (item) => { item.addEventListener('click', this.activarItem.bind(this));}
        )
        window.addEventListener('scroll', this.changeMenuStyle.bind(this));

        this.prepararNavegacion();
    }

    toggleMenu(oE) {
        // elimina la ejecucion del click en el elemento
        oE.preventDefault()
        // cambia su visibilidad
        oE.target.classList.toggle('hide')
        // cambia la visibilidad del otro icono
        if (oE.target.previousElementSibling) {
            oE.target.previousElementSibling.classList.toggle('hide')
        } else {
            oE.target.nextElementSibling.classList.toggle('hide')
        }
         // cambia la visibilidad del menu top para mobile
        this.oMenuTop.classList.toggle('hide')
    }

    // Se activa el elemento del menu sobre el que hagamos click
    activarItem(oE) {
        console.log('Activando Item')
        this.aMenuItems.forEach(
            (item) => { item.classList.remove('active')}
        )
        oE.target.classList.add('active')
    }


    // Para poner activo el elemento del menu ha cuya seccion relacionada hayamos llegado a traves del scroll
    changeMenuStyle () {
        let pageOffset = window.pageYOffset
        let menuItem = 0
        if (pageOffset >=  this.oOffsets['#home'] && pageOffset < this.oOffsets['#whoiam']) {
            menuItem = 0
        } else if (pageOffset >= this.oOffsets['#whoiam'] && pageOffset < this.oOffsets['#workexperience']) {
            menuItem = 1
        } else if (pageOffset >= this.oOffsets['#workexperience'] && pageOffset < this.oOffsets['#aboutme']) {
            menuItem = 2   
        } else if (pageOffset >= this.oOffsets['#aboutme'] && pageOffset < this.oOffsets['#contact']) {
            menuItem = 3    
        } else {
            menuItem = 4
        }
        this.aMenuItems.forEach(
            (item) => item.classList.remove('active')
        )
        this.aMenuItems[menuItem].classList.add('active')
    }

    //
    prepararNavegacion() {
        this.aSections.forEach(
            (item) => {
                let cumulative =  this.cumulativeOffset(item);
                this.oOffsets['#'+item.id] = cumulative;
            }
        )
    
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
}