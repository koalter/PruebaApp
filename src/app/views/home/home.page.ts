import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  titulo: string;
  
  constructor(public actionSheetController: ActionSheetController,
    private router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit() { 
    this.usuarioService.getUsuario().then(res => {
      if (res) {
        this.titulo = `Bienvenido!`;
      } else {
        this.titulo = 'Acceso denegado!';
      }
    });
  }

  async desplegarOpciones() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Cerrar sesión',
        id: 'logout',
        handler: async () => {
          await this.usuarioService.cerrarSesion();
          this.router.navigate(['']);
        }
      },{
        text: 'Volver'
      }]
    });

    await actionSheet.present();
  }

}
