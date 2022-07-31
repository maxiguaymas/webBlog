import { Injectable } from "@angular/core";
import { Pelicula } from "src/models/pelicula";

@Injectable()
export class PeliculaService{
    protected peliculas: Pelicula[];
    constructor(){
        this.peliculas = [
            new Pelicula("SpiderMan 4",2022,"https://areajugones.sport.es/wp-content/uploads/2021/09/spiderman-4-2.jpg"),
            new Pelicula("Rapido Y Furioso",2005,"https://mx.web.img3.acsta.net/pictures/21/04/14/17/28/5059871.jpg"),
            new Pelicula("Cars 2",2015,"https://es.web.img2.acsta.net/medias/nmedia/18/82/02/41/19753255.jpg"),
            new Pelicula("Granizo",2022,"https://www.elcomercio.com/wp-content/uploads/2022/04/granizo1.jpg"),
        ]
    }

    getPeliculas(){
        return this.peliculas;
    }
}