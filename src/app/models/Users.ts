import { Sexe } from './Sexe';
import { Employees } from './Employees';
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
    dateNaissance:Date,
    sexe:Sexe,
    role:Roles
    supprimer?:Date

    client?:Clients
    employee?:Employees
}