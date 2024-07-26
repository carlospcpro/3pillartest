import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data';
import { TableModule } from 'primeng/table';
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
  selector: 'app-products',
  providers: [ConfirmationService, MessageService],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    InputTextModule,
    ConfirmDialogModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  columns: any[] = [];
  data: any[] = [];
  productForm!: FormGroup;
  isEditing = false;
  visible = false;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firestore: AngularFirestore
  ) {
    this.productForm = this.fb.group({
      id: [''],
      name: [''],
      category: [''],
      qty: [''],
    });

    this.columns = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'qty', header: 'qty' },
      { field: 'category', header: 'category' },
    ];
  }

  showDialog(product?: any) {
    if (product) {
      this.isEditing = true;
      this.productForm.setValue(product);
    } else {
      this.isEditing = false;
    }
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.productForm.reset();
  }

  save() {
    if (this.isEditing) {
      this.updateDocument(
        'products',
        String(this.productForm.value.id),
        this.productForm.value
      );
      this.hideDialog();
    } else {
      this.addDocument('products', this.productForm.value);
      this.hideDialog();
    }
  }

  editproduct(product: any) {
    this.productForm?.patchValue(product);
    this.showDialog();
  }

  ngOnInit() {
    this.dataService.ProductData$.subscribe((prod) => {
      this.data = prod;
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
        this.deleteDocument('products', rowData.id);
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
