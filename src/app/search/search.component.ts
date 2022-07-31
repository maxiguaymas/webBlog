import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Article } from 'src/models/article';
import { ArticleService } from 'src/services/article.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArticleService]
})
export class SearchComponent implements OnInit {
  public articles: Article[];
  public url_img:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
    ) {
      this.url_img = _articleService.url+"get-image/";
      this.articles = [];
     }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let search = params['search'];

      this._articleService.search(search).subscribe(
        response =>{
          this.articles = response.articles;
        },
        error =>{
          this.articles = [];
        }
      )
    })
  }

}
