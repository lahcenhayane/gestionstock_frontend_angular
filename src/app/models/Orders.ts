import { Products } from './Products';
import { Clients } from './Clients';
import { Admins } from './Admins';
import { Employees } from './Employees';

export interface Orders{
    id?:number,
    prixTotal:number,
    employes:Employees,
    admins?:Admins,
    clients?:Clients,
    produits:Products[]
}