import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.css']
})
export class HallOfFameComponent implements OnInit {

  victoryTeams = [];
  victoryTeamsCL = [];
  victoryTeamsMonuments = [];

  listRiderRecords = [];

  constructor() {
    debugger;
   }

  ngOnInit() {
    debugger;
    this.setVictoryTeams();
    this.setVictoryTeamsCL();
    this.setVictoryTeamsMonuments();

    this.setRiderRecords();
  }

  setVictoryTeams() {
    this.victoryTeams.push({
      TeamName: "OleK",
      Year: 2011,
      Points: 1388,
    });
    this.victoryTeams.push({
      TeamName: "Tuva",
      Year: 2012,
      Points: 1476,
    });
    this.victoryTeams.push({
      TeamName: "Rufs 2, Kristian",
      Year: 2013,
      Points: 1258,
    });
    this.victoryTeams.push({
      TeamName: "Kristian",
      Year: 2014,
      Points: 1500,
    });
    this.victoryTeams.push({
      TeamName: "KjellO 2",
      Year: 2015,
      Points: 1508,
    });
    this.victoryTeams.push({
      TeamName: "Raul",
      Year: 2016,
      Points: 1489,
    });
    this.victoryTeams.push({
      TeamName: "JayJay, Ballack",
      Year: 2017,
      Points: 1535,
    });
    this.victoryTeams.push({
      TeamName: "Alexao, IlBisonte",
      Year: 2018,
      Points: 1673,
    });
    this.victoryTeams.push({
      TeamName: "KjellO 2",
      Year: 2019,
      Points: 1301,
    });
    this.victoryTeams.push({
      TeamName: "Totti",
      Year: 2020,
      Points: 1178,
    });
  }

  setVictoryTeamsCL() {
    this.victoryTeamsCL.push({
      TeamName: "OleK",
      Year: 2011,
      Points: 1354,
    });
    this.victoryTeamsCL.push({
      TeamName: "Lars",
      Year: 2012,
      Points: "?",
    });
    this.victoryTeamsCL.push({
      TeamName: "Raul",
      Year: 2013,
      Points: 1065,
    });
    this.victoryTeamsCL.push({
      TeamName: "Selma",
      Year: 2014,
      Points: 1199,
    });
    this.victoryTeamsCL.push({
      TeamName: "Andreas",
      Year: 2015,
      Points: 1017,
    });
    this.victoryTeamsCL.push({
      TeamName: "Ballack",
      Year: 2016,
      Points: 992,
    });
    this.victoryTeamsCL.push({
      TeamName: "Ballack",
      Year: 2017,
      Points: 1152,
    });
    this.victoryTeamsCL.push({
      TeamName: "Kristian 2",
      Year: 2018,
      Points: 1028,
    });
    this.victoryTeamsCL.push({
      TeamName: "IlBisonte",
      Year: 2019,
      Points: 1314,
    });
    this.victoryTeamsCL.push({
      TeamName: "IlBisonte",
      Year: 2020,
      Points: 1038,
    });
  }

  setVictoryTeamsMonuments() {
    this.victoryTeamsMonuments.push({
      TeamName: "Knutby",
      Year: 2014,
      Points: 257,
    });
    this.victoryTeamsMonuments.push({
      TeamName: "Boringarsenal",
      Year: 2015,
      Points: 155,
    });
    this.victoryTeamsMonuments.push({
      TeamName: "Hay 1",
      Year: 2016,
      Points: 360,
    });
    this.victoryTeamsMonuments.push({
      TeamName: "Clasico",
      Year: 2017,
      Points: 515,
    });
    this.victoryTeamsMonuments.push({
      TeamName: "Clasico",
      Year: 2018,
      Points: 425,
    });
    this.victoryTeamsMonuments.push({
      TeamName: "Cantona",
      Year: 2019,
      Points: 410,
    });
    this.victoryTeamsMonuments.push({
      TeamName: "Ballack",
      Year: 2020,
      Points: 477,
    });
  }

  setRiderRecords() {
    this.listRiderRecords.push({
      RecordName: "Høyeste poengsum sesong:",
      RiderNameAndYear: "ROGLIC Primoz - 2019",
      Points: 397,
    });
    this.listRiderRecords.push({
      RecordName: "Høyeste index sesong:",
      RiderNameAndYear: "BETTIOL Alberto - 2019",
      Points: "19.6",
    });
    this.listRiderRecords.push({
      RecordName: "Høyeste poengsum enkeltritt:",
      RiderNameAndYear: "POGACAR Tadej - TdF 2020",
      Points: "204",
    });
    this.listRiderRecords.push({
      RecordName: "Høyeste poengsum sesong 2019-2020:",
      RiderNameAndYear: "ROGLIC Primoz",
      Points: "773",
    });
    this.listRiderRecords.push({
      RecordName: "Mest valgte rytter:",
      RiderNameAndYear: "DUMOULIN Tom og FROOME Chris - 2020",
      Points: "84%",
    });
  }

}
