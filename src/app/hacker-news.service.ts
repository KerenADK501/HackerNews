import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HackerNewsService {
  private apiUrl = 'https://hacker-news.firebaseio.com/v0/';

  constructor(private http: HttpClient) {}

  getNewestStories(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/newstories.json`);
  }

  getStory(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/item/${id}.json`);
  }
}


