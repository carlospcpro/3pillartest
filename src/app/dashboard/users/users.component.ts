import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DataService } from 'src/app/services/data';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ConfirmDialogModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  columns: any[] = [];
  data: any[] = [];
  userForm!: FormGroup;

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.columns = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'email' },
    ];
    this.userForm = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
    });
  }
  visible = false;

  showDialog(user?: any) {
    console.log('user', user);

    if (user) {
      this.userForm.setValue(user);
    } else {
      this.userForm.reset();
    }
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  saveUser() {
    console.log('User saved:', this.userForm?.value);
    this.hideDialog();
  }

  editUser(user: any) {
    this.userForm?.patchValue(user);
    this.showDialog();
  }

  ngOnInit() {
    this.dataService.UserData$.subscribe((userData) => {
      if (userData !== '') {
        this.data = userData;
      }
    });
  }
}
