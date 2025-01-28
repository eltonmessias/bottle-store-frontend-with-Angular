import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding, withDebugTracing } from '@angular/router';
import { routes } from './app/app.routes';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withDebugTracing(), withComponentInputBinding()),  importProvidersFrom(
      BrowserAnimationsModule,
      MatTableModule,
      MatButtonModule
    )
  ],
})
  .catch((err) => console.error(err));
