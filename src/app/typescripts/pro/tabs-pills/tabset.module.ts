import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgTranscludeDirective } from './transclude.directive';
import { TabHeadingDirective } from './tab-heading.directive';
import { TabDirective } from './tab.directive';
import { TabsetComponent } from './tabset.component';
import { TabsetConfig } from './tabset.config';
import { RippleDirective } from './ripple-effect.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NgTranscludeDirective, TabDirective, TabsetComponent, TabHeadingDirective, RippleDirective],
  exports: [TabDirective, TabsetComponent, TabHeadingDirective, NgTranscludeDirective, RippleDirective]
})
export class TabsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TabsModule,
      providers: [TabsetConfig]
    };
  }
}
