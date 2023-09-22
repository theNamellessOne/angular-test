import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() name: string;
  @Input() label: string = 'Label';
  @Input() errMsg: string = 'This field is required';
  @Input() placeholder: string = '';
  @Input() parentForm: FormGroup;

  onChange: (value: any) => void;
  onTouched: () => void;

  disabled = false;

  get control(): FormControl {
    return this.parentForm.get(this.name) as FormControl;
  }

  handleChange(event: Event): void {
    this.onChange((<HTMLInputElement>event.target).value);
  }

  writeValue(value: any): void {}
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
