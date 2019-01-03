import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private game: GameService) {}

  private nicknameSet = false;
  private redirectUrl: string;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.redirectUrl = state.url;
    return this.checkNick();
  }
  checkNick() {
    if (this.nicknameSet) {
      return this.nicknameSet;
    } else {
      this.game._user.subscribe( res => {
        console.log(res);
        this.nicknameSet = res.nickname !== undefined;
        this.router.navigateByUrl(this.redirectUrl);
        if (!this.nicknameSet) {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}
