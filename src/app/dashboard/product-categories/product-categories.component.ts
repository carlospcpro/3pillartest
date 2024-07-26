import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DataService } from 'src/app/services/data';

@Component({
  selector: 'app-product-categories',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './product-categories.component.html',
  styleUrl: './product-categories.component.css',
})
export class ProductCategoriesComponent {
  columns: any[] = [];
  data: any[] = [];
  constructor(private dataService: DataService) {
    this.dataService.ProductCategory$.subscribe((ProductCategory) => {
      this.data = ProductCategory;
    });
    this.columns = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
    ];
  }
}
