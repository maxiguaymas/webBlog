import { Component, OnInit } from '@angular/core';
import { Article } from 'src/models/article';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService]
})
export class HomeComponent implements OnInit {
  public title: string;
  public articles: Article[];
  public url_img: string;
  constructor(private _articleService: ArticleService) {
    this.title = "Ultimos articulos";
    this.articles = [];
    this.url_img = _articleService.url+"get-image/";
   }

  ngOnInit(): void {
    this._articleService.getArticles(true).subscribe(
      response =>{
        
        this.articles = response.articles_Stored;
      },
      error =>{
        console.log(error);
      }
    );
  }

}
