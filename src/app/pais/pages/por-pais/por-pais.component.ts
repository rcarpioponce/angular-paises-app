import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li{
      cursor:pointer;
    }
  `]
})
export class PorPaisComponent  {

  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[];
  termino: string;
  mostrarSugerencias: boolean;

  constructor(private paisService: PaisService) { }

  buscar ( termino: string) {

    this.hayError = false;

    this.paisService.buscarPais( termino ).subscribe( (paises) => {
      this.paises = paises;

    }, (err) => {

      this.hayError =true;
      this.paises = [];

    });

  }
  sugerencias( termino:string ){
    this.mostrarSugerencias = true;
    this.termino = termino;
    this.hayError = false;

    this.paisService.buscarPais( termino )
      .subscribe(
        paises => this.paisesSugeridos = paises.splice(0,3),
        ( err ) => this.paisesSugeridos = []
      )
  }

  buscarSugerido ( termino : string) {
    this.buscar(termino);
    this.mostrarSugerencias = false;
  }


}
