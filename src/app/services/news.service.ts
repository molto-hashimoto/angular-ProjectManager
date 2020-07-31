import { News } from './../interfaces/news';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsColumns: string[] = ['date', 'content'];
  newsData: News[] = [
    {date: new Date(2020, 6, 28), content: 'Home画面作成'},
    {date: new Date(2020, 6, 26), content: '勤怠機能追加'},
    {date: new Date(2020, 6, 23), content: 'プロジェクト管理機能追加'},
    {date: new Date(2020, 6, 20), content: '新規作成'}
  ];

  constructor() { }

  getAll() {
    return this.newsData;
  }
}
