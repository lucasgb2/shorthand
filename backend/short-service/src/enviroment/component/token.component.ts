import { RangeToken, TokenRepository } from '../../repository/entities/tokenEntity';
import { Component } from "./component.interface";


export class TokenComponent implements Component {

    private rangeToken: RangeToken = { beginToken: 0, endToken: 0 };
    private lastToken: number = 0;

    
    private async generateToken(): Promise<RangeToken> {
        let inc: number = process.env.INCREMENT_RANGE_TOKEN ? parseInt(process.env.INCREMENT_RANGE_TOKEN) : 1000;
        let beginToken: number = 0;
        let endToken: number = 0;

        var sequence: TokenRepository | null = await TokenRepository.findOneBy({ id: 1 });

        if (sequence) {
            beginToken = sequence.lastToken + 1;
            sequence.lastToken = sequence.lastToken + inc
        } else {
            beginToken = 1;
            sequence = new TokenRepository();
            sequence.lastToken = (inc as number);
        }
        await sequence.save();

        endToken = sequence.lastToken;
        const range: RangeToken = { beginToken, endToken };

        return range;
    }

    public async newRangeToken(): Promise<boolean> {
        this.rangeToken = await this.generateToken();
        this.lastToken = this.rangeToken.beginToken;
        return true;        
    }

    public async initialize(): Promise<boolean> {        
        console.log('Inicializando Token Component');
        await this.newRangeToken();
        return true;
    }


    public nextToken(): number {
        if (this.lastToken == this.rangeToken.endToken) {
            this.newRangeToken();
        } else {
            this.lastToken++;
        }
        return this.lastToken;
    }

}