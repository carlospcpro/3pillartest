import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DataService } from 'src/app/services/data';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-product-categories',
  providers: [ConfirmationService, MessageService],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './product-categories.component.html',
  styleUrl: './product-categories.component.css',
})
export class ProductCategoriesComponent {
  columns: any[] = [];
  data: any[] = [];
  productCategoryForm!: FormGroup;
  isEditing = false;
  visible = false;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firestore: AngularFirestore
  ) {
    this.productCategoryForm = this.fb.group({
      id: [''],
      name: [''],
    });

    this.columns = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
    ];
  }

  showDialog(product?: any) {
    if (product) {
      this.isEditing = true;
      this.productCategoryForm.setValue(product);
    } else {
      this.isEditing = false;
    }
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.productCategoryForm.reset();
  }

  save() {
    if (this.isEditing) {
      this.updateDocument(
        'categories',
        String(this.productCategoryForm.value.id),
        this.productCategoryForm.value
      );
      this.hideDialog();
    } else {
      this.addDocument('categories', this.productCategoryForm.value);
      this.hideDialog();
    }
  }

  editproduct(product: any) {
    this.productCategoryForm?.patchValue(product);
    this.showDialog();
  }

  ngOnInit() {
    this.dataService.ProductCategory$.subscribe((ProductCategory) => {
      this.data = ProductCategory;
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
        this.deleteDocument('categories', rowData.id);
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
}
