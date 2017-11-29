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

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`events/${upload.event}/${upload.file.name}`)
      .put(upload.file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) => {
        // upload in progress
        upload.progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      },
      error => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.afs.saveFileData(upload);
      }
    );
  }
}
