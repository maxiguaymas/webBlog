import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/article';
import { ArticleService } from 'src/services/article.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {
  public article: Article;
  public url_img: string;
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: 50,
    uploadAPI:  {
      url:this._articleService.url + "upload-image"
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    
    replaceTexts: {
      attachPinBtn: 'Sube la imagen'
    }
  };

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.article = new Article("","","","",null);
    this.url_img = _articleService.url+ "get-image/"
   }

  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit(formArticle:any){
    let id = this.article._id;
    this._articleService.update(id,this.article).subscribe(
      response =>{
        this.article = response.article;
        console.log(response);
        Swal.fire(
          'Articulo editado con exito.',
          '',
          'success'
        );
        let route = "/article/"+ id;
        this._router.navigate([route]);
      },
      error =>{
        console.log(error)
      }
    )
  };

  docUpload(event:any){
    let image_data = event.body.image;
    this.article.image = image_data;
  }

  getArticle(){
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

}
