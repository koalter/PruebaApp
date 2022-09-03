import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  titulo: string;
  
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    const user = this.usuarioService.getUsuario();
    if (user) {
      this.titulo = `Bienvenido ${user.nombre}!`;
    } else {
      this.titulo = 'Acceso denegado!';
    }
  }

}
