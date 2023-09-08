import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  async logout() {
    const loadingElement = await this.loadingController
      .create({ message: 'Cerrando sesión...' });
      
    await loadingElement.present();
    const result = await this.loginService.logout();
    await loadingElement.dismiss();

    if (result) {
      this.router.navigate(['login']);
    }
  }
}
