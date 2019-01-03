import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRoundComponent } from './display-round.component';

describe('DisplayRoundComponent', () => {
  let component: DisplayRoundComponent;
  let fixture: ComponentFixture<DisplayRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
