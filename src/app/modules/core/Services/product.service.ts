import { Product } from './../model/Product';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cachedProducts: Product[] = []
  PAGE_SIZE = 12
  lastDocument!: object


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
  getProducts(startAfter?: any): Observable<Product[]> {
    let queryFn = (ref: any) => ref.orderBy('productEnName').limit(this.PAGE_SIZE);
    if (startAfter) {
      queryFn = ref => ref.orderBy('productEnName').startAfter(startAfter).limit(this.PAGE_SIZE);
    }

    return this.firestore.collection('products', queryFn).snapshotChanges().pipe(
      map(actions => {
        if (actions.length > 0) {
          // Update the lastDocument with the last document in this batch
          this.lastDocument = actions[actions.length - 1].payload.doc;
        }
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Load More Products:
  loadMoreProducts(): Observable<Product[]> {
    return this.getProducts(this.lastDocument);
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

  // Load And Cache Data:
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

  // Search products:
  searchProductsFilter(searchTerm: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products =>
        products.filter(product =>
          (product.productEnName?.includes(searchTerm) || product.productArName?.includes(searchTerm))
        )
      )
    );
  }

  // Filter Products:
  filterProducts(products: Product[], currentActiveFilter: any): Product[] {
    return products.filter(product => {
      const categoryMatch = currentActiveFilter.category.includes(product.category);
      const subCategoryMatch = currentActiveFilter.selectedSubCategories.includes(product.subCategory);
      const statusMatch = currentActiveFilter.selectedStatuses.includes(product.status);
      return categoryMatch || subCategoryMatch || statusMatch;
    });
  }

}
