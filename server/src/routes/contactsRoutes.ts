import { Router } from 'express';

import  contactsController  from '../controllers/contactsController'

class ContactsRoutes{

    public router : Router = Router();


    constructor(){
        this.config();

    }

    config(): void{
     this.router.get('/', contactsController.list);

     this.router.get('/:id', contactsController.getOne);

     this.router.post('/', contactsController.create);

     this.router.put('/:id', contactsController.update);

     this.router.delete('/:id', contactsController.delete);
    }
    
}

const contactsRoutes = new ContactsRoutes();
export default contactsRoutes.router;