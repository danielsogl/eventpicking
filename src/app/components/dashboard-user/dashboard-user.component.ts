import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  private log = Log.create('DashboardUserComponent');

  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService
  ) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
