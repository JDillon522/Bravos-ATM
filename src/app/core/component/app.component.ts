import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AtmCash } from 'src/app/store/models/cash';
import { AtmState } from 'src/app/store/state/atm.state';
import { Cash } from '../models/cash';
import { ATMService, cashOnHandSeed } from '../service/atm/app.service';

@Component({
  selector: 'atm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(AtmState.getCashOnHand) cashOnHand$!: Observable<number>;
  @Select(AtmState.getAtmDenom) denomOnHand$!: Observable<AtmCash>;

  constructor( ) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
