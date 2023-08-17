import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html'

})
export class CardComponent implements OnInit {


 /*
  validando que gif no venga vacio si viene vacio lanza un error
  OnInit se ejecuta cuando el componente se ha inicializado
  hay que implementar el OnInit con ngOnInit():

  */

  @Input()
  public gif!: Gif;  //hay que inicializarlo con ! simpre va tener un valor

  ngOnInit(): void {
    if(!this.gif) throw new Error('Gif property is requered');
  }

}
