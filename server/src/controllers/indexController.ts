import { Request, Response } from 'express';

class IndexController{

    public index (req: Request, res: Response) {
        //res.send('Hello')
        res.json({text: 'API is /api/contacts'});
    }
}

export const indexController = new IndexController();