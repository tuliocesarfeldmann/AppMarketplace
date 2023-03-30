import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subscription, tap } from 'rxjs';
import { initializeCustomRoutes } from 'src/app/app.module';
import { Login } from 'src/app/shared/models/login.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  private returnUrl: string;

  private loginSub: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
    ) {
      if(authService.isLogged){
        router.navigate([""])
      }

    this.form = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() { return this.form.controls }

  login(): void {
    if (this.form.valid) {
      this.loginSub = this.authService.login(new Login(this.f["username"].value, this.f["password"].value)).pipe(
        first(),
        tap(() => {
          let initRoutes = initializeCustomRoutes(this.router, this.categoryService)
          initRoutes()
        })
      ).subscribe(
        resp => {
          this.router.navigate([this.returnUrl])
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe()
  }
}
