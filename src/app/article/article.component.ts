import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from 'src/models/article';
import { ArticleService } from 'src/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {
  public url_img:string
  public article!: Article;
  constructor(
    private _articleService: ArticleService,
    private _router:Router,
    private _route: ActivatedRoute
    ) {this.url_img = _articleService.url+ "get-image/" }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id= params['id'];
      this._articleService.getArticle(id).subscribe(
        response =>{
          if(response.article){
            this.article = response.article;
          }
          else{
            alert("ha ocurrido un error.");
            this._router.navigate(['/home']);
          }
        },
        error =>{
          alert("ha ocurrido un error.");
          this._router.navigate(['/home']);
        }
      );
    });
  }

  delete(id:string){

    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras volver a acceder al articulo si lo eliminas.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Articulo eliminado',
          '',
          'success'
        );
        this._articleService.delete(id).subscribe(
          response =>{
            this._router.navigate(['/blog']);
          },
          error =>{
            alert("Ha ocurrido un error al eliminar el articulo");
            this._router.navigate(['/blog']);
          }
        )
      }
    });
  }

}
