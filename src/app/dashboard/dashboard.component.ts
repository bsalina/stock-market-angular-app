import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 display= "none";
 formValue !: FormGroup;
 

  api: any;
  err: Error | undefined;
  constructor() { }
  ngOnInit(): void {
  }
  

  }




