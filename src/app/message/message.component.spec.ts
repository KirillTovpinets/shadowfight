import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create correct message', () => {
    component.status = 'correct';
    expect(component.getMessageColor()).toEqual('rgba(0, 139, 0, .5)');
    component.status = 'error';
    expect(component.getMessageColor()).toEqual('rgba(139, 0, 0, .5)');
    component.status = 'any other value';
    expect(component.getMessageColor()).toEqual('rgba(139, 0, 0, .5)');
  });
});
