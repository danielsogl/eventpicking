import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { User } from '../../classes/user';
import { Transaction } from '../../interfaces/transaction';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

/**
 * User dashboard component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  /** Logger */
  private log = Log.create('DashboardUserComponent');
  /** Firebase user */
  public user: User;
  /** Transactions */
  public transactions: Observable<Transaction[]>;
  /** New event form */
  public userForm: FormGroup;

  /**
   * Constructor
   * @param  {FirebaseAuthService} auth Firebase Auth Service
   * @param  {FirebaseFirestoreService} afs Firebase Firestore Service
   */
  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      billingAdress: this.formBuilder.group({
        city: ['', Validators.required],
        company: [''],
        email: ['', Validators.email],
        name: [''],
        lastname: [''],
        phone: ['', Validators.required],
        street: ['', Validators.required],
        streetnumber: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      deliveryAdress: this.formBuilder.group({
        city: ['', Validators.required],
        company: [''],
        email: ['', Validators.email],
        name: [''],
        lastname: [''],
        phone: ['', Validators.required],
        street: ['', Validators.required],
        streetnumber: ['', Validators.required],
        zip: ['', Validators.required]
      })
    });
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.auth.user.subscribe(user => {
      this.user = user;
      this.log.d('Loaded user', user);
      this.userForm.patchValue(this.user);
    });

    if (this.auth.getCurrentFirebaseUser()) {
      this.transactions = this.afs
        .getTransactionsByUser(this.auth.getCurrentFirebaseUser().uid)
        .valueChanges();

      this.transactions.subscribe(transactions => {
        this.log.d('Transactions', transactions);
      });
    }
  }

  /**
   * Open transaction detail model
   * @param  {Transaction} transaction Transaction to open
   */
  openTransaction(transaction: Transaction) {}

  /**
   * Update user profile
   */
  updateProfile() {
    const user = this.userForm.getRawValue();
    this.user.billingAdress = user.billingAdress;
    this.user.deliveryAdress = user.deliveryAdress;
    this.user.name = user.name;
    this.user.lastname = user.lastname;
    this.user.email = user.email;

    this.afs
      .updateUserData(this.user)
      .then(() => {
        this.log.d('Updated user');
      })
      .catch(err => {
        this.log.er('Error updating', err);
      });
  }
}
