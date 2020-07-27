import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  startTime = '09:00';
  endTime = '18:00';
  restTime = '01:00';

  constructor() { }

  ngOnInit(): void {
  }
}
