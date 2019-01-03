import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSkinComponent } from './choose-skin.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChooseSkinComponent', () => {
  let component: ChooseSkinComponent;
  let fixture: ComponentFixture<ChooseSkinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ ChooseSkinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });
});
