import { AuthLoginGuard } from './guards/auth-login.guard';
import { UsersComponent } from './components/content/pages/users/users.component';
import { ContentComponent } from './components/content/content.component';
import { HomeComponent } from './components/content/pages/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductsComponent } from './components/content/pages/products/products.component';
import { CategoriesComponent } from './components/content/pages/categories/categories.component';
import { OrdersComponent } from './components/content/pages/orders/orders.component';

const routes: Routes = [
  { path:"login", component:LoginComponent, canActivate:[AuthLoginGuard] },

  { path:"", redirectTo:"home", pathMatch:"full" },
  { 
    path:"", 
    component:ContentComponent,
    children:[
      { path:"home", component:HomeComponent },
      { 
        path:"users",
        children:[
          { path:"", component:UsersComponent },
        ]
      },
      {
        path:"products",
        component:ProductsComponent
      },
      {
        path:"categories",
        component:CategoriesComponent
      },
      {
        path:"orders",
        component:OrdersComponent
      }
    ],
    canActivate:[AuthGuard]
  },


  { path:"**", component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
