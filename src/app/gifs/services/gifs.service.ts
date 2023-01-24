import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

const newLocal = 'historial';
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey: string = '01K8uJCpRifbHvusikwMfHPrM2TBlzSo';

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];
  //TODO cambiar any por su tipo de dato
  public resultados: Gif[] = [];

  get historial() {

    return [...this._historial];
  }

  // Se crea el constructor de la clase que importamos para poder hacer hacer la peticion con con la palabra http
  constructor(private http: HttpClient) {

    //Se crea el JSON para poder parsear tanto el historial que se encuentra en el navegador así como el de resultados que se manda a traer desde setItem

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase();

    // Validacion de si se encuantra en la busqueda una palabra antes buscada.
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    console.log(this._historial);

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('q', query)
      .set('limit', '10');
    console.log(params);
    // Se crea una peticion de tipo get con la comilas invertidas para poder poder inyectar informacion de la palabra que queremos que busque en la api absorbida 
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        //Esta linea sirve para poder crear un almacenamiento en la base de datos que se encuentra dentro del propio navegador
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

  }

}
