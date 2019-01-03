import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

const sounds = [
  {
    'src': 'assets/music/fight-5.mp3',
    'action' : 'fight'
  },
  {
    'src': 'assets/music/fight-4.mp3',
    'action' : 'fight'
  },
  {
    'src': 'assets/music/fight-3.mp3',
    'action' : 'fight'
  },
  {
    'src': 'assets/music/fight-2.mp3',
    'action' : 'fight'
  },
  {
    'src': 'assets/music/fight-1.mp3',
    'action' : 'fight'
  },
  {
    'src': 'assets/music/fight-6.mp3',
    'action' : 'fight'
  },
  {
    'src': 'assets/music/menu.mp3',
    'action' : 'menu'
  },
  {
    'src': 'assets/sounds/coin_hit4.wav',
    'action' : 'click'
  },
  {
    'src': 'assets/sounds/gong.wav',
    'action' : 'start'
  },
  {
    'src': 'assets/sounds/attack/m_pl_attack6.wav',
    'action' : 'attack'
  },
  {
    'src': 'assets/sounds/attack/m_pl_attack1.wav',
    'action' : 'attack'
  },
  {
    'src': 'assets/sounds/attack/m_pl_attack2.wav',
    'action' : 'attack'
  },
  {
    'src': 'assets/sounds/attack/m_pl_attack3.wav',
    'action' : 'attack'
  },
  {
    'src': 'assets/sounds/attack/m_pl_attack4.wav',
    'action' : 'attack'
  },
  {
    'src': 'assets/sounds/attack/m_pl_attack5.wav',
    'action' : 'attack'
  }
];
const opponent = {
  'level': 1,
  'avatar': 'assets/images/avatars/avatar-1.png',
  'nickname': '',
  'head': '',
  'body': '',
  'weapoon': '',
  'hp': 100
};
const user = {
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
const service: GameService = TestBed.get(GameService);
describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should create trackList', () => {
    service.updateSoundList(sounds);
    service._sounds.subscribe( res => {
      expect(res.length).toEqual(sounds.length);
    });
  });
  it('should play any sound', () => {
    service.updateSoundList(sounds);
    service.playSound('click').then( (data) => {
      console.log(data);
    }).catch( (e) => {
      expect(e instanceof DOMException).toBeTruthy();
    });
  });
  it('should update userInfo', () => {
    service.updateUser(user);
    user.hp = 10;
    service.updateUser(user);
    service._user.subscribe( res => {
      expect(res.nickname).toEqual('KirillTovpinets');
      expect(res.hp).toEqual(10);
    });
  });
  it('should update opponentInfo', () => {
    service.updateOpponent(opponent);
    let hp = -10;
    opponent.hp = hp;
    hp = 25;
    service.updateOpponent(opponent);
    opponent.hp = hp;
    service.updateOpponent(opponent);
    service._opponent.subscribe( res => {
      expect(res.hp).toEqual(hp);
    });
  });
});
