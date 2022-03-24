import { Request, Response } from 'express';

import pool from '../database';

class ContactsController{

    public async list (req: Request, res: Response) {
       const contacts = await pool.query('SELECT * FROM contacts');
       res.json(contacts);
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        //res.json({text: 'Listing contact ' + req.params.id});
        const { id } = req.params;
        const contacts = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
        if (contacts.length > 0){
            return res.json(contacts[0]);
        }
        res.status(404).json({text: 'The contact doesn`t exists'});
    }

    public async create (req:Request, res: Response): Promise<void>{
        const { email } = req.params;

        try{
            await pool.query('INSERT INTO contacts SET ?', [req.body]);
            console.log(req.body);
            res.json({message: 'Contact saved'});

        }catch(ER_DUP_ENTRY){
            res.json({message: 'Contact duplicated'});
        }
    }

    public async update (req:Request, res: Response){
        //res.json({ text: 'Updating the contact ' + req.params.id});
        const { id } =req.params;
        await pool.query('UPDATE contacts SET ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The contact was updated'});
    }

    public async delete (req:Request, res: Response): Promise<void>{
        //res.json({text: 'Deleting the contact ' + req.params.id})
        const { id } = req.params;
        await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
        res.json({message: 'Contact was deleted'});
    }
}

const contactsController = new ContactsController();

export default contactsController;