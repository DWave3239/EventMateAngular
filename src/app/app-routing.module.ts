import { EventtileComponent } from './eventtile/eventtile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';     // Add your component here
import { AboutComponent } from './about/about.component';  // Add your component here
import { EventsComponent } from './events/events.component';

//This is my case
const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
