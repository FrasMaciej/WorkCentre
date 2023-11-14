/// <reference path="../../shared/types/auth.d.ts" />
/// <reference path="../../shared/types/user.d.ts" />
/// <reference path="../../shared/types/jobs.d.ts" />
/// <reference path="../../shared/types/message.d.ts" />
/// <reference path="../../shared/types/organizations.d.ts" />
/// <reference path="../../shared/types/notifications.d.ts" />


import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
