import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private soundList = [];
  private currentPlayer: any;
  _user: BehaviorSubject<any> = new BehaviorSubject<any>({});
  _opponent: BehaviorSubject<any> = new BehaviorSubject<any>({});
  _sounds: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  _player: BehaviorSubject<any> = new BehaviorSubject<any>({});
  _heads: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  _bodies: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  _weapons: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  constructor() {
    this._sounds.subscribe( res => {
      this.soundList = res;
    });

    this._player.subscribe( res => {
      if (this.currentPlayer instanceof Audio) {
        this.currentPlayer.pause();
      }
      this.currentPlayer = res;
    });
  }
  updateOpponent(opponent: any) { this._opponent.next(opponent); }
  updateUser(user: any) { this._user.next(user); }

  updatePlayer(track) {
    track.loop = true;
    track.play();
    this._player.next(track);
  }

  updateSoundList(list) { this._sounds.next(list); }
  setHeads(list: any[]) { this._heads.next(list); }
  setBodies(list: any[]) { this._bodies.next(list); }
  setWeapons(list: any[]) { this._weapons.next(list); }

  playSound(action: string) {
    const audio = new Audio();
    let sound = _.filter(this.soundList, (e) => _.isEqual(e.action, action));
    sound = _.shuffle(sound);
    audio.src = sound[0].src;
    audio.load();
    if (_.isEqual(action, 'fight')) {
      this.updatePlayer(audio);
    } else {
      return audio.play();
    }
  }
}
