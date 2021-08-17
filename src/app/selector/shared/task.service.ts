import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators'
import { observable, Observable } from "rxjs";
import * as moment from "moment";


export interface Task {
  id?: string,
  title: string,
  date?: string,
  tasks: boolean
}

interface CreateResponse {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  static url = 'https://angular-calendar-1-default-rtdb.firebaseio.com/';


  constructor(private http: HttpClient) {
  }

  load(date: moment.Moment) {
    return this.http.get<Task[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if (!tasks) {
          return []
        }
        return Object.keys(tasks).map((key: any) => ({ ...tasks[key], id: key }))
      }))
  }

  haveMark() {
    return this.http.get<Task[]>(`${TaskService.url}.json`)
      .pipe(map(tasks => {
        return Object.keys(tasks)
      }))
  }

  create(task: Task): Observable<Task> {
    return this.http.post<CreateResponse>(`${TaskService.url}/${task.date}.json`, task)
      .pipe(map(res => {
        return { ...task, id: res.name }
      }))
  }

  remove(task: Task): Observable<void> {
    return this.http.delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`)
  }
}
