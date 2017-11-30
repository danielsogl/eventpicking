import { Injectable } from '@angular/core';
import { Log } from 'ng2-logger';
import * as firebase from 'firebase';

import { Upload } from '../../../classes/upload';
import { FirebaseFirestoreService } from '../firestore/firebase-firestore.service';

/**
 * Ein Service für die Kommunikation mit dem Firebase Storage Service
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseStorageService {
  private log = Log.create('FirebaseStorageService');

  /**
   * @param  {FirebaseApp} fbApp AngularFire Firebase App
   */
  constructor(private afs: FirebaseFirestoreService) {
    this.log.color = 'green';
    this.log.d('Service injected');
  }

  getEventPictures(uid: string, event: string) {
    const storageRef = firebase.storage().ref();
    return storageRef.child(`events/${uid}/${event}/public/`);
  }

  pushUpload(uid: string, upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`events/${uid}/${upload.event}/originals/${upload.file.name}`)
      .put(upload.file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) => {
        upload.progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      },
      err => {
        this.log.er('Image upload error', err);
      },
      () => {
        this.log.d('Image uploaded successful');
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.afs.setPictureData(upload);
      }
    );
  }
}
