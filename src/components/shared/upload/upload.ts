import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './upload.html',
  styleUrl: './upload.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Upload),
      multi: true,
    },
  ],
})
export class Upload implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';

  fileName: string = '';
  disabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;

      const fileData = {
        name: file.name,
        url: URL.createObjectURL(file),
      };

      this.onChange(fileData);
      this.onTouched();
    }
  }

  writeValue(value: any): void {
    if (!value) {
      this.fileName = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
