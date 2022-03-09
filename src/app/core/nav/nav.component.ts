import { Component, OnInit, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { Router, Event, NavigationEnd, UrlTree, UrlSegment, UrlSegmentGroup, PRIMARY_OUTLET } from '@angular/router';
import { LoginService } from '../login/login.service';
import { User } from '../login/user';
import { NavService } from '../nav/nav.service';
import * as moment from 'moment';

export class NavMenu {
  moduleName: string;
  functionName: string;
  module: string;
  function: string;
  disabled?: boolean;
  items?: NavMenu[];
  url?: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser: User;
  showSubmenuModes: any;
  showFirstSubmenuModes: any;
  showNavigationInfo: boolean;
  version: string = "";
  isValid: boolean = false;
  @Input() sidebarwidth = 0;
  @Output() sidebarwidthChanged = new EventEmitter<number>();
  selectedMenuText = "Sykkelkonken";
  popupVisible = false;
  
  mainMenuItems: Array<NavMenu>;
  
  userMenuItems: NavMenu[] = [{
    moduleName: '',
    functionName: '',
    module: '',
    function: '',
    items: [{
      moduleName: '',
      functionName: 'Logg ut',
      module: '/logout',
      function: ''
    }]
  }];

  navigationInfoModule: string;
  navigationInfoFunction: string;
  years: number[];
  selectedYear: number = new Date().getFullYear();

  
  navigation: any;
  isOpened: Boolean = false;
  buttonOptions: any;

  constructor(public router: Router, private zone: NgZone, private loginService: LoginService, private navService: NavService) {
    debugger;
    this.showSubmenuModes = [{
      name: "onHover",
      delay: { show: 0, hide: 500 }
    }, {
      name: "onClick",
      delay: { show: 0, hide: 300 }
    }];
    this.showFirstSubmenuModes = this.showSubmenuModes[0];
    this.showNavigationInfo = true;
    debugger;
    this.years = [];
    for (let i = 2019; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }    
    this.selectedYear = this.navService.selectedYear;
    if (this.selectedYear === null || this.selectedYear === undefined || this.selectedYear === 0) {
      this.selectedYear = new Date().getFullYear();
    }

    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd && this.isValid) {
        if (!this.userHasAccess()) {
          this.navigationInfoModule = this.navigationInfoFunction = '';
          this.router.navigate(['/results']);
          return;
        }

        this.setNavigationInfo();
      }
    });

    this.buttonOptions = {
        icon: "menu",
        onClick: () => {
            this.isOpened = !this.isOpened;
        }
    };
    this.navigation = [
        { id: 1, text: "Inbox", icon: "message", filePath: "results" },
        { id: 2, text: "Sent Mail", icon: "check", filePath: "results/result-cl" },
        { id: 3, text: "Trash", icon: "trash", filePath: "/results/result-lottery" },
        { id: 4, text: "Spam", icon: "mention", filePath: "/results/monuments" }
    ];
   }
   
   openNav(e) {
    //  if (e.target.className.indexOf("dx-context-menu-container-border") > -1) {
    //    this.sidebarwidth = 250;
    //  }
    //  else if (e.target.tagName.indexOf("SPAN") > -1 || e.target.tagName.indexOf("SPAN") > -1) {
    //   this.sidebarwidth = this.sidebarwidth == 0 ? 250 : 0;
    //  }
    //  else {
    //   //  this.sidebarwidth = 0;
    //  }
   }

  loadView(e) {
    this.router.navigate([e.addedItems[0].filePath])
  }

  ngOnInit() {
    debugger;
  }
  itemClick(data) {
    let item = data.itemData;
    if (item.module) {
      debugger;
      this.sidebarwidthChanged.emit(0);
      this.selectedMenuText = item.moduleName;
      if (item.url !== null && item.url !== undefined) {
        //this.showNavigationInfo = false;
        if (item.function) {
          this.zone.run(() => this.router.navigate([item.module, item.function], { queryParams: { externalurl: item.url } }));
        } else {
          this.zone.run(() => this.router.navigate([item.module], { queryParams: { externalurl: item.url } }));
        }
      }
      else {
        this.showNavigationInfo = true;
        this.navigationInfoModule = item.moduleName + ' - ';
        this.navigationInfoFunction = item.functionName;
        if (item.function) {
          this.zone.run(() => this.router.navigate([item.module, item.function]));
        } else {
          this.zone.run(() => this.router.navigate([item.module]));
        }
      }
    }
  }

  userItemClick(data) {
    debugger;
    let item = data.itemData;

    if (item.module == '/logout') {
      this.loginService.logout();
      this.zone.run(() => this.router.navigate(['/results']));
      this.initNav(true);
    }
  }

  initNav(valid: boolean) {
    debugger;
    let year = moment().year();
    // this.version = this.configService.version.directVersion;
    this.isValid = valid;
    this.currentUser = this.loginService.currentUserValue;
    this.setUserMenu();
    //this.setNavigationInfo();
    this.mainMenuItems = new Array<NavMenu>();
    
    if (valid) {   
      let menu = new NavMenu();
      if (this.currentUser.IsAdmin) {
        menu.moduleName = "Admin";
        menu.items = new Array<NavMenu>();
        let itemAdmin = new NavMenu();
        itemAdmin.moduleName = "Utregning";
        itemAdmin.module = "/admin/admin-calculation";
        menu.items.push(itemAdmin);
        itemAdmin = new NavMenu();
        itemAdmin.moduleName = "Konkurranselag";
        itemAdmin.module = "/admin/admin-comp-teams";
        menu.items.push(itemAdmin);
        itemAdmin = new NavMenu();
        itemAdmin.moduleName = "Lag Champions League";
        itemAdmin.module = "/admin/app-admin-cl";
        menu.items.push(itemAdmin);
        itemAdmin = new NavMenu();
        itemAdmin.moduleName = "Lag Loddkonk";
        itemAdmin.module = "/admin/app-admin-lottery";
        menu.items.push(itemAdmin);
        itemAdmin = new NavMenu();
        itemAdmin.moduleName = "Lag Ungdomskonk";
        itemAdmin.module = "/admin/app-admin-youth";
        menu.items.push(itemAdmin);
        itemAdmin = new NavMenu();
        itemAdmin.moduleName = "Importer Grunndata";
        itemAdmin.module = "/admin/admin-import-from-cq";
        menu.items.push(itemAdmin);
        itemAdmin = new NavMenu();
        itemAdmin.moduleName = "Admin Sesongplassering";
        itemAdmin.module = "/admin/admin-seasonplacement";
        menu.items.push(itemAdmin);
        this.mainMenuItems.push(menu);
      }

      menu = new NavMenu();
      menu.moduleName = "Resultater";
      menu.items = new Array<NavMenu>();
      let itemCompetitionResults = new NavMenu();
      itemCompetitionResults.moduleName = "Sykkelkonken";
      itemCompetitionResults.module = "/results";
      menu.items.push(itemCompetitionResults);
      let itemCLResults = new NavMenu();
      itemCLResults.moduleName = "CL";
      itemCLResults.module = "/results/result-cl";
      menu.items.push(itemCLResults);
      let itemLotteryResults = new NavMenu();
      if (this.selectedYear == 2020) {
        itemLotteryResults.moduleName = "Loddkonk";
        itemLotteryResults.module = "/results/result-lottery";
        menu.items.push(itemLotteryResults);
      }
      let itemMonuments = new NavMenu();
      itemMonuments.moduleName = "Monumentene";
      itemMonuments.module = "/results/monuments";
      menu.items.push(itemMonuments);
      let itemYouth = new NavMenu();
      itemYouth.moduleName = "Ungdomskonk";
      itemYouth.module = "/results/youth";
      menu.items.push(itemYouth);
      let itemBikeRaceResults = new NavMenu();
      itemBikeRaceResults.moduleName = "Per Sykkelritt";
      itemBikeRaceResults.module = "/results/result-bikerace";
      menu.items.push(itemBikeRaceResults);
      let itemBikeRaceCLResults = new NavMenu();
      itemBikeRaceCLResults.moduleName = "Per Sykkelritt CL";
      itemBikeRaceCLResults.module = "/results/result-bikerace-cl";
      menu.items.push(itemBikeRaceCLResults);
      let itemBikeRaceRiders = new NavMenu();
      itemBikeRaceRiders.moduleName = "Per Sykkelritt Ryttere";
      itemBikeRaceRiders.module = "/results/result-bikerace-riders";
      menu.items.push(itemBikeRaceRiders);
      this.mainMenuItems.push(menu);

      menu = new NavMenu();
      menu.moduleName = "Ryttertatistikk";
      menu.items = new Array<NavMenu>();
      let itemBikeRiderStats = new NavMenu();
      itemBikeRiderStats.moduleName = "Rytterstatistikk valgt år";
      itemBikeRiderStats.module = "/stats";
      menu.items.push(itemBikeRiderStats);
      itemBikeRiderStats = new NavMenu();
      itemBikeRiderStats.moduleName = "Totalscore ryttere 2019-" + year;
      itemBikeRiderStats.module = "/stats/stats-bikeriderscoretotal";
      menu.items.push(itemBikeRiderStats);
      this.mainMenuItems.push(menu);

      debugger;
      menu = new NavMenu();
      menu.moduleName = "Statistikk Sykkelkonken";
      menu.items = new Array<NavMenu>();
      let itemCompetitionStats = new NavMenu();
      itemCompetitionStats.moduleName = "Maratontabell 2019-" + year;
      itemCompetitionStats.module = "/stats_competition/stats-competitionteam-alltime";
      menu.items.push(itemCompetitionStats);
      itemCompetitionStats = new NavMenu();
      itemCompetitionStats.moduleName = "Maratontabell CL 2019-" + year;
      itemCompetitionStats.module = "/stats_competition/stats-championsleague-alltime";
      menu.items.push(itemCompetitionStats);
      itemCompetitionStats = new NavMenu();
      itemCompetitionStats.moduleName = "Sesongplassering";
      itemCompetitionStats.module = "/stats_competition/stats-result-per-bikerace";
      menu.items.push(itemCompetitionStats);
      itemCompetitionStats = new NavMenu();
      itemCompetitionStats.moduleName = "Antall pallplasser";
      itemCompetitionStats.module = "/stats_competition/stats-bikerace-victories";
      menu.items.push(itemCompetitionStats);
      itemCompetitionStats = new NavMenu();
      itemCompetitionStats.moduleName = "Poengfordeling";
      itemCompetitionStats.module = "/stats_competition/stats-competitionteam-sankey";
      menu.items.push(itemCompetitionStats);
      this.mainMenuItems.push(menu);

      menu = new NavMenu();
      menu.moduleName = "Hall Of Fame";
      menu.module = "/hall-of-fame";
      this.mainMenuItems.push(menu);
    }
  }

  setUserMenu() {
    if (this.currentUser != null) {
      this.userMenuItems = [{
        moduleName: '',
        functionName: this.currentUser.UserName,
        module: '',
        function: '',
        items: [{
          moduleName: '',
          functionName: 'Logg ut',
          module: '/logout',
          function: ''
        }]
      }];
    } else {
      this.userMenuItems = [];
    }
  }

  userHasAccess(): boolean {
    // const tree: UrlTree = this.router.parseUrl(this.router.url);
    // const group: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    // const segments: UrlSegment[] = group.segments;

    // if (segments.length === 2) {
    //   for (let mf of this.userService.moduleFunctions) {
    //     let id = mf.ModuleFunctionId;
    //     let path = segments[1].path;

    //     if (id !== undefined && this.getNavigationFunction(id.toString()) === path)
    //       return true;
    //   }
    // }
    // else if (segments.length === 1) {
    //   for (let mf of this.userService.moduleFunctions) {
    //     let id1 = mf.ModuleId;
    //     let id2 = mf.ModuleFunctionId;
    //     let path = '/' + segments[0].path;
    //     if (id1 !== undefined && id2 !== undefined && this.getNavigationModule(id1.toString()) === path && this.getNavigationFunction(id2.toString()) === '')
    //       return true;
    //   }
    // }

    return true;
  }

  setNavigationInfo() {
    // const tree: UrlTree = this.router.parseUrl(this.router.url);
    // const group: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    // const segments: UrlSegment[] = group.segments;

    // this.navigationInfoModule = '';
    // this.navigationInfoFunction = '';
    // if (segments.length === 2) {
    //   for (let mf of this.userService.moduleFunctions) {
    //     let id = mf.ModuleFunctionId;
    //     let path = segments[1].path;
        
    //     if (id !== undefined && this.getNavigationFunction(id.toString()) === path) {
    //       this.showNavigationInfo = true;
    //       this.navigationInfoModule = mf.ModuleName + ' - ';
    //       this.navigationInfoFunction = mf.Name;          
    //     }
    //   }
    // }
    // else if (segments.length === 1) {      
    //   for (let mf of this.userService.moduleFunctions) {
    //     let id1 = mf.ModuleId;
    //     let id2 = mf.ModuleFunctionId;
    //     let path = '/' + segments[0].path;
    //     if (id1 !== undefined && id2 !== undefined && this.getNavigationModule(id1.toString()) === path && this.getNavigationFunction(id2.toString()) === '') {
    //       this.showNavigationInfo = true;
    //       this.navigationInfoModule = mf.ModuleName + ' - ';
    //       this.navigationInfoFunction = mf.ModuleName;
    //       break;
    //     }        
    //   }
    // }
  }

  onLogout() {
    // this.userService.logout();
  }

  onYearChanged(e) {
    this.navService.setSelectedYear(e.value);
  }

  onLoginClicked(e) {
    this.popupVisible = true;
  }

  onLogoutClicked(e) {
    debugger;
    this.loginService.logout();
    location.reload();
  }

}
