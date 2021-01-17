import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImportantDayInterface } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ImportantDayService {

  private storageName = 'importantDays';

  getAll(date: string): Observable<ImportantDayInterface[]> {
    const parseDate = date.substring(0, date.indexOf('T'));
    const items = this.getItems();
    return of(items)
      .pipe(
        map(importantDays => {
          return importantDays.filter(item => item.date.includes(parseDate));
        })
      );
  }

  getOne(id: string): Observable<ImportantDayInterface> {
    const items = this.getItems();
    const findImportantDay = items.find(item => item.id === id);
    return of(findImportantDay);
  }

  add(data: ImportantDayInterface): Observable<ImportantDayInterface> {
    const items = this.getItems();
    items.push(data);
    localStorage.setItem(this.storageName, JSON.stringify(items));
    return of(data);
  }

  update(data: ImportantDayInterface): Observable<ImportantDayInterface> {
    const items = this.getItems();
    const findImportantDayIndex = items.findIndex(item => item.id === data.id);
    items[findImportantDayIndex] = data;
    localStorage.setItem(this.storageName, JSON.stringify(items));
    return of(data);
  }

  delete(id: string): Observable<boolean> {
    const items = this.getItems();
    localStorage.setItem(this.storageName, JSON.stringify(
      items.filter(item => item.id !== id)
    ));
    return of(true);
  }

  private getItems(): ImportantDayInterface[] {
    return JSON.parse(localStorage.getItem(this.storageName)  || '[]');
  }
  constructor() { }
}
