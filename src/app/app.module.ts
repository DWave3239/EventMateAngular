import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventtileComponent } from './eventtile/eventtile.component';
import { FiltercontentComponent } from './filtercontent/filtercontent.component';

@NgModule({
  declarations: [
    AppComponent,
    EventtileComponent,
    FiltercontentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
