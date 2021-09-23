import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {ContentComponent} from './components/content/content.component';
import {NavbarComponent} from './components/content/navbar/navbar.component';
import {SidebarComponent} from './components/content/sidebar/sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/content/pages/home/home.component';
import { UsersComponent } from './components/content/pages/users/users.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ProductsComponent } from './components/content/pages/products/products.component';
import { CategoriesComponent } from './components/content/pages/categories/categories.component';
import { OrdersComponent } from './components/content/pages/orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContentComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    UsersComponent,
    PageNotFoundComponent,
    ProductsComponent,
    CategoriesComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
