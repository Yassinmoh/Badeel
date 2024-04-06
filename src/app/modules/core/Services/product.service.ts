import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../model/Product';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) {}

// Add product
addProduct(productData: Product) {
  return this.firestore.collection('products').add(productData);
}

// Fetch single product
getProduct(productId: string): Observable<Product> {
  const productRef = this.firestore.collection('products',ref => ref.limit(10)).doc(productId);
  return productRef.get().pipe(
    map((productDoc) => (productDoc.exists ? productDoc.data() as Product:{}))
  );
}

// Fetch product list
getProducts(): Observable<Product[]> {
  return this.firestore.collection('products').get().pipe(
    map((productsSnapshot) => productsSnapshot.docs.map((doc) => doc.data() as Product))
  );
}

// Update product
updateProduct(productId: string, productData: Product): Promise<void> {
  const productRef = this.firestore.collection('products').doc(productId);
  return productRef.update(productData);
}

// Delete product
deleteProduct(productId: string): Promise<void> {
  const productRef = this.firestore.collection('products').doc(productId);
  return productRef.delete();
}
}
