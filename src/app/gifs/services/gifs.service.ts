import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

//poniendo la llave en una cosntante
//const GIPHY_APY_KEY = 'gjJZIsW3BoojybBxoLExJrcuwSYJo822';

@Injectable({ providedIn: 'root'})
export class GifsService {

//se hace un arreglo para obtener los objetos de la api de los gifs
// y mandarlos llamar en el subscribe
public gifList: Gif[] = [];

private _tagsHistory: string []= [];

//llave de la api a donde se va a conectar
private apiKey:     string ='gjJZIsW3BoojybBxoLExJrcuwSYJo822';

private serviceUrl: string ='http://api.giphy.com/v1/gifs'


//api.giphy.com/v1/gifs/trending
//api.giphy.com/v1/gifs/search?api_key=gjJZIsW3BoojybBxoLExJrcuwSYJo822


//inyectando el HttpCliente donde lo definimos en app.module.ts
constructor( private http: HttpClient) {
  this.loadLocalStorage();
  console.log('Gifs Service Ready');
}


get tagsHistory(){
  //crea el operador [...] expred para crear ua copia del valor _tagsHistory
  return [...this._tagsHistory];
}

private organizeHistory( tag: string ) {

  //el tag buscado pasa a minuscula
   tag = tag.toLowerCase();

   if(this._tagsHistory.includes( tag )) {
    //el tag que sea diferente lo deja pasar
    this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
   }

   //inserta el nuevo tag al inicio
   this._tagsHistory.unshift( tag );
   this._tagsHistory= this.tagsHistory.splice(0, 10);
   this.saveLocalStorage();
}




//localstorage
//hay que serializar this._tagshistory a un string con JSON.stringify({a:1, b:2, c:3})
//lo genera como un objeto de tipo string
private saveLocalStorage(): void{
localStorage.setItem('history', JSON.stringify(this._tagsHistory));
}

//cargar el localstorage
private loadLocalStorage():void{
  //validar si esta el objeto en el localstorage
  //hay data que esta guardada conla llave de history
  //pero con el ! de negacion sino hay data no se hace nada
  if( !localStorage.getItem('history')) return;

  //si hay data hay que cargar de nuevo
  //this._tagsHistory es un arreglo y history es un string
  //hay que ponerlo compactible con JSON.parse y con el operador ! not null operator
  //no haya error
  this._tagsHistory = JSON.parse( localStorage.getItem('history')!);

  //validando que no haya mas elementos se sale
  if(this._tagsHistory.length === 0)return;
  //si hay mas de un elemento busca en el _tagsHistory la posicion cero
  this.searchTag(this._tagsHistory[0]);



  }


  //haciendo una peticion Http
  searchTag( tag: string ): void{
    if(tag.length === 0 )return;
    this.organizeHistory(tag);

  //agregando a un objeto params los parametros de la api
    const params = new HttpParams()
    .set('api_key', this.apiKey )
    .set('limit','10')
    .set('q', tag)


    //vamos usar de tipo generico con las <> y ponemos la interface

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
    .subscribe( resp => {

    this.gifList = resp.data;
    console.log({ gifs: this.gifList });


  });



/*
  this.http.get('http://api.giphy.com/v1/gifs/search?api_key=gjJZIsW3BoojybBxoLExJrcuwSYJo822&q=valorant&limit=10')
  //para escuchar las emisiones o respuestas nos subscribimos con un   .subscribe()
  //ponemos un observador resp => {}
  .subscribe(resp => {
    console.log(resp);
  });
  */

  //añadir al inicio con unshift()
  //this._tagsHistory.unshift(tag);
  //console.log(this.tagsHistory);
}





/*
simplificando el fecth
async searchTag( tag:string ): Promise<void>{
  //si el tag es igual a cero que no haga nada
  if(tag.length === 0 )return;
  this.organizeHistory(tag);


  const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=gjJZIsW3BoojybBxoLExJrcuwSYJo822&q=valorant&limit=10')

  const data = await resp.json();
  console.log(data);


  //añadir al inicio con unshift()
  this._tagsHistory.unshift(tag);
  console.log(this.tagsHistory);
}
*/

/*
//utiñizando fecth
async searchTag( tag:string ): Promise<void>{
  //si el tag es igual a cero que no haga nada
  if(tag.length === 0 )return;
  this.organizeHistory(tag);


  fetch('http://api.giphy.com/v1/gifs/search?api_key=gjJZIsW3BoojybBxoLExJrcuwSYJo822&q=valorant&limit=10')
  .then(resp => resp.json())
  .then (data => console.log(data));


  //añadir al inicio con unshift()
  this._tagsHistory.unshift(tag);
  console.log(this.tagsHistory);
}
*/

}
