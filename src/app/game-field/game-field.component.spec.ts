import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFieldComponent } from './game-field.component';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { HttpClientModule } from '@angular/common/http';

describe('GameFieldComponent', () => {
  let component: GameFieldComponent;
  let fixture: ComponentFixture<GameFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFieldComponent ],
      imports: [FormsModule, DndModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
