import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList,AngularFireObject} from '@angular/fire/compat/database';
import { Product } from '../model/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsRef!: AngularFireList<any>;
  productRef!: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}

  AddStudent(product: Product) {
    this.productsRef.push({
      status: product.status,
      productArName: product.productArName,
      productEnName: product.productEnName,
      company: product.company,
      details: product.details,
      link: product.link,
    });
  }
}
