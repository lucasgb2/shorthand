import { RangeToken, TokenRepository } from "../repository/entities/tokenEntity";
import { DataBaseComponent } from "./component/database.component";
import { TokenComponent } from "./component/token.component";
import { apiServer } from "./component/apiserver.component";
import { Component } from "./component/component.interface";

interface ComponentClass {
    new(): Component;
}


export class InstanceEnv {

    private static instanceEnv: InstanceEnv;
    private components: Component[] = [];
    public token: TokenComponent;

    public getComponent<T>(type: any): T {
        return <T>this.components.find(component => {
            if (component instanceof type) {
                return component;
            }
        })
    }

    public async initializeComponentsdel(components: Component[]): Promise<void> {
        this.components = components;
        for (var component of components) {
            await component.initialize();
        }
    }

    constructor() { };

    public static getIntance(): InstanceEnv {
        if (!this.instanceEnv) {
            this.instanceEnv = new InstanceEnv();
        }
        return InstanceEnv.instanceEnv
    }

}