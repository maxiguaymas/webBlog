import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public title: string;
  public user:any;

  constructor() {
    this.title = "FORMULARIO COMPONENT";
    this.user = {
      name: "",
      surname: "",
      bio: "",
      gender: ""
    }
   }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    console.log(this.user);
    form.reset();
  }
}
