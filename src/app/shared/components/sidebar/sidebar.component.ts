import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService: GifsService){}

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  //para enviar del menu del historial de gifs a la caja de texto para que busque de nuevo
  //el gisf que estaba en el historial
  searhTag(tag: string): void{
   this.gifsService.searchTag(tag);

  }

}
