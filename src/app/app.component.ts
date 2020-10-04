import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {Component, OnInit} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
 
  @ViewChild(MatDrawer, {}) public drawer: MatDrawer; 
  
  constructor() {}

  ngOnInit() {
   
  }

  ngAfterViewInit() {
    this.drawer.toggle();
  }

}
