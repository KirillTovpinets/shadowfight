import { Component, OnInit, ViewChild, TemplateRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { GameService } from '../game.service';
import { DisplayRoundComponent } from '../display-round/display-round.component';
import { MessageComponent } from '../message/message.component';
import { DndDropEvent } from 'ngx-drag-drop';
import { Router } from '@angular/router';
@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.sass'],
})
export class GameFieldComponent implements OnInit {
  @ViewChild('gameField') game: any;
  @ViewChild('scene') scene: any;
  @ViewChild('dialog') dialog: TemplateRef<any>;
  @ViewChild('arithmeticTask') arTask: TemplateRef<any>;
  @ViewChild('dragAndDrop') dadTask: TemplateRef<any>;
  @ViewChild('audioTask') audioTask: TemplateRef<any>;
  @ViewChild('roundDisplay', { read: ViewContainerRef }) roundDis: ViewContainerRef;

  constructor(private dataSrv: DataService,
              private modalSrv: NgbModal,
              private gameConfig: GameService,
              private compResolver: ComponentFactoryResolver,
              private router: Router) { }

  public draggables = [];
  private sceneList: any[] = [];
  public currentScene: any = {};
  public userNick: string;
  public methods: any[] = [];
  public taskToSolve: any;
  private modal: NgbModalRef;
  private taskModal: NgbModalRef;
  private levels = [];
  public solution: string;
  public user: any;
  public opponent: any;
  public defeated: any[] = [];
  private field: any;
  public dndSolution: string[] = [];
  private heads: any[];
  private bodies: any[];
  private weapons: any[];
  private test = false;
  private namePart =  {
    adjs: ['хитрый', 'коварный', 'беспощадный', 'жестокий', 'тщеславный', 'необузданный', 'самолюбивый'],
    nouns: ['ниндзя', 'cэнсэй', 'самурай', 'солдат', 'ронин', 'ассасин', 'синоби'],
    names: ['Като', 'Мотидзуки', 'Исикава', 'Хаттори', 'Санада', 'Сарутоби', 'Киригакурэ'],
  };
  displayOpponent(data?: any) {
    if (data !== undefined) {
      this.levels = data;
    }
    const compFactory = this.compResolver.resolveComponentFactory(DisplayRoundComponent);
    this.roundDis.clear();

    const componentRef = this.roundDis.createComponent(compFactory);
    componentRef.instance.levels = this.levels;
    componentRef.instance.defeated = this.defeated;
    componentRef.instance.nextOpponent.subscribe( opp => {
      this.opponent = opp;
      const randomAdjIndex = Math.floor(Math.random() * this.namePart.adjs.length);
      const randomNounIndex = Math.floor(Math.random() * this.namePart.nouns.length);
      const randomNameIndex = Math.floor(Math.random() * this.namePart.adjs.length);

      const randomAdj = this.namePart.adjs[randomAdjIndex];
      const randomNoun = this.namePart.nouns[randomNounIndex];
      const randomName = this.namePart.names[randomNameIndex];

      this.opponent.nickname = `${randomAdj} ${randomNoun} ${randomName}`;
      this.gameConfig.updateOpponent(this.opponent);
    });
    setTimeout(() => {
      this.roundDis.clear();
      this.renderScene();
    }, 6000);
  }
  ngOnInit() {
    if (this.test) {
      this.useTestData();
    } else {
      this.dataSrv.getLevels().subscribe( res => this.displayOpponent(res));
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    this.field =  this.game.nativeElement.getContext('2d');
    this.gameConfig._user.subscribe( (res) => {
      if (_.isEmpty(res)) {
        this.user = JSON.parse(localStorage.getItem('user'));
      } else {
        this.user = res;
      }
      if (this.user.hp > 0) {
        this.drawHealth('user', 274 * (this.user.hp / 100));
      } else {
        this.dataSrv.saveResult(this.user).subscribe( data => {
          console.log(data);
          this.router.navigate(['records']);
        });
      }
    });
    this.gameConfig._opponent.subscribe( (res) => {
      this.opponent = res;
      if (this.opponent.hp > 0) {
        this.drawHealth('opponent', 274 * (this.opponent.hp / 100));
      } else if (!_.isEmpty(res)) {
        this.user.hp = 100;
        this.gameConfig.updateUser(this.user);
        this.defeated.push(this.opponent);
        this.user.defeated.push(this.opponent);
        if (this.defeated.length === this.levels.length) {
          const compFactory = this.compResolver.resolveComponentFactory(MessageComponent);
          const componentRef = this.roundDis.createComponent(compFactory);
          componentRef.instance.message = 'Congratulation!!! You are the winner!';
          componentRef.instance.status = 'correct';
          setTimeout(() => {
            this.router.navigate(['records']);
          }, 2000);
        }
        this.displayOpponent();
      }
    });
    this.dataSrv.getScenes().subscribe( res => {
      this.sceneList = res;
      this.renderScene();
    });
    this.dataSrv.getMethods().subscribe( res => this.methods = res );
    this.gameConfig._heads.subscribe( res => this.heads = res );
    this.gameConfig._bodies.subscribe( res => this.bodies = res );
    this.gameConfig._weapons.subscribe( res => this.weapons = res );
  }
  useTestData() {
    this.opponent = {
      'level': 1,
      'avatar': 'assets/images/avatars/avatar-1.png',
      'nickname': 'Test name',
      'head': '',
      'body': '',
      'weapoon': '',
      'hp': 100
    };
    this.user = {
      nickname: 'KirillTovpinets',
      hp: 100,
      head: {
          'id': 0,
          'src' : 'assets/images/skins/head/head-1.png',
          'userFront' : 'assets/images/skins/head-shadow/head-1.png',
          'sidewaysUsr' : 'assets/images/userposition/sideways/user/skinhead/head-1.png',
          'sidewaysOpp' : 'assets/images/userposition/sideways/opponent/skinhead/head-1.png'
        },
        body: {
          'id': 0,
          'src' : 'assets/images/skins/body/body-1.png',
          'userFront' : 'assets/images/skins/body-shadow/body-1.png',
          'sidewaysUsr' : 'assets/images/userposition/sideways/user/skinbody/body-1.png',
          'sidewaysOpp' : 'assets/images/userposition/sideways/opponent/skinbody/body-1.png'
        },
        weapon: {
          'id': 0,
          'src' : 'assets/images/skins/weapons/weapon-1.png',
          'userFront' : 'assets/images/skins/weapons-shadow/weapon-1.png',
          'single' : 'assets/images/skins/weapons/single/weapon-1.png'
        },
    };
    this.gameConfig.updateUser(this.user);
    this.gameConfig.updateOpponent(this.opponent);

    const data = this.dataSrv.getSkins();
    _.forEach(Object.keys(data), (e) => {
      data[e].subscribe(res => {
        switch (e) {
          case 'head':
            this.gameConfig.setHeads(res);
            break;
          case 'body':
            this.gameConfig.setBodies(res);
            break;
          case 'weapon':
            this.gameConfig.setWeapons(res);
            break;
        }
      });
    });
  }
  renderScene() {
    const randomIndex = Math.random() * (this.sceneList.length - 1);
    this.currentScene = this.sceneList[Math.round(randomIndex)];
    this.scene.nativeElement.style.background = `url('${this.currentScene.src}') no-repeat`;
    this.scene.nativeElement.style.backgroundSize = 'cover';
    this.scene.nativeElement.style.backgroundPosition = 'center';
    this.drawElements();
  }
  drawElements() {
    this.clearCanvas();
    const oppBody = _.shuffle(this.bodies)[0];
    const weapon = _.shuffle(this.weapons)[0];
    const oppHead = _.shuffle(this.heads)[0];
    this.drawImage(this.user.head.sidewaysUsr, 110, 221);
    // this.animateBreath(this.user.head.sidewaysUsr, 110, 221, 1);
    this.drawImage(this.user.body.sidewaysUsr, 0, 244);
    this.drawWeapon(this.user.weapon.single, 'user', 'left');
    this.drawWeapon(this.user.weapon.single, 'user', 'right');
    // this.drawImage(this.user.weapon.single, 510, -50, 45);
    // this.drawImage(this.user.weapon.single, 200, 40, 55);
    this.drawImage(oppHead.sidewaysOpp, 680,  221);
    this.drawImage(oppBody.sidewaysOpp, 600,  244);
    // this.drawImage(weapon.single, 465, 760, -45);
    // this.drawImage(weapon.single, 430, 500, -20);
    this.drawWeapon(weapon.single, 'opp', 'left');
    this.drawWeapon(weapon.single, 'opp', 'right');
    this.drawImage('assets/images/avatars/avatar_hero.png', 0, 0);
    this.drawImage('assets/images/statistic/health.png', 160, 50);
    this.drawImage(this.opponent.avatar, 800, 0);
    this.drawImage('assets/images/statistic/health-opposite.png', 550, 50);
    this.typeName(165, 40, this.user.nickname, 'left');
    this.typeName(820, 40, this.opponent.nickname, 'right');
  }
  drawWeapon(url: string, who: string, pos: string) {
    const exist = document.getElementById(`${who}-${pos}-weapon`);
    if (exist) {
      return;
    }
    const imgEl = document.createElement('img');
    imgEl.classList.add('weapon');
    imgEl.src = url;
    imgEl.style.position = 'absolute';
    imgEl.style.transition = 'all 1s ease';
    switch (pos) {
      case 'left':
        imgEl.style.top = '174px';
        if (_.isEqual(who, 'user')) {
          imgEl.style.left = '244px';
          imgEl.style.transform = 'rotate(45deg)';
        } else {
          imgEl.style.right = '282px';
          imgEl.style.transform = 'rotate(-45deg)';
        }
        break;
      case 'right':
        imgEl.style.top = '310px';
        if (_.isEqual(who, 'user')) {
          imgEl.style.left = '561px';
          imgEl.style.transform = 'rotate(26deg)';
        } else {
          imgEl.style.right = '597px';
          imgEl.style.transform = 'rotate(-26deg)';
        }
        break;
      default:
        break;
    }
    imgEl.setAttribute('id', `${who}-${pos}-weapon`);
    imgEl.onload = () => {
      this.scene.nativeElement.append(imgEl);
    };
  }
  clearCanvas() {
    this.field.clearRect(0, 0, this.game.nativeElement.width, this.game.nativeElement.height);
  }
  typeName(x, y, name, alignment) {
    this.field.font = '25px Arial';
    this.field.fillStyle = '#C9A78D';
    this.field.textAlign = alignment;
    this.field.fillText(name, x, y);
  }
  drawImage(src: string, x: number, y: number, translate?: number) {
    const img = new Image();
    img.src = src;
    img.style.zIndex = '-1';
    img.onload = () => {
      const deg = translate || 0;
      this.field.save();
      this.field.translate(this.field.width / 2, this.field.height / 2);
      this.field.rotate(deg * Math.PI / 180);
      this.field.drawImage(img, x, y);
      this.field.restore();
    };
  }
  drawHealth(who: string, width: number) {
    const health = document.createElement('div');
    health.classList.add('health');
    health.style.position = 'absolute';
    health.style.top = '50px';
    health.style.width = `${width}px`;
    health.style.height = '13px';
    health.style.background = '#BD6A00';
    switch (who) {
      case 'user':
        this.clearElement('user-health');
        health.setAttribute('id', 'user-health');
        health.style.left = '380px';
        break;
      case 'opponent':
        this.clearElement('opponent-health');
        health.setAttribute('id', 'opponent-health');
        health.style.right = '396px';
        break;
      default:
        break;
    }
    this.scene.nativeElement.append(health);
  }
  chooseMethod(event) {
    this.gameConfig.playSound('click');
    this.modal = this.modalSrv.open(this.dialog, { ariaLabelledBy: 'modal-basic-title'});
  }

  displayTask(type: string) {
    this.gameConfig.playSound('click');
    this.dataSrv.getTask(type, this.opponent.level).subscribe( (res) => {
      this.taskToSolve = res;
      this.modal.close();
      switch (type) {
        case 'drag&drop':
        _.forEach(this.taskToSolve.task, (e) => {
            const dragable = {
              data: e,
              effectAllowed: 'all',
              disable: false,
              handle: false
            };
            this.draggables.push(dragable);
          });
          this.taskModal = this.modalSrv.open(this.dadTask, { ariaLabelledBy: 'modal-basic-title' });
          break;
        case 'arithmetics':
        case 'translation':
          this.taskModal = this.modalSrv.open(this.arTask, { ariaLabelledBy: 'modal-basic-title' });
          break;
        case 'audio':
          this.taskModal = this.modalSrv.open(this.audioTask, { ariaLabelledBy: 'modal-basic-title' });
          break;
        default:
          break;
      }
    });
  }
  clearElement(elementId) {
    if (document.getElementById(elementId)) {
      document.getElementById(elementId).remove();
    }
  }
  closeBtn() {
    this.modal.close();
  }
  solutionAct($event: any, res: string) {
    $event.preventDefault();
    this.solution = '';
    this.taskToSolve.userAnswer = res;
    if (_.isEqual(Number(res), this.taskToSolve.solution) || _.includes(this.taskToSolve.solution, res)) {
      this.victory();
      this.taskToSolve.status = 'correct';
    } else {
      this.fail();
      this.taskToSolve.status = 'error';
    }
    this.user.statistic.push(this.taskToSolve);
    this.taskModal.close();
  }
  clearView(who: string) {
    setTimeout(() => {
      this.roundDis.clear();
      this.gameConfig.playSound('attack');
      this.animateWeapon(who);
    }, 2000);
  }
  victory() {
    const compFactory = this.compResolver.resolveComponentFactory(MessageComponent);
    const componentRef = this.roundDis.createComponent(compFactory);
    this.opponent.hp = this.opponent.hp - this.taskToSolve.damage;
    componentRef.instance.message = 'You are awesome!';
    componentRef.instance.status = 'correct';
    if (this.opponent.hp <= 0) {
      componentRef.instance.message = 'You win!';
      setTimeout(() => {
        this.roundDis.clear();
        this.gameConfig.updateOpponent(this.opponent);
      }, 2000);
      this.taskModal.close();
      return;
    } else {
      this.gameConfig.updateOpponent(this.opponent);
      this.clearView('user');
    }
  }
  fail() {
    const compFactory = this.compResolver.resolveComponentFactory(MessageComponent);
    const componentRef = this.roundDis.createComponent(compFactory);
    this.user.hp = this.user.hp - this.taskToSolve.damage;
    this.gameConfig.updateUser(this.user);
    componentRef.instance.message = 'Opps...';
    componentRef.instance.status = 'error';
    this.clearView('opp');
  }
  animateWeapon(who: string) {
    const elementId = `${who}-left-weapon`;
    const element = document.getElementById(elementId);
    const savedTrasnform = element.style.transform;
    const direction = who === 'user' ? 'left' : 'right';
    const rotate = who === 'user' ? '810deg' : '-810deg';
    const savedPos = element.style[direction];
    element.style[direction] = '1000px';
    element.style.transform = `rotate(${rotate})`;
    setTimeout(() => {
      element.style.display = 'none';
    }, 1000);
    setTimeout(() => {
      element.style.transform = savedTrasnform;
      element.style[direction] = savedPos;
      element.style.display = 'block';
    }, 1500);
  }
  onDrop(event: DndDropEvent) {
    this.dndSolution.push(event.data);
    let removed = false;
    _.remove(this.draggables, (letter, index) => {
      const result = _.isEqual(letter.data, event.data) && !removed;
      if (result) {
        removed = true;
      }
      return result;
    });
    if (this.dndSolution.length === this.taskToSolve.solution.length) {
      if (_.isEqual(this.dndSolution, this.taskToSolve.solution)) {
        this.victory();
      } else {
        this.fail();
      }
      this.dndSolution = [];
      this.taskModal.close();
    }
  }
  pronouceWord() {
    const synth = speechSynthesis;
    const voices = synth.getVoices();
    const utter = new SpeechSynthesisUtterance(this.taskToSolve.task);
    utter.voice = _.find(voices, (e) => _.isEqual(e.lang, 'en-US'));
    synth.speak(utter);
  }
}
