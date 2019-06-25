import { EventtileComponent } from './eventtile/eventtile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';     // Add your component here
import { AboutComponent } from './about/about.component';  // Add your component here
import { EventsComponent } from './events/events.component';
import { RegisterComponent } from './register/register.component';
import { YourEventsComponent } from './your-events/your-events.component';
import { PlannedEventsComponent } from './planned-events/planned-events.component';

//This is my case
const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'yourEvents',
    component: YourEventsComponent
  },
  {
    path: 'plannedEvents',
    component: PlannedEventsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
