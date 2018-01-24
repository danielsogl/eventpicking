import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Event } from '../../classes/event';
import { PriceList } from '../../classes/price-list';
import { Upload } from '../../classes/upload-file';
import { User } from '../../classes/user';
import { EventPicture } from '../../interfaces/event-picture';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';
import { NavigationService } from '../../services/navigation/navigation.service';

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

  /** Upload in progress */
  public uploadStarted: boolean;

  /** Event */
  @Input() public event: Event;
  /** Event images */
  @Input() public images: Observable<EventPicture[]>;
  /** Firebase user */
  @Input() public user: User;
  /** Event printing house */
  public priceList: PriceList;

  /**
   * Constructor
   * @param  {FirebaseFirestoreService} afs Firebase Firestore Service
   * @param  {FirebaseStorageService} storage Firebase Storage Service
   * @param  {FormBuilder} formBuilder Angular Form Builder
   */
  constructor(
    private afs: FirebaseFirestoreService,
    private storage: FirebaseStorageService,
    private formBuilder: FormBuilder,
    private navigation: NavigationService
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
      ratings: [0, Validators.required],
      deleted: [false, Validators.required]
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

      this.images.subscribe(images => {
        this.log.d('Images', images);
      });

      this.afs
        .getPriceList(this.event.photographerUid)
        .valueChanges()
        .subscribe(priceList => {
          if (priceList) {
            this.priceList = priceList;
            this.log.d('Loaded printing house', this.priceList);
          }
        });
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
   * Delete an image
   * @param  {EventPicture} image
   */
  deleteImage(image: EventPicture) {
    this.afs
      .deleteEventImage(image.id)
      .then(() => {
        this.log.d('Deleted image', image);
      })
      .catch(err => {
        this.log.er('Error deleting image', err);
      });
  }

  /**
   * Upadte event data in firestore
   */
  updateEvent() {
    this.event = this.eventForm.getRawValue();
    this.afs
      .updatePhotographerEvent(this.event)
      .then(() => {
        this.log.d('Updated event');
      })
      .catch(err => {
        this.log.er('Error updating event', err);
      });
  }

  /**
   * Delete the event
   */
  deleteEvent() {
    this.afs
      .deletePhotographerEvent(this.event.id)
      .then(() => {
        this.log.d('Deleted Event');
        this.navigation.navigateTo('/dashboard');
      })
      .catch(err => {
        this.log.er('Error deliting Event');
      });
  }

  /**
   * Delete file from the upload array
   * @param  {number} index File array index
   */
  deleteFile(index: number) {
    this.uploadFiles.splice(index, 1);
  }

  /**
   * Start upload
   */
  startUpload() {
    this.uploadStarted = true;
    const items = this.uploadFiles.length;
    let count = 0;
    for (let i = 0; i < this.uploadFiles.length; i++) {
      const uploadTask = this.storage.pushUpload(
        this.event.id,
        this.uploadFiles[i]
      );

      uploadTask.snapshotChanges().subscribe(snapshot => {
        this.uploadFiles[i].progress =
          snapshot.bytesTransferred / snapshot.totalBytes * 100;
      });

      uploadTask.then().then(() => {
        console.log('Image upload finsihed: ', i);
        count++;
        if (count === items) {
          this.uploadStarted = false;
          setTimeout(() => {
            this.uploadFiles = [];
          }, 2000);
        }
      });
    }
  }
}
