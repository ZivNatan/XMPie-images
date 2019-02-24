import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GetImagesService {

  constructor(private http: HttpClient) { }

  getResults(q, page) {
     // tslint:disable-next-line:max-line-length
     return this.http.get(`https://pixabay.com/api/?key=11700245-7018c9db5ea16521d66b6ecf4&q=${q}&category=animals&per_page=20&page=${page}`);
  }
}
