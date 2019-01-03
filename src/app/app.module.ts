import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseSkinComponent } from './choose-skin/choose-skin.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { UserdataComponent } from './userdata/userdata.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from './game.service';
import { DisplayRoundComponent } from './display-round/display-round.component';
import { MessageComponent } from './message/message.component';
import { DndModule } from 'ngx-drag-drop';
import { RecordsTableComponent } from './records-table/records-table.component';
import { AuthGuard } from './auth.guard';
import { HowtoplayComponent } from './howtoplay/howtoplay.component';

@NgModule({
  declarations: [
    AppComponent,
    ChooseSkinComponent,
    MainMenuComponent,
    UserdataComponent,
    GameFieldComponent,
    DisplayRoundComponent,
    MessageComponent,
    RecordsTableComponent,
    HowtoplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DndModule,
    NgbModule.forRoot(),
  ],
  providers: [DataService, GameService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [DisplayRoundComponent, MessageComponent]
})
export class AppModule { }
