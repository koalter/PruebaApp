import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nombre: string;
  clave: string;
  spinner: HTMLIonLoadingElement;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadingController.create({
      message: 'Iniciando sesión...'
    }).then(res => this.spinner = res);
  }

  async iniciarSesion() {
    await this.spinner.present();
    try {
      await this.usuarioService.verificarUsuario(this.nombre, this.clave);
      this.limpiarCampos();
      this.router.navigate(['home']);
      
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error al iniciar sesión!',
        buttons: ['OK']
      });
      
      await alert.present();
      
    } finally {
      await this.spinner.dismiss();
    }
  }

  async registrarse() {
    await this.spinner.present();
    try {
      await this.usuarioService.crearUsuario(this.nombre, this.clave);
      this.limpiarCampos();
      this.router.navigate(['home']);
      
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error de registro',
        buttons: ['OK']
      });
      
      await alert.present();

    } finally {
      await this.spinner.dismiss();
    }
  }

  limpiarCampos() {
    this.nombre = '';
    this.clave = '';
  }
}
