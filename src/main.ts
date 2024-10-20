import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { APP_INITIALIZER } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { registerIcons } from './app/icon-register';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => () => registerIcons(iconRegistry, sanitizer),
      deps: [MatIconRegistry, DomSanitizer],
      multi: true
    }
  ]
}).catch(err => console.error(err));
