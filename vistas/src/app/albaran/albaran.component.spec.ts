import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbaranComponent } from './albaran.component';

describe('AlbaranComponent', () => {
  let component: AlbaranComponent;
  let fixture: ComponentFixture<AlbaranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbaranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
