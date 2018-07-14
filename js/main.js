import { Menu } from './menu.js';
import { FormContact} from './form.js';

export class Main {
    constructor() {
        this.oMenus = new Menu();
        this.oFormContact = new FormContact();        
    }
}