import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario: Usuario;
  private _storage: Storage;

  constructor(private storage: Storage) { 
    this.init();
  }

  async init(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  getUsuario() {
    return this.usuario;
  }

  setUsuario(nombre: string, clave: string): void {
    if (this.usuario == null) {
      this.usuario = new Usuario();
    }
    this.usuario.nombre = nombre;
    this.usuario.clave = btoa(clave);
  }

  async buscarUsuario(nombre: string): Promise<Usuario> {
    const resultado = await this._storage.get(nombre);

    if (resultado) {
      return resultado;
    }

    return null;
  }

  async crearUsuario(nombre: string, clave: string): Promise<any> {
    if (await this.buscarUsuario(nombre) != null) {
      return false;
    }

    this.setUsuario(nombre, clave);

    return await this._storage.set(nombre, this.getUsuario());
  }

  async verificarUsuario(nombre: string, clave: string): Promise<boolean> {
    const usuario: Usuario = await this._storage.get(nombre);

    if (usuario) 
      return btoa(clave) === usuario.clave;

    return false;
  }
}
