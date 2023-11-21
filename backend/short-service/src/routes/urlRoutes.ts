
import { Router, Request, Response } from 'express';
import { Business } from '../bussines/business.interface';

export class RoutesShort {

    public routes: Router;
    private business: Business;

    constructor(business: Business) {        
        this.routes = Router();  
        this.business = business;      
        this.mapEndpoint();        
    }

    mapEndpoint(): void {

        this.routes.get('/:codebase62', async (req: Request, res: Response) => {
            const url: string = await this.business.get(req);
            if (url != ''){
                res.redirect(url);
            }else{
                res.status(404);                
            }
            
        });

        this.routes.post('/v1/short', async (req: Request, res: Response) => {            
            res.send(await this.business.post(req));
        })
    }
}