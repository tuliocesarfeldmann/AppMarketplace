import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'appPassaroUrbano';

  constructor(private authService: AuthService){
  }

  isLogged(): boolean {
    return this.authService.isLogged
  }
}
