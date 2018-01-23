import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver/FileSaver';
import * as JSZip from 'jszip';
import { ModalDirective } from 'ng-mdb-pro/free/modals/modal.directive';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { User } from '../../classes/user';
import { Transaction, TransactionItem } from '../../interfaces/transaction';
import { AlertService } from '../../services/alert/alert.service';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

declare var JSZipUtils;

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

  downloadImage(url: string) {
    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
  }

  /**
   * Download all images as a zip folder
   * @param  {TransactionItem} images Images to download
   */
  downloadAllImages(items: TransactionItem[]) {
    this.loadJSUtilScript().then(() => {
      let count = 0;
      const zip = new JSZip();
      const zipFilename = 'zipFilename.zip';
      items.forEach(item => {
        if (item.sku === 'Download') {
          JSZipUtils.getBinaryContent(item.downloadUrl, function(err, data) {
            if (err) {
              throw err;
            }
            zip.file(item.url, data, { binary: true });
            count++;
            if (count === items.length) {
              zip.generateAsync({ type: 'blob' }).then(function(content) {
                saveAs(content, name);
              });
            }
          });
        } else {
          count++;
        }
      });
    });
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

  /**
   * Load paypal checkout script into DOM
   * @returns {Promise<any>}
   */
  loadJSUtilScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src =
        'https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.0.2/jszip-utils.min.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
}
