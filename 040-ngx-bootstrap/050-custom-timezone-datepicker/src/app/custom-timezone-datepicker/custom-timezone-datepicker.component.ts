import { CustomTimezoneDatepickerService } from './custom-timezone-datepicker.service';
import { Component, OnInit, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-custom-timezone-datepicker',
  templateUrl: './custom-timezone-datepicker.component.html',
  styleUrls: ['./custom-timezone-datepicker.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomTimezoneDatepickerComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTimezoneDatepickerComponent implements OnInit, ControlValueAccessor{

  destory$ : Subject<boolean> = new Subject<boolean>();

  timezone: number = 0;
  value: Date;

  onChange: (value: any) => void;

  constructor(private _changeDetectorRef: ChangeDetectorRef, 
              private _localTimeZoneDatepickerService: CustomTimezoneDatepickerService) {
    this.timezone = this._localTimeZoneDatepickerService.getTimeZone();
  }

  ngOnInit() {
    this._localTimeZoneDatepickerService.getTimeZoneUpdate().pipe(
      takeUntil(this.destory$),
      tap(val => {
        this.timezone = val;
        if (this.value instanceof Date){
          let tmpDate = new Date(this.value.getTime());
          tmpDate.setHours(0);
          tmpDate.setMinutes(0);
          tmpDate.setSeconds(0);
          tmpDate.setMilliseconds(0);
          tmpDate = new Date(tmpDate.getTime() - (this.value.getTimezoneOffset() + this.timezone * 60) * 60 * 1000)
          this.onChange(tmpDate);  
        }
      })
    ).subscribe()
  }

  bsValueChange(val){
    setTimeout(()=>{
      this.value = val;
      if (val instanceof Date){
        let tmpDate = new Date(val.getTime());
        tmpDate.setHours(0);
        tmpDate.setMinutes(0);
        tmpDate.setSeconds(0);
        tmpDate.setMilliseconds(0);
        tmpDate = new Date(tmpDate.getTime() - (val.getTimezoneOffset() + this.timezone * 60) * 60 * 1000)
        this.onChange(tmpDate);  
      }else {
        this.onChange(val);
      }
    });
  }

  writeValue(val: any): void {
    if (val){
      if (val instanceof Date){
        this.value = new Date(val.getTime() + (val.getTimezoneOffset() + + this.timezone * 60) * 60 * 1000);
      }else {
        this.value = val;
      }
      this._changeDetectorRef.detectChanges();
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }
  

}
