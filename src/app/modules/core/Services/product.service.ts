import { Product } from './../model/Product';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, map, merge, of, pairwise } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private searchResultsSubject = new BehaviorSubject<Product[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();
  cachedProducts: Product[] = []
  constructor(private firestore: AngularFirestore) {
    this.loadAndCachedData()
  }

  // Add product
  addProduct(productData: Product) {
    return this.firestore.collection('products').add(productData);
  }

  // Fetch single product
  getProduct(productId: string): Observable<Product> {
    const productRef = this.firestore.collection('products', ref => ref.limit(10)).doc(productId);
    return productRef.get().pipe(
      map((productDoc) => (productDoc.exists ? productDoc.data() as Product : {}))
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

  loadAndCachedData() {
    this.getProducts().subscribe(res => {
      this.cachedProducts = res
    })
  }

  // Search products "Using Firestore Queries"
  searchProductsFirebaseQuerie(searchTerm: string): Observable<Product[]> {
    return this.firestore.collection<Product>('products', ref =>
      ref.orderBy('productArName')
        .where('productArName', '>=', searchTerm.toLowerCase())
        .where('productArName', '<', searchTerm.toLowerCase() + '\uf8ff')
    ).valueChanges({ idField: 'productId' });
  }


  searchProductsFilter(searchTerm: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products =>
        products.filter(product =>
          (product.productEnName?.includes(searchTerm) || product.productArName?.includes(searchTerm))
        )
      )
    );
  }

  updateSearchResults(results: Product[]) {
    this.searchResultsSubject.next(results);
  }
}
