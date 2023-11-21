import { AppDataSourceRedis } from '../repository/dataSource';
import { Business } from './business.interface';
import { Request } from 'express';
import { InstanceEnv } from '../enviroment/instance';
import { UrlEntity } from '../repository/entities/urlEntity';
import { URL } from 'node:url';
import base62 = require('base62');
import { TokenComponent } from '../enviroment/component/token.component';
import { MessageNotify } from '../util/util';


type NewShortUrl = {
    tokenSequence: number;
    tokenBase62: string;
    shortUrl: string;
    longUrl: string;
}


export class UrlBussines implements Business {

    getRootUrl(): string {
        return process.env.URL_ROOT ? process.env.URL_ROOT : 'http://127.0.0.1';
    }

    getNewUrlShort(): NewShortUrl {
        const tokenSequence = InstanceEnv.getIntance().getComponent<TokenComponent>(TokenComponent).nextToken();// token.nextToken();
        const tokenBase62 = base62.encode(tokenSequence);

        const url: URL = new URL(tokenBase62, this.getRootUrl());
        const newShortUrl: NewShortUrl = { tokenSequence, tokenBase62, shortUrl: url.href, longUrl: '' };
        return newShortUrl;
    }

    async saveShortUrl(longUrl: string, urlShort: NewShortUrl) {
        const urlShortEntity: UrlEntity = new UrlEntity();
        urlShortEntity.sequence = urlShort.tokenSequence;
        urlShortEntity.token = urlShort.tokenBase62;
        urlShortEntity.longUrl = longUrl;
        urlShortEntity.shortUrl = urlShort.shortUrl;
        urlShortEntity.hit = 0;
        await urlShortEntity.save();
    }

    async saveInCache(url: NewShortUrl): Promise<void> {
        AppDataSourceRedis.set(url.tokenBase62, url.longUrl);
    }

    addHttpIfNotExits(url: string): string {
        if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
            url = "http://" + url;
        }
        return url;
    }
    /**
     * Método para atualizar quantas vezes um endereço foi acessado.
     * Não é utilizado async/await para não aguardar a finalização afim
     * de melhor desempenho     
     */
    hitUrl(codebase62: string) {
        UrlEntity.findOneBy({ token: codebase62 }).then((result: UrlEntity | null) => {
            if (result) {                
                result.hit++;
                result.save();
            }
        });
    }

    async get(request: Request): Promise<string> {
        var codebase62: string = request.params.codebase62;
        var longUrlSaved: string = ''
        
        const cacheLongUrl: string | null = await AppDataSourceRedis.get(codebase62);
        if (cacheLongUrl) {            
            longUrlSaved = cacheLongUrl;
        } else {
            const shortUrlEntity: UrlEntity | null = await UrlEntity.findOneBy({ token: codebase62 });
            if (shortUrlEntity) {
                AppDataSourceRedis.set(shortUrlEntity.token, shortUrlEntity.longUrl);
                this.hitUrl(codebase62);
                longUrlSaved = shortUrlEntity.longUrl;
            } 
        }
        if (longUrlSaved != ''){
            this.hitUrl(codebase62);            
            return longUrlSaved
        }else{
            return ''
        }
        
    };

    async post(request: Request): Promise<object> {
        var longUrl: string = request.body.url;
        if (longUrl) {
            longUrl = this.addHttpIfNotExits(longUrl);
            try {
                
                try {
                    const validateUrl = new URL(longUrl);
                } catch (error) {
                    return { message: MessageNotify.msgUrlInvalid };
                }

                const newShortUrl: NewShortUrl = this.getNewUrlShort();
                newShortUrl.longUrl = longUrl;
                await this.saveShortUrl(longUrl, newShortUrl);
                await this.saveInCache(newShortUrl);
                return { url: newShortUrl.shortUrl };
            } catch (error) {
                return { message: MessageNotify.msgFailGenerateShorUrl + ': ' + error };
            }

        } else {
            return { menssage: MessageNotify.msgUrlInvalid };
        }

    };
}

function preg_match(arg0: string, $url: any) {
    throw new Error('Function not implemented.');
}
