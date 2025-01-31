import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

export const appConfig: ApplicationConfig = {
  // providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withDebugTracing(), withComponentInputBinding()), provideHttpClient(withInterceptors([authInterceptor]))]
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes, withDebugTracing(), withComponentInputBinding()),  
    importProvidersFrom(
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule
  )
],
};
