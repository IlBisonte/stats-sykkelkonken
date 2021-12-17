import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Router } from "@angular/router";
import { ConfigService } from './core/config.service';

import { NavComponent } from './core/nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
  providers: []
})

export class AppComponent implements OnInit, OnDestroy {
  navVisible: boolean = false;

  navigation: any;
  isOpened: Boolean = false;
  buttonOptions: any;
  sidebarwidth: number = 0;

  @ViewChild(NavComponent, {static:true}) navComponent: NavComponent;

  constructor(private router: Router, private configService: ConfigService) { 
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

  loadView(e) {
    this.router.navigate([e.addedItems[0].filePath])
  }

  ngOnDestroy(): void {

  }

  ngOnInit() {
    debugger;
      this.navComponent.initNav(true);
      this.navVisible = true;
  }

  onActivate(component) {
    debugger;
    if (component.router && component.router.url === '/results') {
      this.navComponent.initNav(false);
      this.navVisible = false;
    }
    else  {
      this.navComponent.initNav(true);
      this.navVisible = true;
    }
  }

  openNav(e) {
    if (e.target.className.indexOf("dx-context-menu-container-border") > -1) {
      this.sidebarwidth = 250;
    }
    else if (e.target.className.indexOf("dx-menu-items-container") > -1) {
      debugger;
      this.sidebarwidth = 250;
    }
    else if ((e.target.tagName.indexOf("SPAN") > -1 || e.target.tagName.indexOf("SPAN") > -1) && (e.target.className.indexOf("menubtn") > -1 || e.target.className.indexOf("selectedMenu") > -1)) {
      debugger;
      this.sidebarwidth = this.sidebarwidth == 0 ? 250 : 0;
    }
    else {
      debugger;
      this.sidebarwidth = 0;
    }
  }

  onSideBarWidthChanged(width: number) {
    debugger;
    this.sidebarwidth = width;
  }

  title = 'stats-sykkelkonken';
}
