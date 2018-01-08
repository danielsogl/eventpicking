import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Log } from 'ng2-logger';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  Log.setProductionMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
