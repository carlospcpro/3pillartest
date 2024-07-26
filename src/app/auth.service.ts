import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  error: string | null = null;
  constructor(private fireauth: AngularFireAuth, private router: Router) {}
  async login(email: string, password: string) {
    try {
      await this.fireauth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/home']); // Redirect to home or any other route
    } catch (error: any) {
      this.error = error.message;
    }
  }
  logout() {
    this.fireauth.signOut();
  }
}
