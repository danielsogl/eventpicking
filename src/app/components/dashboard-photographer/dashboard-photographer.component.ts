import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

@Component({
  selector: 'app-dashboard-photographer',
  templateUrl: './dashboard-photographer.component.html',
  styleUrls: ['./dashboard-photographer.component.scss']
})
export class DashboardPhotographerComponent implements OnInit {
  private log = Log.create('DashboardPhotographerComponent');

  constructor(private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService) { }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }

}
