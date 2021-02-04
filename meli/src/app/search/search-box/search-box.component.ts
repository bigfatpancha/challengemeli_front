import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBoxComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements ControlValueAccessor {

  value: string;
  isFocused: boolean;
  isDisabled: boolean;
  private onTouched = () => {};
  private onChange = (_: any) => {};

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  setValue(value: any) {
    this.value = value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.onTouched();
    this.isFocused = false;
  }

}
