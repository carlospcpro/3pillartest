import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetUser } from '../states/user.state';

@Injectable({
  providedIn: 'root',
})
export class dataChecker {
  constructor(private store: Store) {
    this.loadStateFromLocalStorage();
  }

  loadStateFromLocalStorage() {
    const savedState = localStorage.getItem('userState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      this.store.dispatch(new SetUser(parsedState));
    }
  }
}
