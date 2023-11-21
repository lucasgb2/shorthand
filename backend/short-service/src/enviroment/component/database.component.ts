import { AppDataSourceMongodb, AppDataSourceRedis, AppDataSourceSQLite } from '../../repository/dataSource';
import { Component } from './component.interface';

/*
export class DataBaseComponent implements Component {

    async initialize(): Promise<boolean> {
        await AppDataSourceSQLite.initialize().then(async (valor) => {
            console.log(valor);
            console.log('Conectado SQLite: ' + AppDataSourceSQLite.options.database);
        }
        ).catch((error) => console.log('Erro conectar SQLite' + error));
       
       await AppDataSourceRedis.connect().then(async () => {
        console.log('Conectado Redis: ' + AppDataSourceMongodb.options.database);
    }
    ).catch((error) => console.log('Erro conectar Redis' + error));        

        await AppDataSourceMongodb.initialize().then(async () => {
            console.log('Conectado Mongodb: ' + AppDataSourceMongodb.options.database);
        }
        ).catch((error) => console.log('Erro conectar MongoDB' + error));
        return true;
    }
} 
*/


export class DataBaseComponent implements Component {

    async initialize(): Promise<boolean> {
        console.log('Inicializando Database Component')


        const sqlite = await AppDataSourceSQLite.initialize();
        console.log('UP sqlite')

        const redis = await AppDataSourceRedis.connect();
        console.log('UP redis')

        const mongo = await AppDataSourceMongodb.initialize();
        console.log('UP mongodb')
        if (sqlite && redis && mongo) {
            return true;
        } else {
            return false;
        }
    }
} 