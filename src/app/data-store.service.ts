import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private readonly _guests = new BehaviorSubject<any[]>([]);
  readonly guests$ = this._guests.asObservable();

  constructor() { }

  public getGuests(): any[] {
    return this._guests.getValue();
  }

  public setGuests(val: any[]) {
    this._guests.next(val);
  }
}
