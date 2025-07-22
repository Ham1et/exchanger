import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .then(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.documentElement.classList.remove('preload');
      const loader = document.getElementById('app-loader');
      if (loader) loader.remove();
    }));
  })
  .catch(err => console.error(err));
