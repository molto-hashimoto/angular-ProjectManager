import { Monthly } from './../../interfaces/attendance';
import { AttendanceService } from './../../services/attendance.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Your chart title',
      fontColor: 'white',
    },
    legend: {
      display: true,
      labels: {
        fontColor: 'white',
      },
    },
    scales: {xAxes: [{
      ticks: {
        fontColor: 'white',
      }
    }], yAxes: [{
      ticks: {
        fontColor: 'white',
      }
    }]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartDataSets[] = [
    { data: []}
  ];

  monthlyData: Monthly[];
  thisYear: number;
  chartData: number[];
  constructor(
    private attendanceService: AttendanceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setChartData();
  }
  setChartData() {
    this.chartData = [];
    this.monthlyData = this.attendanceService.getMothlyData();
    this.thisYear = this.monthlyData[0].year;
    this.barChartOptions.title.text = ' Total Work Time & Working Days';

    this.barChartLabels = [];
    for (let cnt = 1; cnt <= 12; cnt++) {
      this.barChartLabels.push(String(this.thisYear) + ' / ' + String(cnt));
    }

    let strChartData = this.monthlyData.map(data => data.totalTime);
    for (let element of strChartData) {
      let workTimeHourMin = element.split(':').map(Number);
      this.chartData.push(workTimeHourMin[0] + (workTimeHourMin[1] / 60 * 100 / 100));
    }
    this.barChartData[0] = {data: this.chartData, label: 'Total Work Time' };

    let totalDays = this.monthlyData.map(data => data.totalDays);
    this.barChartData[1] = {data: totalDays, label: 'Working Days'};
  }
  shift_year(shitf: number) {
    this.attendanceService.setMonthlyData(shitf);
    this.setChartData();
  }
  click_Daily() {
    this.router.navigate(['/attendance']);
  }
  click_Monthly() {
    this.router.navigate(['/attendance/monthly']);
  }
  changeDisplay(display: ChartType) {
    this.barChartType = display;
  }
}
