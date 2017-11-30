import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import {
  humanizeBytes,
  UploadFile,
  UploadInput,
  UploadOutput
} from 'ng-mdb-pro/pro/file-input';
import { Log } from 'ng2-logger';

import { Event } from '../../classes/event';
import { Upload } from '../../classes/upload';
import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit, OnDestroy {
  private log = Log.create('EventPageComponent');

  private sub: any;
  private id: string;

  public event: Event;

  public images: any[] = [];

  public user: User;
  public isOwner = false;

  public formData: FormData;

  public selectedFiles: FileList;
  public currentUpload: Upload;

  constructor(
    private router: ActivatedRoute,
    private afs: FirebaseFirestoreService,
    private storage: FirebaseStorageService,
    private auth: FirebaseAuthService
  ) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.sub = this.router.params.subscribe(params => {
      this.id = params['id'];
      this.log.d('Event ID', this.id);
      if (this.id) {
        this.afs
          .getEvent(this.id)
          .valueChanges()
          .subscribe(event => {
            this.event = event;
            this.log.d('Event data', this.event);

            this.afs
              .getEventPictures(event.id)
              .valueChanges()
              .subscribe(images => {
                this.log.d('images', images);
              });

            this.auth.user.subscribe((user: any) => {
              if (user) {
                this.user = user;
                this.afs
                  .getPhotographerEventsFromProfile(this.user.uid)
                  .valueChanges()
                  .subscribe(data => {
                    if (data.filter((e: any) => e.id === this.id).length > 0) {
                      this.isOwner = true;
                      this.log.d('Photographer is owner of this event');
                    } else {
                      this.log.d('Photographer is not the owner of this event');
                    }
                  });
              }
            });
          });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadMulti() {
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, idx => {
      this.currentUpload = new Upload(files[idx]);
      this.currentUpload.event = this.id;
      this.storage.pushUpload(this.user.uid, this.currentUpload);
    });
  }

  showFiles() {
    let files = '';
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        files += this.selectedFiles[i].name;
        if (!(this.selectedFiles.length - 1 === i)) {
          files += ', ';
        }
      }
    }
    return files;
  }
}
