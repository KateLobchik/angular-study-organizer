import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { DateService } from '../selector/shared/data.service';
import { Task, TaskService } from '../selector/shared/task.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup | null = null;
  tasks: Task[] = []


  constructor(public dateService: DateService,
    public taskServce: TaskService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.taskServce.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const { title } = this.form?.value;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
      tasks: true
    }

    this.taskServce.create(task).subscribe(task => {
      this.tasks.push(task);
      this.form?.reset()
    }, err => { console.error(err) });
  }

  remove(task: Task) {
    this.taskServce.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }, err => { console.error(err) })
  }

}
