import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { GameService } from '../game.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent implements OnInit {

  constructor(private dataSrv: DataService,
              private config: GameService) { }
  private soundList: any[] = [];

  ngOnInit() {
    this.dataSrv.getAudio().subscribe( res => {
      this.soundList = res;
      this.config.updateSoundList(this.soundList);
      const menuTrack = _.find(this.soundList, (e) => e.src.indexOf('menu') !== -1);
      const audio = new Audio();
      audio.src = menuTrack.src;
      audio.load();
      this.config.updatePlayer(audio);
    });
  }
}
