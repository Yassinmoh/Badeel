import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(){}
  http =inject(HttpClient)

  getCategories() {
    return this.http.get(`../../../../../assets/data/Categories.json`).pipe(map(data => ([data]))
    );
  }

}
