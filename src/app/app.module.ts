import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ConfigService } from './core/config.service';
import { AuthService } from './auth.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { JwtInterceptor } from './auth-interceptor';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminCompTeamsComponent } from './admin/admin-comp-teams/admin-comp-teams.component';
import { AdminCalculationComponent } from './admin/admin-calculation/admin-calculation.component';
import { AdminImportFromCqComponent } from './admin/admin-import-from-cq/admin-import-from-cq.component';
import { ResultsComponent } from './results/results.component';
import { StatsComponent } from './stats/stats.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';
// import { LoginComponent } from './login/login.component';

import { DxButtonModule, DxFileUploaderModule, DxDataGridModule, DxTemplateModule, DxBoxModule, DxSelectBoxModule, DxTabsModule, 
  DxColorBoxModule, DxDateBoxModule, DxFormModule, DxTextBoxModule, DxLoadPanelModule, DxChartModule, DxTagBoxModule, DxNumberBoxModule,
  DxSankeyModule, DxListModule, DxDrawerModule, DxToolbarModule, DxSwitchModule } from 'devextreme-angular';
import { ResultBikeraceComponent } from './results/result-bikerace/result-bikerace.component';
import { ResultMonumentsComponent } from './results/result-monuments/result-monuments.component';
import { AdminClComponent } from './admin/admin-cl/admin-cl.component';
import { ResultClComponent } from './results/result-cl/result-cl.component';
import { StatsBikeriderresultsComponent } from './stats/stats-bikeriderresults/stats-bikeriderresults/stats-bikeriderresults.component';
import { LoginService } from './core/login/login.service';
import { ResultLotteryComponent } from './results/result-lottery/result-lottery.component';
import { AdminLotteryComponent } from './admin/admin-lottery/admin-lottery.component';
import { ResultBikeraceClComponent } from './results/result-bikerace-cl/result-bikerace-cl.component';
import { StatsCompetitionteamAlltimeComponent } from './stats_competition/stats-competitionteam-alltime/stats-competitionteam-alltime.component';
import { StatsBikeriderscoretotalComponent } from './stats/stats-bikeriderscoretotal/stats-bikeriderscoretotal.component';
import { StatsChampionsleagueAlltimeComponent } from './stats_competition/stats-championsleague-alltime/stats-championsleague-alltime.component';
import { StatsResultPerBikeraceComponent } from './stats_competition/stats-result-per-bikerace/stats-result-per-bikerace.component';
import { StatsBikeraceVictoriesComponent } from './stats_competition/stats-bikerace-victories/stats-bikerace-victories.component';
import { StatsCompetitionteamSankeyComponent } from './stats_competition/stats-competitionteam-sankey/stats-competitionteam-sankey.component';
import { ResultBikeraceRidersComponent } from './results/result-bikerace-riders/result-bikerace-riders.component';
import { StatsBikeriderSankeyComponent } from './stats_competition/stats-bikerider-sankey/stats-bikerider-sankey.component';
import { StatsCompetitionteamBikeridersSankeyComponent } from './stats_competition/stats-competitionteam-bikeriders-sankey/stats-competitionteam-bikeriders-sankey.component';
import { AdminSeasonplacementComponent } from './admin/admin-seasonplacement/admin-seasonplacement.component';
import { ResultYouthComponent } from './results/result-youth/result-youth.component';
import { AdminYouthComponent } from './admin/admin-youth/admin-youth.component';
// import { RegisterUserComponent } from './login/register-user/register-user.component';

export function appInit(configService: ConfigService) {
  debugger;
  return () => configService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    AdminCompTeamsComponent,
    AdminCalculationComponent,
    ResultsComponent,
    StatsComponent,
    HallOfFameComponent,
    // LoginComponent,
    AdminImportFromCqComponent,
    ResultBikeraceComponent,
    ResultMonumentsComponent,
    AdminClComponent,
    ResultClComponent,
    StatsBikeriderresultsComponent,
    ResultLotteryComponent,
    AdminLotteryComponent,
    ResultBikeraceClComponent,
    StatsCompetitionteamAlltimeComponent,
    StatsBikeriderscoretotalComponent,
    StatsChampionsleagueAlltimeComponent,
    StatsResultPerBikeraceComponent,
    StatsBikeraceVictoriesComponent,
    StatsCompetitionteamSankeyComponent,
    ResultBikeraceRidersComponent,
    StatsBikeriderSankeyComponent,
    StatsCompetitionteamBikeridersSankeyComponent,
    AdminSeasonplacementComponent,
    ResultYouthComponent,
    AdminYouthComponent,
    // RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    DxButtonModule,
    DxFileUploaderModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBoxModule,
    DxSelectBoxModule,
    DxTabsModule,
    DxColorBoxModule,
    DxDateBoxModule,
    DxFormModule,
    DxTextBoxModule,
    DxLoadPanelModule,
    DxChartModule,
    DxTagBoxModule,
    DxNumberBoxModule,
    DxSankeyModule,
    DxListModule,
    DxDrawerModule,
    DxToolbarModule,
    DxSwitchModule,
    CoreModule.forRoot(),
  ],
  providers: [ 
    AuthService, 
    JwtHelperService, 
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [ConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
