import { DataService } from './../services/data';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button'; // Para el botón de menú en el header
import { FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarModule,
    MenuModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(
    private firestore: AngularFirestore,
    private dataService: DataService
  ) {
    this.getData();
  }

  getData() {
    this.getCollection('users').subscribe((response) => {
      this.dataService.updateUserData(response);
    });

    this.getCollection('products').subscribe((response) => {
      this.dataService.updateProductData(response);
    });

    this.getCollection('categories').subscribe((response) => {
      this.dataService.updateProductCategory(response);
    });
  }

  getCollection(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).valueChanges();
  }

  addDocument(collectionName: string, document: any): Promise<void> {
    const id = this.firestore.createId(); // Generate a unique ID for the document
    return this.firestore.collection(collectionName).doc(id).set(document);
  }

  updateDocument(collectionName: string, id: string, data: any): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).update(data);
  }

  deleteDocument(collectionName: string, id: string): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).delete();
  }
}
