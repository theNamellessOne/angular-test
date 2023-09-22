import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sender } from '../model/sender/sender.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SenderService } from '../service/sender.service';

@Component({
  selector: 'app-sender-dialog-form',
  templateUrl: './sender-dialog-form.component.html',
  styleUrls: ['./sender-dialog-form.component.scss'],
})
export class SenderDialogFormComponent {
  senderForm: FormGroup;
  msg: string;

  constructor(
    private senderService: SenderService,
    private dialogRef: MatDialogRef<SenderDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Sender
  ) {
    this.senderForm = new FormGroup({
      companyName: new FormControl(data?.companyName || '', {
        validators: [Validators.required],
      }),
      country: new FormControl(data?.country || '', {
        validators: [Validators.required],
      }),
      region: new FormControl(data?.region || '', {
        validators: [Validators.required],
      }),
      city: new FormControl(data?.city || '', {
        validators: [Validators.required],
      }),
      street: new FormControl(data?.street || ''),
      houseNo: new FormControl(data?.houseNo || ''),
      flatNo: new FormControl(data?.flatNo || ''),
      senderUrl: new FormControl(data?.senderUrl || ''),
      phone: new FormControl(data?.phone || '', {
        validators: [Validators.required],
      }),
      zipCode: new FormControl(data?.zipCode || '', {
        validators: [Validators.required],
      }),
    });

    if (data?.idobject) {
      this.senderForm.addControl('idobject', new FormControl(data.idobject));
    }
  }

  handleSubmit() {
    if (this.senderForm.valid) {
      this.senderService
        .saveSender({ ...this.senderForm.value })
        .subscribe((r) => {
          if (r.errorMessage) {
            this.msg = r.errorMessage;
          } else {
            this.msg = 'Saved Successfully!';
          }
        });
    } else {
      this.senderForm.markAllAsTouched();
    }
  }
}
