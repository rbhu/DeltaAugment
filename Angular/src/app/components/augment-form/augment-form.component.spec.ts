import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AugmentFormComponent } from './augment-form.component';

describe('AugmentFormComponent', () => {
  let component: AugmentFormComponent;
  let fixture: ComponentFixture<AugmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AugmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AugmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
