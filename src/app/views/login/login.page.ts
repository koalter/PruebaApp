import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  clave: string;
  spinner: HTMLIonLoadingElement;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private toastController: ToastController,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadingController.create({
      message: 'Iniciando sesión...'
    }).then(res => this.spinner = res);
  }

  limpiarCampos() {
    this.email = '';
    this.clave = '';
  }

  async submit() {
    await this.iniciarSesion(this.email, this.clave);
  }

  async iniciarSesionComoInvitado() {
    await this.iniciarSesion(this.usuarioService.testUser["mail"], this.usuarioService.testUser["clave"]);
  }

  async registrarse() {
    await this.spinner.present();
    try {
      await this.usuarioService.crearUsuario(this.email, this.clave);
      this.limpiarCampos();
      this.router.navigate(['home']);
      
    } catch (error) {
      const alert = await this.toastController.create({
        header: 'Error de registro',
        duration: 2000,
        position: 'top',
        color: 'danger',
        icon: 'information-circle'
      });
      
      await alert.present();
      
    } finally {
      await this.spinner.dismiss();
    }
  }

  private async iniciarSesion(email: string, clave: string) {
    await this.spinner.present();
    try {
      await this.usuarioService.verificarUsuario(email, clave);
      this.limpiarCampos();
      this.router.navigate(['home']);
      
    } catch (error) {
      const alert = await this.toastController.create({
        header: 'Error al iniciar sesión!',
        duration: 2000,
        position: 'top',
        color: 'danger',
        icon: 'information-circle'
      });
      
      await alert.present();
  
    } finally {
      await this.spinner.dismiss();
    }
  }
}
