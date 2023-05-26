import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UnsubscribesDestroy implements OnDestroy {
  _unsub = new Subject<any>();
  _unsubInd = new Subject<any>();
  _unsubInd2 = new Subject<any>();
  _unsubInd3 = new Subject<any>();
  _unsubInd4 = new Subject<any>();
  _unsubInd5 = new Subject<any>();
  _unsubInd6 = new Subject<any>();
  _unsubInd7 = new Subject<any>();
  ngOnDestroy(): void {
    this._unsub.next(' ');
    this._unsub.complete();
    this._unsubInd.next(' ');
    this._unsubInd.complete();
    this._unsubInd2.next(' ');
    this._unsubInd2.complete();
    this._unsubInd3.next(' ');
    this._unsubInd3.complete();
    this._unsubInd4.next(' ');
    this._unsubInd4.complete();
    this._unsubInd5.next(' ');
    this._unsubInd5.complete();
    this._unsubInd6.next(' ');
    this._unsubInd6.complete();
    this._unsubInd7.next(' ');
    this._unsubInd7.complete();
  }
}
