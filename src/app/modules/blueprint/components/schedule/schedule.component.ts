import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  public items = [1, 2, 3, 4, 5];
  constructor() {}

  ngOnInit() {}
  doReorder(ev: any) {
    console.log('Before complete', this.items);

    this.items = ev.detail.complete(this.items);

    console.log('After complete', this.items);
  }
}
