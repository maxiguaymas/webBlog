import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/models/pelicula';
import { PeliculaService } from 'src/services/pelicula.service';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css'],
  providers: [PeliculaService]
})
export class PaginaComponent implements OnInit {
  public title: string;
  public peliculas: Pelicula[];
  constructor(public _peliculaService: PeliculaService) { 
    this.title = "PAGINA DE PRUEBA";
    this.peliculas = _peliculaService.getPeliculas();
  };

  ngOnInit(): void {
    console.log(this.peliculas);
  };

}
