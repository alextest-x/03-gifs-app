import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  //templateUrl: 'name.component.html'
template: `
     <h5>Buscar:</h5>
     <input type="text"
     class="form-control"
     placeholder="Buscar Gifs..."
     (keyup.enter)="searchTag()"
     #txtTagInput
     >

`

})

export class SearchBoxComponent{

  @ViewChild('txtTagInput')
  //(tagInput!) no null operator simpre va tener una refenrecia
  public tagInput!: ElementRef<HTMLInputElement>;


  //hay que inyectar el servicio por el constructor

  constructor( private gifsService: GifsService ) { }


  searchTag(){
    const newTag = this.tagInput.nativeElement.value;


    this.gifsService.searchTag(newTag);

    //para limpiar la caja de texto
    this.tagInput.nativeElement.value ='';

    //console.log({newTag});
  }

}
