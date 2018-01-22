import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { User } from '../../classes/user';
import { Transaction } from '../../interfaces/transaction';
import { AlertService } from '../../services/alert/alert.service';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { ModalDirective } from 'ng-mdb-pro/free/modals/modal.directive';

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
  /** Transaction modal data */
  public transaction: Transaction;
  /** Create new event modal */
  @ViewChild('transactionModal') public transactionModal: ModalDirective;

  /**
   * Constructor
   * @param  {FirebaseAuthService} auth Firebase Auth Service
   * @param  {FirebaseFirestoreService} afs Firebase Firestore Service
   */
  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService,
    private formBuilder: FormBuilder,
    private alert: AlertService
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
      if (user) {
        this.user = user;
        this.log.d('Loaded user', user);
        this.userForm.patchValue(this.user);
      }
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
  openTransaction(transaction: Transaction) {
    this.transaction = transaction;
    this.transactionModal.show();
  }

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
        this.alert.showInfo({ title: 'Profil erfolgreich aktualisiert' });
      })
      .catch(err => {
        this.log.er('Error updating', err);
        this.alert.showError({
          title: 'Profil konnte nicht aktualisiert werden.'
        });
      });
  }
}
