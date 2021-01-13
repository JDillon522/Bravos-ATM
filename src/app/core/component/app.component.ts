import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AtmCash } from 'src/app/store/models/cash';
import { AtmState } from 'src/app/store/state/atm.state';

@Component({
  selector: 'atm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(AtmState.getCashOnHand) cashOnHand$!: Observable<number>;
  @Select(AtmState.getAtmDenom) denomOnHand$!: Observable<AtmCash>;

  private currentUrl: string = '/';
  get showHomeLink(): boolean {
    return this.currentUrl !== '/';
  }

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(event => {
      this.currentUrl = (event as NavigationEnd).url;
    });
  }

  ngOnDestroy(): void {

  }

}
