import { AuthService } from './../auth.service';
import { DataService } from './../services/data';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthGuard } from '../services/authguard.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',

  providers: [AuthService, AuthGuard, AngularFireAuth],
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
    private dataService: DataService,
    private AuthService: AuthService,
    private router: Router
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
    const id = this.firestore.createId();
    return this.firestore.collection(collectionName).doc(id).set(document);
  }

  updateDocument(collectionName: string, id: string, data: any): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).update(data);
  }

  signOut() {
    this.AuthService.logout();
  }
}
