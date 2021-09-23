import { Employees } from './Employees';
import { Clients } from './Clients';

export interface Users{
    id?:number,
    cin:string,
    nom:string,
    prenom:string,
    email:string,
    password?:string,
    ville:string,
    tel:string,
    dateNaissance:Date,
    gendre:string,
    role:string
    
    supprimer?:Date

    client?:Clients
    employee?:Employees
}