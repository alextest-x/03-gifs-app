import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',

})
export class CardListComponent {

  //ponemos el gifs en el home-page.component.html
@Input()
public gifs: Gif[] = [];


/*
borrar
@Output()
public gifrew: Gif[] =[];
*/

}
