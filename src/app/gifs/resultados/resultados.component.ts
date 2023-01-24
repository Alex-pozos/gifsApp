import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  // Se crea el metodo por el cual se hara  la peticion a la clase mencionada a bajo para poder visualizar la informacion
  get resultados() {
    return this.gifsService.resultados;
  }

  // Se crea el contructorpara poder manejar la informacion que viene desde gifs.service.ts haciendo referencia la clase principal 
  constructor(private gifsService: GifsService) { }

}
