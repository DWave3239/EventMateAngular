import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, 
         MatExpansionModule, MatFormFieldModule, MatNativeDateModule, 
         MatSidenavModule, MatSliderModule, MatSlideToggleModule, 
         MatToolbarModule, MatChipsModule, MatAutocompleteModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { EventtileComponent } from './eventtile/eventtile.component';
import { FilterComponent } from './filter/filter.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';


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
    MatExpansionModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
