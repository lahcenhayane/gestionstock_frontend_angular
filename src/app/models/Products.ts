import { Categories } from './Categories';
export interface Products{
    id?:number,
    nom:string,
    prix:number,
    quantity:number,

    categorie:Categories
}