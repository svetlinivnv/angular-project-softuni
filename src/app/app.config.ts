import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: 'AIzaSyDdpbFoibLm_4JVhWyStq2TGYEXu3dKrDo',
  authDomain: 'angular-exam-be.firebaseapp.com',
  projectId: 'angular-exam-be',
  storageBucket: 'angular-exam-be.firebasestorage.app',
  messagingSenderId: '404548139465',
  appId: '1:404548139465:web:3179db0297c8bcfa2b1018',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
