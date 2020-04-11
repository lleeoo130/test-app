import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CheeseModel} from "./cheese-list/cheese.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://127.0.0.1:8000/api/cheeses?isPublished=false&page=';

  constructor(private _http: HttpClient) { }

  getData(page = 1) {
    return this._http.get<CheeseModel []>(this.apiUrl+page);
  }

}
