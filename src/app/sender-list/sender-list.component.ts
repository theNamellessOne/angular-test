import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SenderService } from '../service/sender.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sender } from '../model/sender/sender.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SenderDialogFormComponent } from '../sender-dialog-form/sender-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './sender-list.component.html',
  styleUrls: ['./sender-list.component.scss'],
})
export class SenderListComponent implements AfterViewInit {
  isLoading: boolean = true;
  dataSource: MatTableDataSource<Sender>;
  errMsg: string;

  columns: string[] = [
    'idobject',
    'companyName',
    'zipCode',
    'country',
    'region',
    'city',
    'street',
    'houseNo',
    'flatNo',
    'phone',
    'senderUrl',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private senderService: SenderService,
    private senderDialogForm: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.fetchSenderList();
    this.senderService.shouldRefresh.subscribe((_) => {
      this.isLoading = true;
      this.fetchSenderList();
    });
  }

  private fetchSenderList(): void {
    this.senderService.getSenderList().subscribe((r) => {
      this.isLoading = false;
      this.errMsg = r.errorMessage;
      this.dataSource = new MatTableDataSource(r.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }

  openSenderDialogForm(sender?: Sender): void {
    this.senderDialogForm.open(SenderDialogFormComponent, {
      data: sender,
    });
  }
}
