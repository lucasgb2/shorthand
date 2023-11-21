import { UrlBussines } from '../bussines/url.business';
import { apiServer } from '../enviroment/component/apiserver.component';
import { midLogger } from '../middleware/midLogger';
import { RoutesShort as RoutesUrl } from './urlRoutes';


export const initRoutes = () => {

    /**
     * Middleware de logger
     */
    if (Boolean(process.env.API_ACTIVE_LOG) == true) {
        apiServer.expressApp.use(midLogger);
    }

    /**
     * Publicando rotas para serem acessíveis
     */
    apiServer.expressApp.use(new RoutesUrl(new UrlBussines()).routes);    
    

};



