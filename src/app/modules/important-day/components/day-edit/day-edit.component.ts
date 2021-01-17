import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ImportantDayEnum } from '../../../../core/enums';
import { ActivatedRoute } from '@angular/router';
import { ImportantDayService } from '../../../../core/services/important-day.service';
import { first } from 'rxjs/operators';
import { ImportantDayInterface } from '../../../../core/models';
import { MatSnackBar } from '@angular/material/snack-bar';

interface RouterParams {
  mode: string;
  id: string;
}

@Component({
  selector: 'app-day-edit',
  templateUrl: './day-edit.component.html',
  styleUrls: ['./day-edit.component.scss']
})
export class DayEditComponent implements OnInit {

  form: FormGroup;
  private routeParams: RouterParams;
  private importantDay: ImportantDayInterface;

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.routeParams = this.activatedRoute.snapshot.params as RouterParams;

    if (this.routeParams.mode === 'edit') {
      return this.getImportantDay();
    }

    this.initForm(ImportantDayEnum.HOLIDAY);
  }

  onSubmit(): void {
    if (this.routeParams.mode === 'edit' && this.importantDay) {
      this.importantDayService.update(this.form.value)
        .pipe(first())
        .subscribe(() => this.snackBar.open('Данные успешно обновлены'));
    } else {
      this.importantDayService.add(this.form.value)
        .pipe(first())
        .subscribe(() => this.snackBar.open('Данные успешно сохранены'));
    }
    console.log(this.form.value);
  }

  initForm(type: string): void {
    const form: any = {
      id: new Date().getTime().toString(),
      title: [this.form ? this.form.get('title').value : '', Validators.required],
      type: [type, Validators.required],
      date: this.routeParams.mode === 'add' ? this.routeParams.id : this.importantDay.date,
    };

    if (type === ImportantDayEnum.EVENT) {
      form.address = ['', Validators.required];
      form.time = ['', Validators.required];
    } else if (type === ImportantDayEnum.OTHER_DAY) {
      form.description = ['', Validators.required];
    } else {
      form.budget = ['', Validators.required];
    }

    this.form = this.fb.group(form);
  }

  private getImportantDay(): void {
    this.importantDayService.getOne(this.routeParams.id)
      .pipe(first())
      .subscribe((res: ImportantDayInterface) => {
        this.importantDay = res;
        this.initForm(res ? res.type : ImportantDayEnum.HOLIDAY);
        this.form.patchValue(res);
      });
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private importantDayService: ImportantDayService,
    private snackBar: MatSnackBar
  ) { }
}
