import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-choose-skin',
  templateUrl: './choose-skin.component.html',
  styleUrls: ['./choose-skin.component.sass']
})
export class ChooseSkinComponent implements OnInit {

  @ViewChild('frontView') frontView: any;
  @ViewChild('body') body: any;
  @ViewChild('head') head: any;
  @ViewChild('weapon') weapon: any;

  constructor(private dataSrv: DataService,
              private router: Router,
              private gameConfig: GameService) { }

  public headSkins: string[] = [];
  public bodySkins: string[] = [];
  public weaponSkins: string[] = [];

  public selectedHead: any = {};
  public selectedBody: any = {};
  public selectedWeapon: any = {};
  private user: any;
  private params: any = {
    frame: 1
  };
  ngOnInit() {
    this.gameConfig._user.subscribe( res => {
      this.user = res;
    });
    this.drawSkin('assets/images/userposition/front/head.png', this.frontView.nativeElement.width / 2, 0);
    this.drawSkin('assets/images/userposition/front/body.png', this.frontView.nativeElement.width / 2 - 68, 58);
    this.drawSkin('assets/images/userposition/front/legs.png', this.frontView.nativeElement.width / 2 - 52, 190);
    const data = this.dataSrv.getSkins();
    _.forEach(Object.keys(data), (e) => {
      data[e].subscribe(res => {
        switch (e) {
          case 'head':
            this.headSkins = res;
            this.gameConfig.setHeads(this.headSkins);
            break;
          case 'body':
            this.bodySkins = res;
            this.gameConfig.setBodies(this.bodySkins);
            break;
          case 'weapon':
            this.weaponSkins = res;
            this.gameConfig.setWeapons(this.weaponSkins);
            break;
        }
      });
    });
  }
  drawSkin(url: string, x: number, y: number) {
    const skin = new Image();
    skin.src = url;
    const cxt = this.frontView.nativeElement.getContext('2d');
    cxt.clearRect(0, 0, this.frontView.nativeElement.width, this.frontView.nativeElement.height);
    const that = this;
    skin.onload = () => {
      cxt.drawImage(skin, x, y);
    };
  }
  selectHead(skin) {
    this.gameConfig.playSound('click');
    this.selectedHead = skin;
    const shadowSkin = _.find(this.headSkins, {id: skin.id});
    const head = this.head.nativeElement;
    const img = document.createElement('img');
    img.setAttribute('src', shadowSkin.userFront);
    img.style.width = '100%';
    if (head.firstChild) {
      head.removeChild(head.firstChild);
    }
    head.append(img);
    this.user.head = shadowSkin;
  }
  selectBody(skin) {
    this.gameConfig.playSound('click');
    this.selectedBody = skin;
    const shadowSkin = _.find(this.bodySkins, {id: skin.id});
    const body = this.body.nativeElement;
    const img = document.createElement('img');
    img.setAttribute('src', shadowSkin.userFront);
    img.style.width = '100%';
    if (body.firstChild) {
      body.removeChild(body.firstChild);
    }
    body.append(img);
    this.user.body = shadowSkin;
  }
  selectWeapon(skin) {
    this.gameConfig.playSound('click');
    this.selectedWeapon = skin;
    const shadowSkin = _.find(this.weaponSkins, {id: skin.id});
    const weapon = this.weapon.nativeElement;
    const img = document.createElement('img');
    img.setAttribute('src', shadowSkin.userFront);
    img.style.width = '100%';
    if (weapon.firstChild) {
      weapon.removeChild(weapon.firstChild);
    }
    weapon.append(img);
    this.user.weapon = shadowSkin;
  }
  characterAnimation(frame) {
    const img = new Image();
    img.src = `assets/images/userposition/front-frames/fr_00${this.params.frame}_Layer-${35 - this.params.frame}.png`;
    frame += 1;
    const cxt = this.frontView.nativeElement.getContext('2d');
    cxt.clearRect(0, 0, this.frontView.nativeElement.width, this.frontView.nativeElement.height);
    this.params.frame += 1;
    if (this.params.frame === 35) {
      this.params.frame = 1;
    }
    img.onload = () => {
      cxt.drawImage(img, 0, 0);
    };
  }
  startGame() {
    if (_.isEmpty(this.selectedBody) || _.isEmpty(this.selectedHead) || _.isEmpty(this.selectedWeapon)) {
      alert('You haven\'t choolse all the skins');
      return;
    } else {
      this.gameConfig.playSound('start');
      this.gameConfig.playSound('fight');
      this.user.hp = 100;
      this.user.statistic = [];
      this.user.defeated = [];
      this.gameConfig.updateUser(this.user);
      localStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigate(['start']);
    }
  }

}
