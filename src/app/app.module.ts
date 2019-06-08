import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EventtileComponent } from './eventtile/eventtile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NavComponent} from './nav/nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FilterComponent } from './filter/filter.component';
import {MatExpansionModule} from '@angular/material/expansion'; 

@NgModule({
  declarations: [
    AppComponent,
    EventtileComponent,
    NavComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
