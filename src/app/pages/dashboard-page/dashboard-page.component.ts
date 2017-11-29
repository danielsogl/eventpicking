import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';
import { FirebaseStorageService } from '../../services/firebase/storage/firebase-storage.service';
import {
  UploadFile,
  UploadInput,
  humanizeBytes,
  UploadOutput
} from 'ng-mdb-pro/pro/file-input';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private log = Log.create('DashboardPageComponent');

  public user: User;
  public fsEvents: any;
  public eventDocs: AngularFirestoreCollection<Event[]>;
  public events: Observable<Event[]>;
  public sales: any[] = [];
  public optionsSelect: Array<any>;
  public activeEvent: number;
  public eventEdit: Event;
  public newEvent: Event = new Event('');

  public formData: FormData;
  public files: UploadFile[];
  public uploadInput: EventEmitter<UploadInput>;
  public humanizeBytes: Function;
  public dragOver: boolean;

  public template: TemplateRef<any>;

  @ViewChild('loadingTmpl') loadingTmpl: TemplateRef<any>;
  @ViewChild('userTmpl') userTmpl: TemplateRef<any>;
  @ViewChild('photographerTmpl') photographerTmpl: TemplateRef<any>;
  @ViewChild('editEventModal') public editEventModal;
  @ViewChild('adminTmpl') adminTmpl: TemplateRef<any>;

  constructor(
    private auth: FirebaseAuthService,
    private afs: FirebaseFirestoreService,
    private storage: FirebaseStorageService
  ) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.optionsSelect = [
      { value: 'male', label: 'Frau' },
      { value: 'female', label: 'Herr' }
    ];
    this.template = this.loadingTmpl;
    this.auth.user.subscribe((user: any) => {
      if (user) {
        this.user = user;
        console.log(this.user);
        if (this.user.roles.admin) {
          this.template = this.adminTmpl;
        } else if (this.user.roles.user) {
          this.template = this.userTmpl;
        } else {
          this.template = this.photographerTmpl;
          // Load Events
          this.eventDocs = this.afs.getPhotographerEvents(this.user.uid);
          this.events = this.eventDocs.snapshotChanges().map((events: any) => {
            return events.map(event => {
              const data = event.payload.doc.data() as Event;
              const id = event.payload.doc.id;
              return { id, ...data };
            });
          });
        }
      }
    });
  }

  ngOnDestroy() {}

  createNewEvent() {
    this.newEvent.photographerUid = this.auth.getCurrentFirebaseUser().uid;
    this.eventDocs
      .add(JSON.parse(JSON.stringify(this.newEvent)))
      .then(event => {
        console.log('New Event', event);
        this.newEvent = new Event('');
      });
  }

  editEvent(event: Event) {
    console.log(event);
    this.eventEdit = JSON.parse(JSON.stringify(event));
    this.editEventModal.show();
  }

  updateEvent() {
    this.eventDocs
      .doc(this.eventEdit.id)
      .update(JSON.parse(JSON.stringify(this.eventEdit)));
    this.eventEdit = null;
    this.editEventModal.hide();
  }

  deleteEvent() {
    this.eventDocs.doc(this.eventEdit.id).delete();
    this.eventEdit = null;
    this.editEventModal.hide();
  }

  showFiles() {
    let files = '';
    for (let i = 0; i < this.files.length; i++) {
      files += this.files[i].name;
      if (!(this.files.length - 1 == i)) {
        files += ', ';
      }
    }
    return files;
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: '/upload',
      method: 'POST',
      data: { foo: 'bar' },
      concurrency: 1
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter(
        (file: UploadFile) => file !== output.file
      );
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    this.showFiles();
  }

  // detectFiles(event) {
  //   console.log(event);
  //   this.selectedFiles = event.target.files;
  // }

  // uploadSinglePicture() {
  //   const file = this.selectedFiles.item(0);
  //   this.currentUpload = new Upload(file);
  //   this.currentUpload.event = this.eventEdit.id;
  //   this.storage.pushUpload(this.currentUpload);
  // }

  // uploadMultiPictures() {
  //   const files = this.selectedFiles;
  //   const filesIndex = _.range(files.length);
  //   _.each(filesIndex, idx => {
  //     this.currentUpload = new Upload(files[idx]);
  //     this.currentUpload.event = this.eventEdit.id;
  //     this.storage.pushUpload(this.currentUpload);
  //   });
  // }
}
