import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store'
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth/add-token.interceptor';
import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { errorReducer } from './store/error/error.reducer';
import { contadorReducer } from './store/contador/contador.reducer';
import { exercisesForTemplateReducer } from './store/exercisesForTemplate/exercisesForTemplate.reducer';
import { mealsForTemplateReducer } from './store/mealsForTemplate/mealsForTemplate.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(), // Asegúrate de incluir `provideHttpClient`
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Tu interceptor
      multi: true, // Permite múltiples interceptores
  },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor, // Tu interceptor
        multi: true, // Permite múltiples interceptores
    },
    provideStore(),
    provideState({ name: 'error', reducer:errorReducer }),
    provideState({ name: 'contador', reducer:contadorReducer }),
    provideState({ name: 'exercisesSelectedForTemplate', reducer:exercisesForTemplateReducer }),
    provideState({ name: 'mealsSelectedForTemplate', reducer:mealsForTemplateReducer }),
    provideStoreDevtools({ 
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit:75 })]
};
