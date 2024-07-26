import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private UserDataBehaviorSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>('');
  public UserData$: Observable<any> =
    this.UserDataBehaviorSubject.asObservable();

  private ProductDataBehaviorSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>('');
  public ProductData$: Observable<any> =
    this.ProductDataBehaviorSubject.asObservable();

  private ProductCategoryBehaviorSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>('');
  public ProductCategory$: Observable<any> =
    this.ProductCategoryBehaviorSubject.asObservable();

  public updateUserData(newUserData: any): void {
    this.UserDataBehaviorSubject.next(newUserData);
  }

  public updateProductData(newProductData: any): void {
    this.ProductDataBehaviorSubject.next(newProductData);
  }

  public updateProductCategory(newProductCategory: any): void {
    this.ProductCategoryBehaviorSubject.next(newProductCategory);
  }
}
