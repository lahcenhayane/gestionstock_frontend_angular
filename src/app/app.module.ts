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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ProductsComponent } from './components/content/pages/products/products.component';
import { CategoriesComponent } from './components/content/pages/categories/categories.component';
import { OrdersComponent } from './components/content/pages/orders/orders.component';
import { AddComponent } from './components/content/pages/orders/add/add.component';
import { ShowComponent } from './components/content/pages/orders/show/show.component';
import { HeaderComponent } from './components/content/pages/home/header/header.component';
import { TopclientComponent } from './components/content/pages/home/topclient/topclient.component';


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
    OrdersComponent,
    AddComponent,
    ShowComponent,
    HeaderComponent,
    TopclientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule
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
