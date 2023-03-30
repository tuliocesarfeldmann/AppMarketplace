import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import localePt from '@angular/common/locales/pt'
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { FooterComponent } from './views/footer/footer.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { DiversionComponent } from './components/diversion/diversion.component';
import { OfferComponent } from './components/offer/offer.component';
import { NoLongTextPipe } from './util/pipes/no-long-text.pipe';
import { OrderComponent } from './components/order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CategoryComponent } from './components/category/category.component';
import { Router } from '@angular/router';
import { CategoryService } from './shared/services/category.service';
import { Category } from './shared/models/category.model';
import { AuthGuard } from './guards/auth.guard';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MultipleSelectComponent } from './components/multiple-select/multiple-select.component';
import { RegisterOfferComponent } from './components/register-offer/register-offer.component';
import { MultipleImageUploadComponent } from './components/multiple-image-upload/multiple-image-upload.component';
import { OfferMagnamentComponent } from './components/offer-magnament/offer-magnament.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';

registerLocaleData(localePt)

export function initializeCustomRoutes(router: Router, categoryService: CategoryService) {
  return () => {
    categoryService.getCategories().subscribe({
      next: (res: Category[]) => {
        const routes = router.config;
        res.forEach((category) => {
          routes.push({
            path: category.path,
            component: CategoryComponent,
            canActivate: [AuthGuard],
            data: { roles: category.roles.map(r => r.name) }
          });
        });
        router.resetConfig(routes);
      },
      error: (err) => console.log(err)
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    RestaurantComponent,
    DiversionComponent,
    OfferComponent,
    NoLongTextPipe,
    OrderComponent,
    LoginComponent,
    CategoryComponent,
    SignUpComponent,
    MultipleSelectComponent,
    RegisterOfferComponent,
    MultipleImageUploadComponent,
    OfferMagnamentComponent,
    CreateCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
