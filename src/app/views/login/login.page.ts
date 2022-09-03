import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nombre: string;
  clave: string;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  async iniciarSesion() {
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
    }
  }

  async registrarse() {
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
    }
  }

  limpiarCampos() {
    this.nombre = '';
    this.clave = '';
  }
}
