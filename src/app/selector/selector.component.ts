import { Component } from '@angular/core';
import { DateService } from './shared/data.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  constructor(public dateService: DateService) { }

  go(step: number) {
    this.dateService.changeMonth(step);
  }
}
