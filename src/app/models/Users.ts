import { Clients } from './Clients';
import { Roles } from './Roles';
export interface Users{
    id?:number,
    cin:string,
    nom:string,
    prenom:string,
    email:string,
    password?:string,
    ville:string,
    tel:string,
    date_naissance:Date,
    role:Roles
    supprimer:Date

    cleint:Clients
}