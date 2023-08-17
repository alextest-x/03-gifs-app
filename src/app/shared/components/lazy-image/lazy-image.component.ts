import { Component, Input, OnInit } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'shared-lazy-Image',
  templateUrl: './lazy-image.component.html'
})

export class LazyImageComponent implements OnInit {


  /*
  para enviar el url a lazy-image.component.html
  */
  @Input()
  public url!: string;

  @Input()
  public alt: string='';
  public hasLoaded: boolean= false;


  ngOnInit(): void {
    if(!this.url) throw new Error('URL Property is required');
  }

  onLoad(){
    setTimeout(() => {
      this.hasLoaded= true;
  }, 1000);
 }


/*
  onLoad(){
    console.log('Image loaded');
    this.hasLoaded= true;
  }
*/

}
