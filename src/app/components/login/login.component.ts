import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { Login } from 'src/app/shared/models/login.model';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    private route: ActivatedRoute
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
        first()
      ).subscribe(
        resp => {
          this.router.navigate([this.returnUrl])
        }
      )
    }
  }

  ngOnDestroy(): void {
    //this.loginSub.unsubscribe()
  }
}
