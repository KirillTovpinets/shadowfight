import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  constructor() { }

  public message: string;
  public status: string;

  ngOnInit() {
  }
  getMessageColor() {
    return this.status === 'correct' ? 'rgba(0, 139, 0, .5)' : 'rgba(139, 0, 0, .5)';
  }
}
