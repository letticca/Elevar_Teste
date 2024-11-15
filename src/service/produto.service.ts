import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/model/Iprodutos';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  //private const apiPath = 'http:/localhost:3000/produtos';

  getProducts(): Observable<any> {
      return this.http.get<Product[]>("assets/produtos.json");
  }


}
