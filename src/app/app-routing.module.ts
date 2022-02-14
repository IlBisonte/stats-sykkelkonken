import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent }      from './core/login/login.component';
import { RegisterUserComponent } from './core/login/register-user/register-user.component';
import { AdminCalculationComponent }      from './admin/admin-calculation/admin-calculation.component';
import { AdminCompTeamsComponent }      from './admin/admin-comp-teams/admin-comp-teams.component';
import { AdminClComponent }      from './admin/admin-cl/admin-cl.component';
import { AdminLotteryComponent }      from './admin/admin-lottery/admin-lottery.component';
import { AdminYouthComponent }      from './admin/admin-youth/admin-youth.component';
import { AdminImportFromCqComponent }      from './admin/admin-import-from-cq/admin-import-from-cq.component';
import { ResultsComponent }      from './results/results.component';
import { ResultBikeraceComponent }      from './results/result-bikerace/result-bikerace.component';
import { ResultBikeraceClComponent } from './results/result-bikerace-cl/result-bikerace-cl.component';
import { ResultMonumentsComponent }      from './results/result-monuments/result-monuments.component';
import { ResultYouthComponent }      from './results/result-youth/result-youth.component';
import { StatsComponent }      from './stats/stats.component';
import { StatsBikeriderscoretotalComponent }      from './stats/stats-bikeriderscoretotal/stats-bikeriderscoretotal.component';
import { StatsCompetitionteamAlltimeComponent }      from './stats_competition/stats-competitionteam-alltime/stats-competitionteam-alltime.component';
import { StatsChampionsleagueAlltimeComponent }      from './stats_competition/stats-championsleague-alltime/stats-championsleague-alltime.component';
import { StatsResultPerBikeraceComponent }      from './stats_competition/stats-result-per-bikerace/stats-result-per-bikerace.component';
import { StatsBikeraceVictoriesComponent }      from './stats_competition/stats-bikerace-victories/stats-bikerace-victories.component';
import { StatsCompetitionteamSankeyComponent }      from './stats_competition/stats-competitionteam-sankey/stats-competitionteam-sankey.component';
import { HallOfFameComponent }      from './hall-of-fame/hall-of-fame.component';
import { ResultClComponent } from './results/result-cl/result-cl.component';
import { ResultLotteryComponent } from './results/result-lottery/result-lottery.component';
import { ResultBikeraceRidersComponent } from './results/result-bikerace-riders/result-bikerace-riders.component';
import { AdminSeasonplacementComponent } from './admin/admin-seasonplacement/admin-seasonplacement.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent, 
  },
  {
    path: 'register',
    component: RegisterUserComponent, 
  },
  {
    path: 'admin/admin-calculation',
    component: AdminCalculationComponent, 
    canActivate: [AuthGuardService],
    data: { 
      expectedRole: 'admin'
    } 
  },
  {
    path: 'admin/admin-comp-teams',
    component: AdminCompTeamsComponent, 
    canActivate: [AuthGuardService],
    data: { 
      expectedRole: 'admin'
    } 
  },
  {
    path: 'admin/app-admin-cl',
    component: AdminClComponent, 
    canActivate: [AuthGuardService],
    data: { 
      expectedRole: 'admin'
    } 
  },
  {
    path: 'admin/app-admin-lottery',
    component: AdminLotteryComponent, 
    canActivate: [AuthGuardService],
    data: { 
      expectedRole: 'admin'
    } 
  },
  {
    path: 'admin/app-admin-youth',
    component: AdminYouthComponent, 
    canActivate: [AuthGuardService],
    data: { 
      expectedRole: 'admin'
    } 
  },
  {
    path: 'admin/admin-import-from-cq',
    component: AdminImportFromCqComponent, 
    canActivate: [AuthGuardService],
    data: { 
      expectedRole: 'admin'
    } 
  },
  {
    path: 'admin/admin-seasonplacement',
    component: AdminSeasonplacementComponent, 
    canActivate: [AuthGuardService],
    data: { 
      expectedRole: 'admin'
    } 
  },
  {
    path: 'results',
    component: ResultsComponent,
  },
  {
    path: 'results/result-cl',
    component: ResultClComponent, 
  },
  {
    path: 'results/result-lottery',
    component: ResultLotteryComponent, 
  },
  {
    path: 'results/result-bikerace',
    component: ResultBikeraceComponent, 
  },
  {
    path: 'results/result-bikerace-cl',
    component: ResultBikeraceClComponent, 
  },
  {
    path: 'results/monuments',
    component: ResultMonumentsComponent, 
  },
  {
    path: 'results/youth',
    component: ResultYouthComponent, 
  },
  {
    path: 'results/result-bikerace-riders',
    component: ResultBikeraceRidersComponent, 
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'stats/stats-bikeriderscoretotal',
    component: StatsBikeriderscoretotalComponent
  },
  {
    path: 'stats_competition/stats-competitionteam-alltime',
    component: StatsCompetitionteamAlltimeComponent
  },
  {
    path: 'stats_competition/stats-championsleague-alltime',
    component: StatsChampionsleagueAlltimeComponent
  },
  {
    path: 'stats_competition/stats-result-per-bikerace',
    component: StatsResultPerBikeraceComponent
  },
  {
    path: 'stats_competition/stats-bikerace-victories',
    component: StatsBikeraceVictoriesComponent
  },
  {
    path: 'stats_competition/stats-competitionteam-sankey',
    component: StatsCompetitionteamSankeyComponent
  },
  {
    path: 'hall-of-fame',
    component: HallOfFameComponent
  },
  {
    path: '',
    redirectTo: 'results',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
