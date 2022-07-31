import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/models/article';
import { Global } from 'src/services/global';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  
  @Input() articles!: Article[];
  @Input() url_img!: string;
  constructor() {
    
  }

  ngOnInit(): void {
   
  }

}
