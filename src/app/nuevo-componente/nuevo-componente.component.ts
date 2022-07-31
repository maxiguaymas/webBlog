import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-nuevo-componente',
  templateUrl: './nuevo-componente.component.html',
  styleUrls: ['./nuevo-componente.component.css']
})
export class NuevoComponenteComponent implements OnInit {
  public title: string;
  public name: string;
  public surname: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.title = "Prueba de componente";
    this.name = "";
    this.surname = "";
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) =>{
      this.name = params['nombre'];
      this.surname = params['apellido'];
    });
    console.log(this.name,this.surname);
  }

  redireccion(){
    this._router.navigate(['/pruebas','Maximiliano','Guaymas']);
  }
  redireccion2(){
    this._router.navigate(['/pruebas']);
  }

}
