import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/shared/enums/roles.enum';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public form: FormGroup
  public rolesList = [
    { id: 1, name: "CLIENTE" },
    { id: 2, name: "VENDEDOR" }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
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
    this.authService.signUp(this.form.value).subscribe();
  }
}
