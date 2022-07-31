import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { Article } from "src/models/article";
import { Global } from "./global";

@Injectable()
export class ArticleService{
    public url: string
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    getArticles(last:any = null):Observable<any>{
        let articles = "articles";
        if(last != null){
            articles = "articles/5";
        }
        return this._http.get(this.url+articles);
    }
    
    getArticle(articleId:string): Observable<any>{
        return this._http.get(this.url+"article/"+articleId);
    }

    search(searchString:string): Observable <any>{
        return this._http.get(this.url+"search/"+searchString);
    }

    create(article:any):Observable<any>{
        let params = JSON.stringify(article);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+"save",params, {headers: headers});
    }

    update(id:string, article:any) :Observable <any>{
        let params = JSON.stringify(article);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+"article/"+id,params, {headers: headers});
    }

    delete(id:string) :Observable <any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.delete(this.url+"delete/"+id, {headers: headers});
    }
}