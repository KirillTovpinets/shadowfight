import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-display-round',
  templateUrl: './display-round.component.html',
  styleUrls: ['./display-round.component.sass']
})
export class DisplayRoundComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  @Output() nextOpponent: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  public levels: any[] = [];
  public defeated: any[] = [];
  ngOnInit() {
    this.nextOpponent.emit(this.levels[this.defeated.length]);
  }

  getTransformValue() {
    const width = this.container.nativeElement.offsetWidth;
    return `translate3d(${width / 2 - ((this.defeated.length + 1) * 150) - 100}px, 0, 0)`;
  }
}
