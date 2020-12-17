import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { TransactionService } from '../service/transaction.service';
import { dummyTransactions } from '../service/transaction.service.spec';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ OverviewComponent ],
      imports: [
        MatCardModule,
        MatTableModule,
        MatIconModule
      ],
      providers: [
        TransactionService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should get transactions data from the service', waitForAsync(() => {
    expect(component.transactionData.data).toEqual([]);
  }));

  it('ngOnInit - Should subscribe to transactionRecords$', fakeAsync(() => {
    spyOn(component['subscriptions'], 'add');
    component.ngOnInit();
    tick();

    // Make sure the subscription is added to the subscriptions
    expect(component['subscriptions'].add).toHaveBeenCalled();
  }));

  it('ngOnDestroy - Should unsubscribe to subscriptions', () => {
    spyOn(component['subscriptions'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
  });
});
