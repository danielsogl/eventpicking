import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Upload } from '../../../classes/upload-file';

/**
 * A service to up and download files from Firebase storage
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseStorageService {
  private log = Log.create('FirebaseStorageService');

  public uploads: Observable<Upload[]>;

  /**
   * @param  {AngularFireStorage} afStorage AngularFire Storage
   */
  constructor(private afStorage: AngularFireStorage) {
    this.log.color = 'green';
    this.log.d('Service injected');
  }

  /**
   * Upload images to Firebase storage
   * @param  {string} uid UID
   * @param  {string} event Event ID
   * @param  {Upload} upload Uploadfile
   */
  pushUpload(uid: string, event: string, upload: Upload) {
    const storageRef: AngularFireStorageReference = this.afStorage.ref(
      `events/${uid}/${event}/${upload.file.name}`
    );
    const uploadTask = storageRef.put(upload.file);

    uploadTask.snapshotChanges().subscribe(snapshot => {
      upload.progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      console.log(upload.progress);
    });
  }
}
