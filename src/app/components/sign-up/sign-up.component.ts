import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ROLES_LIST } from 'src/app/util/api-util/utils';
import toaster from 'toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public form: FormGroup
  public rolesList = ROLES_LIST

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      username: new FormControl("", [Validators.required, Validators.minLength(5)]),
      password: new FormControl("", [Validators.required]),
      roles: new FormControl("", [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  roleList(item:any[]){
    this.form.controls["roles"].setValue(item);
  }

  signUp(): void {
    this.authService.signUp(this.form.value).subscribe({
      next: () => {
        this.router.navigate(["/login"])
        toaster.success("Usuário criado com sucesso!")
      },
      error: () => {
        this.form.reset()
      }
    });
  }
}
