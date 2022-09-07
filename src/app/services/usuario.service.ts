import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  testUser = {
    mail: "test@example.com",
    clave: "password"
  };

  constructor(private auth: Auth) { }

  async cerrarSesion(): Promise<void> {
    await signOut(this.auth);
  }

  async crearUsuario(mail: string, clave: string): Promise<any> {
    return await createUserWithEmailAndPassword(this.auth, mail, clave);
  }

  async verificarUsuario(mail: string, clave: string): Promise<any> {
    await signInWithEmailAndPassword(this.auth, mail, clave);
  }

  async getUsuario(): Promise<any> {
    return await this.auth.currentUser;
  }
}
