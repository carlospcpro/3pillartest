import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ClearToken, SetToken } from './auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  error: string | null = null;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private store: Store
  ) {}

  async login(email: string, password: string) {
    try {
      const userCredential = await this.fireauth.signInWithEmailAndPassword(
        email,
        password
      );
      const token = await userCredential.user?.getIdToken();
      if (token) {
        this.store.dispatch(new SetToken(token));
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      this.error = error.message;
    }
  }

  async logout() {
    await this.fireauth.signOut();
    this.store.dispatch(new ClearToken());
    this.router.navigate(['/login']);
  }
}
