import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BASE_URL, buildParams } from 'src/app/util/api-util/request-utils';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(params: Object = {}): Observable<Category[]> {
    let searchParams = Object.entries(params)

    return this.http.get<Category[]>(`${BASE_URL}/category${buildParams(searchParams)}`, { headers: new HttpHeaders({'Content-Type':'application/json'}) })
  }

  saveCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${BASE_URL}/category`, category, { headers: new HttpHeaders({'Content-Type':'application/json'}) })
  }
}
