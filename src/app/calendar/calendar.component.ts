import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { generate, Observable } from 'rxjs';
import { DateService } from '../selector/shared/data.service';
import { Task, TaskService } from '../selector/shared/task.service';

interface Day {
  value: moment.Moment,
  active: boolean,
  disabled: boolean,
  selected: boolean
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[] | null = null;
  daysWithTask: Observable<string[]> = this.taskServce.haveMark()

  constructor(private dateService: DateService,
    public taskServce: TaskService) { }

  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this));
  }


  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week').isoWeekday(1);
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');

            return {
              value, active, disabled, selected
            }
          })
      })
    }

    this.calendar = calendar;
  }

  select(day: moment.Moment) {
    this.dateService.changeDate(day);
  }
}
