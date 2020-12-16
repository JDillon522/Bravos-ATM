import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'atm-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss']
})
export class RestockComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    100: this.fb.control(null),
    50: this.fb.control(null),
    20: this.fb.control(null),
    10: this.fb.control(null),
    5: this.fb.control(null),
    1: this.fb.control(null)
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
