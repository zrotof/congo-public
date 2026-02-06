import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // OBLIGATOIRE pour le Toast
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';

import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

import Lara from '@primeng/themes/lara';
import { registerLocaleData } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    MessageService,
    provideAnimations(),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          theme: 'lara-light-blue',
          darkModeSelector: false,
        }
      }
    }),
  ]
};
