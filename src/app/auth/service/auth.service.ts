import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {}

  public async signIn(email, password) {
    const result = await this.afAuth.signInWithEmailAndPassword(
      email,
      password
    );
    this.getDataUserName(result.user);
    result.user.getIdToken().then((value) => {
      localStorage.setItem('token', value);
    });
    localStorage.setItem(`favorite`, JSON.stringify({ favorites: [] }));
    localStorage.setItem(`favoriteItem`, JSON.stringify({ favorites: [] }));
  }

  public async signUp(email, password, userName) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.setDataUserName(result.user, userName);
    } catch (err) {
      console.log(err);
    }
  }

  private setDataUserName(user, userName) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: userName,
    };
    userRef.set(userData, { merge: true });
    this.router.navigateByUrl('login');
  }

  private getDataUserName(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    userRef.valueChanges().subscribe((value) => {
      localStorage.setItem('name', value.displayName);
      window.location.href = 'home';
    });
  }

  async signOut() {
    await this.afAuth.signOut();
  }
}
