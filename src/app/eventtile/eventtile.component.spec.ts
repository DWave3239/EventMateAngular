import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventtileComponent } from './eventtile.component';

describe('EventtileComponent', () => {
  let component: EventtileComponent;
  let fixture: ComponentFixture<EventtileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventtileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventtileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
