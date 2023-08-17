import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  //styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {

  //inyectando el servicio para que los gifs lo muestre en la vista
    constructor( private gifsService: GifsService ) {}

    get gifs(): Gif[] {
        return this.gifsService.gifList;
  }


}
