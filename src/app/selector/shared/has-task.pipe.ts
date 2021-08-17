import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Pipe({
  name: 'hasTask'
})
export class HasTaskPipe implements PipeTransform {

  transform(value: string, dates: Observable<string[]>): Observable<boolean> {
    return dates.pipe(map(daysWithTask => {
      return daysWithTask.includes(value)
    }));
  }

}
