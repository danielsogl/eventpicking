import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Event } from '../../classes/event';
import { Upload } from '../../classes/upload-file';
import { User } from '../../classes/user';
import { EventPicture } from '../../interfaces/event-picture';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';

/**
 * Event photographer view component
 * @author Daniel Sogl
 */
@Component({
  selector: 'app-event-photographer',
  templateUrl: './event-photographer.component.html',
  styleUrls: ['./event-photographer.component.scss']
})
export class EventPhotographerComponent implements OnInit {
  /** Logger */
  private log = Log.create('EventPhotographerComponent');

  /** Event form */
  public eventForm: FormGroup;

  /** Files for the upload */
  public uploadFiles: Upload[] = [];

  /** Event */
  @Input() public event: Event;
  /** Event images */
  @Input() public images: Observable<EventPicture[]>;
  /** Firebase user */
  @Input() public user: User;

  /**
   * @param  {FirebaseFirestoreService} afs Firebase Firestore Service
   * @param  {FirebaseStorageService} storage Firebase Storage Service
   * @param  {FormBuilder} formBuilder Angular Form Builder
   */
  constructor(
    private afs: FirebaseFirestoreService,
    private storage: FirebaseStorageService,
    private formBuilder: FormBuilder
  ) {
    this.eventForm = this.formBuilder.group({
      date: ['', Validators.required],
      description: [''],
      id: ['', Validators.required],
      location: ['', Validators.required],
      name: ['', Validators.required],
      password: [''],
      photographerUid: ['', Validators.required],
      public: [false, Validators.required],
      ratings: [0, Validators.required]
    });
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.log.d('Event', this.event);
    this.log.d('User', this.user);

    if (this.event) {
      // Set form data
      this.eventForm.setValue(this.event);
      // Load images
      this.images = this.afs.getEventPictures(this.event.id).valueChanges();
    }
  }

  /**
   * Add files to fileslist
   * @param  {any} event
   */
  detectFiles(event: any) {
    const files = event.target.files;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, idx => {
      this.uploadFiles.push(new Upload(files[idx]));
    });
  }

  /**
   * Start upload
   */
  startUpload() {
    for (let i = 0; i < this.uploadFiles.length; i++) {
      const uploadTask = this.storage.pushUpload(
        this.user.uid,
        this.event.id,
        this.uploadFiles[i]
      );

      uploadTask.snapshotChanges().subscribe(snapshot => {
        this.uploadFiles[i].progress =
          snapshot.bytesTransferred / snapshot.totalBytes * 100;
        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          this.uploadFiles.splice(i, 1);
        }
      });

      // https://github.com/angular/angularfire2/pull/1369#issuecomment-353218199
      uploadTask.then().then(a => {
        this.uploadFiles[i].url = a.metadata.downloadURLs[0];
        this.afs.setPictureData(this.uploadFiles[i]);
      });
    }
  }
}
