import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"danotes-c0d74","appId":"1:56698629064:web:75a76a4fdb27e1b1de2efd","storageBucket":"danotes-c0d74.appspot.com","apiKey":"AIzaSyBsaKgkku9HlnvIwovxYUnc9wQWddcf3b0","authDomain":"danotes-c0d74.firebaseapp.com","messagingSenderId":"56698629064"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
