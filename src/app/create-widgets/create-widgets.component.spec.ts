import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWidgetsComponent } from './create-widgets.component';

describe('CreateWidgetsComponent', () => {
  let component: CreateWidgetsComponent;
  let fixture: ComponentFixture<CreateWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
