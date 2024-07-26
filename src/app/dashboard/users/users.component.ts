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
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  isEditing = false;

  confirm2(event: Event, rowData: any) {
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
        this.deleteDocument('users', rowData.id);
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
    private messageService: MessageService,
    private firestore: AngularFirestore
  ) {
    this.columns = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'email' },
    ];

    this.userForm = this.fb.group({
      id: [''],
      name: ['Juan Carlos'],
      email: ['testjuan@gmail.com'],
    });
  }
  visible = false;

  showDialog(user?: any) {
    if (user) {
      this.isEditing = true;
      this.userForm.setValue(user);
    } else {
      this.isEditing = false;
    }
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.userForm.reset();
  }

  saveUser() {
    console.log('this.userForm.value', this.userForm.value);
    if (this.isEditing) {
      this.updateDocument(
        'users',
        String(this.userForm.value.id),
        this.userForm.value
      );
      this.hideDialog();
    } else {
      this.addDocument('users', this.userForm.value);
      this.hideDialog();
    }
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

  deleteDocument(collectionName: string, id: string): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).delete();
  }

  addDocument(collectionName: string, document: any): Promise<void> {
    const id = this.firestore.createId();
    document.id = id;
    return this.firestore.collection(collectionName).doc(id).set(document);
  }

  updateDocument(collectionName: string, id: string, data: any): Promise<void> {
    console.log(collectionName, id, data);

    return this.firestore.collection(collectionName).doc(id).update(data);
  }
}
