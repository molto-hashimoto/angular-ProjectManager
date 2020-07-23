import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  click_Daily() {
    this.router.navigate(['/attendance']);
  }
  click_Monthly() {
    this.router.navigate(['/attendance/monthly']);
  }
}
