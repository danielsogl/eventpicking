import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Event } from '../../classes/event';
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

  /** Images to upload */
  public selectedFiles: FileList;

  /** Upload prgress */
  public uploadProgress: number;

  /** Event */
  @Input() public event: Event;
  /** Event images */
  @Input() public images: Observable<EventPicture[]>;
  /** Firebase user */
  @Input() public user: User;

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

  startUpload() {
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, idx => {
      this.storage.pushUpload(this.user.uid, this.event.id, files[idx]);
    });
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }
}
