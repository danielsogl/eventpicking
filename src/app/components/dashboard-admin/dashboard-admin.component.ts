import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  private log = Log.create('DashboardAdminComponent');

  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService
  ) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
