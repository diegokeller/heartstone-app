import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {

    loader: HTMLIonLoadingElement

    constructor(private loadingController: LoadingController) {

    }

    public async show(){
        this.loader = await this.loadingController.create({message: 'Loading...'});
        this.loader.present()
    } 

    public hide(){
        if(this.loader){
            this.loader.dismiss()
        }
    }

}