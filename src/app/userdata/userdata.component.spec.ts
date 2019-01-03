import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdataComponent } from './userdata.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserdataComponent', () => {
  let component: UserdataComponent;
  let fixture: ComponentFixture<UserdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdataComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
