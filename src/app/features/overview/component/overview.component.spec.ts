import { async, ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
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
  // let transactionServiceSpy: jasmine.SpyObj<TransactionService>;

  beforeEach(async () => {
    // transactionServiceSpy = jasmine.createSpyObj<TransactionService>('TransactionService', ['transactionRecords$']);

    await TestBed.configureTestingModule({
      declarations: [ OverviewComponent ],
      imports: [
        MatCardModule,
        MatTableModule,
        MatIconModule
      ],
      providers: [
        // {
        //   provide: TransactionService,
        //   useValue: transactionServiceSpy
        // }
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

  // it('Should capture record data correctly in transactionData', () => {
  //   transactionServiceSpy.transactionRecords$.next(dummyTransactions);

  //   expect(component.transactionData.data.length).toEqual(3);
  // });
});
