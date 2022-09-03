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
    let mensajeDeError: string = '';
    
    if (this.nombre && this.clave) {
      const respuesta = await this.usuarioService.verificarUsuario(this.nombre, this.clave);

      if (respuesta) {
        this.usuarioService.setUsuario(this.nombre, this.clave);
        this.limpiarCampos();
        this.router.navigate(['home']);
      } else {
        mensajeDeError = 'Credenciales incorrectas!';
      }

    } else {
      mensajeDeError = 'Credeciales vacías!';
    }

    if (mensajeDeError) {
      const alert = await this.alertController.create({
        header: 'Error en el inicio de sesión',
        message: mensajeDeError,
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }

  async registrarse() {
    let mensajeDeError = '';

    if (this.nombre && this.clave) {
      const respuesta = await this.usuarioService.crearUsuario(this.nombre, this.clave);

      if (respuesta) {
        this.usuarioService.setUsuario(this.nombre, this.clave);
        this.limpiarCampos();
        this.router.navigate(['home']);
      } else {
        mensajeDeError = 'El usuario ya existe!';
      }

    } else {
      mensajeDeError = 'Credenciales inválidas!';
    }

    if (mensajeDeError) {
      const alert = await this.alertController.create({
        header: 'Error de registro',
        message: mensajeDeError,
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
