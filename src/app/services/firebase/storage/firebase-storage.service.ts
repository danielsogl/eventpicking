import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from 'angularfire2/storage';
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
   * @returns {AngularFireUploadTask}
   */
  pushUpload(
    uid: string,
    event: string,
    upload: Upload
  ): AngularFireUploadTask {
    const storageRef: AngularFireStorageReference = this.afStorage.ref(
      `events/${uid}/${event}/${upload.file.name}`
    );

    return storageRef.put(upload.file);
  }

  deleteFile(uid: string, event: string, file: string) {
    const storageRef: AngularFireStorageReference = this.afStorage.ref(
      `events/${uid}/${event}/${file}`
    );
    return storageRef.delete();
  }
}
