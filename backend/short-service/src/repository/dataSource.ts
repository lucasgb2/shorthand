import { DataSource } from 'typeorm';
import { createClient } from 'redis';

console.log(__dirname + '/entities/tokenEntity.ts')
export const AppDataSourceSQLite = new DataSource({
    type: 'sqlite',        
    database: './database.sql',    
    entities: [__dirname + '/entities/tokenEntity.ts'],     
    synchronize: true,
    logging: false    
});

export const AppDataSourceRedis = createClient();

export const AppDataSourceMongodb = new DataSource({
    type: "mongodb",    
    url: "mongodb+srv://lowpricedb:7qFwiieRMByzqQO2@clusterlowprice.fg2zoa8.mongodb.net/?retryWrites=true&w=majority",
    useNewUrlParser: true,
    database:"shorturl",
    synchronize: true,
    logging: true,    
    entities: [__dirname + '/entities/urlEntity.ts'], 
    
})
