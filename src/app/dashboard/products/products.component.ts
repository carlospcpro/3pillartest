import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data';
import { TableModule } from 'primeng/table';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  columns: any[] = [];
  data: any[] = [];
  constructor(
    private dataService: DataService,
    private firestore: AngularFirestore
  ) {
    this.dataService.ProductData$.subscribe((prod) => {
      this.data = prod;
    });
    this.columns = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'qty', header: 'qty' },
      { field: 'category', header: 'category' },
    ];
  }

  deleteDocument(collectionName: string, id: string): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).delete();
  }
}
