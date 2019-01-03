import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseSkinComponent } from './choose-skin/choose-skin.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { UserdataComponent } from './userdata/userdata.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { RecordsTableComponent } from './records-table/records-table.component';
import { AuthGuard } from './auth.guard';
import { HowtoplayComponent } from './howtoplay/howtoplay.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard',
    component: MainMenuComponent
  },
  {
    path: 'userdata',
    component: UserdataComponent,
  },
  {
    path: 'chooseskin',
    component: ChooseSkinComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'start',
    component: GameFieldComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'records',
    component: RecordsTableComponent,
  },
  {
    path: 'howtoplay',
    component: HowtoplayComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
