import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImportantDayService } from '../../../../core/services/important-day.service';
import { Observable, Subject } from 'rxjs';
import { ImportantDayInterface } from '../../../../core/models';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit, OnDestroy {

  date = new FormControl(new Date(), Validators.required);
  importantDays: ImportantDayInterface[];

  private destroy$ = new Subject();

  ngOnInit(): void {
    this.getImplementDays(this.date.value.toISOString());

    this.date.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Date) => this.getImplementDays(value.toISOString()));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addEvent(): void {
    const date = new Date(this.date.value);
    date.setHours(0, 0, 0, 0);
    this.router.navigate(['/day', 'add', date.toISOString()]);
  }

  edit(item: ImportantDayInterface): void {
    this.router.navigate(['/day', 'edit', item.id]);
  }

  delete(item: ImportantDayInterface, index: number): void {
    this.importantDayService.delete(item.id)
      .pipe(first())
      .subscribe((res) => this.importantDays.splice(index, 1));
  }

  private getImplementDays(date: string): void {
    this.importantDayService.getAll(date)
      .pipe(first())
      .subscribe((res: ImportantDayInterface[]) => this.importantDays = res);
  }

  constructor(
    private importantDayService: ImportantDayService,
    private router: Router
  ) {
  }
}
