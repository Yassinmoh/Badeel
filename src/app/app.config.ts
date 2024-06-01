import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { environment } from '../environment/environment';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './store/products/product.effects';
import { CategoryEffect } from './store/categories/category.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './modules/core/interceptor/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideToastr({ closeButton: false }),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore())
    ]),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideStore(reducers, { metaReducers }),
    provideEffects([ProductsEffects, CategoryEffect])
  ]
};
