import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRegularComponent } from './app-regular.component';
import { AComponent } from './components/a.component';
import { BComponent } from './components/b.component';
import { NgWrapperComponent } from './components/ng-wrapper.component';
import { EmbeddedComponents, embeddedComponents } from './embedded-components';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
  ],
  providers: [
    EmbeddedComponents,
  ],
  declarations: [
    AppComponent,
    AppRegularComponent,

    NgWrapperComponent,
    AComponent,
    BComponent,
  ],
  entryComponents: [
    ...embeddedComponents,
  ],
  bootstrap: [ AppRegularComponent, AppComponent ]
})
export class AppModule {}
