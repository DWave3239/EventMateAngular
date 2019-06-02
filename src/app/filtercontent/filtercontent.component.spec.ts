import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltercontentComponent } from './filtercontent.component';

describe('FiltercontentComponent', () => {
  let component: FiltercontentComponent;
  let fixture: ComponentFixture<FiltercontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltercontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltercontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
