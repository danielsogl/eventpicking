import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from '@ngx-translate/core';

export class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of(lang);
  }
}
