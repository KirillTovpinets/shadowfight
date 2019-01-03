import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.sass'],
})
export class UserdataComponent implements OnInit {

  constructor(private router: Router,
              private gameConfig: GameService) { }
  public nickname: string;
  private user: any;

  ngOnInit() {
    this.gameConfig._user.subscribe( res => this.user = res);
  }

  saveNickname() {
    this.user.nickname = this.nickname;
    this.gameConfig.updateUser(this.user);
    this.router.navigate(['chooseskin']);
  }
}
