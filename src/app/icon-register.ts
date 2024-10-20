// src/app/icon-register.ts
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export function registerIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'));
  iconRegistry.addSvgIcon('instagram', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/instagram.svg'));
  iconRegistry.addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter.svg'));
  // Adicione mais ícones conforme necessário
}
