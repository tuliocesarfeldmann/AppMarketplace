import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { DiversionComponent } from './components/diversion/diversion.component';
import { LoginComponent } from './components/login/login.component';
import { OfferMagnamentComponent } from './components/offer-magnament/offer-magnament.component';
import { OfferComponent } from './components/offer/offer.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterOfferComponent } from './components/register-offer/register-offer.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './shared/enums/roles.enum';
import { Category } from './shared/models/category.model';
import { CategoryService } from './shared/services/category.service';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signUp", component: SignUpComponent },
  { path: "", component: HomeComponent, canActivate: [AuthGuard], data: { roles: [Role.CLIENTE, Role.VENDEDOR] } }, 
  { path: "offer/:id", component: OfferComponent, canActivate: [AuthGuard], data: { roles: [Role.CLIENTE, Role.VENDEDOR] } },
  { path: "order", component: OrderComponent, canActivate: [AuthGuard], data: { roles: [Role.CLIENTE, Role.VENDEDOR] } },
  { path: "offerMagnament", component: OfferMagnamentComponent, canActivate: [AuthGuard], data: { roles: [Role.VENDEDOR] } },
  { path: "registerOffer", component: RegisterOfferComponent, canActivate: [AuthGuard], data: { roles: [Role.VENDEDOR] } },
  { path: "registerOffer/:id", component: RegisterOfferComponent, canActivate: [AuthGuard], data: { roles: [Role.VENDEDOR] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  routes: Routes = routes

  constructor(){
  }
}
