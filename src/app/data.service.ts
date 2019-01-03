import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getSkins(): any {
    const data = {
      head: this.http.get('assets/data/skins/head.json'),
      body: this.http.get('assets/data/skins/body.json'),
      weapon: this.http.get('assets/data/skins/weapon.json'),
    };
    return data;
  }

  getScenes(): Observable<any> {
    return this.http.get('/api/scenes');
  }
  getMethods(): Observable<any> {
    return this.http.get('/api/methods');
  }

  getTask(type: string, level: number): Observable<any> {
    return this.http.post(`/api/task`, { type, level });
  }

  getLevels(): Observable<any> {
    return this.http.get('assets/data/levels/levels.json');
  }

  getAudio(): Observable<any> {
    return this.http.get('assets/data/sounds.json');
  }
  getRecordsList(): Observable<any> {
    return this.http.get('/records');
  }
  saveResult(user: any): Observable<any> {
    return this.http.post('/save', user);
  }
}
