import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/article';
import { ArticleService } from 'src/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
  providers: [ArticleService]
})
export class CreateArticleComponent implements OnInit {
  public article: Article;

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
  }

  ngOnInit(): void {
  }

  onSubmit(formArticle:any){
    this._articleService.create(this.article).subscribe(
      response =>{
        this.article = response.article;
        console.log(response);
        Swal.fire(
          'Articulo creado con exito.',
          '',
          'success'
        );
        this._router.navigate(['/blog']);
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
}
