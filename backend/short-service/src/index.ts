import dotenv from 'dotenv';
dotenv.config();

import { apiServer, ApiServer } from './enviroment/component/apiserver.component';
import { TokenComponent } from './enviroment/component/token.component';
import { DataBaseComponent } from './enviroment/component/database.component';
import { initRoutes } from './routes/routes';
import { InstanceEnv } from './enviroment/instance';

const initializeApp = async () => {
    await InstanceEnv.getIntance().initializeComponentsdel([new DataBaseComponent(), new TokenComponent()]);
    apiServer.initialize();
    initRoutes();
}

initializeApp();

