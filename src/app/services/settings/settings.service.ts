import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes(tema: string) {
    this.ajustes.temaUrl = `assets/css/colors/${tema}.css`;
    this.ajustes.tema = tema;
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    this.aplicarTema();
  }

  getTemaActual() {
    return this.ajustes.tema;
  }

  private cargarAjustes() {
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema();
    }
  }

  private aplicarTema() {
    this._document.getElementById('tema').setAttribute('href', this.ajustes.temaUrl);
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
