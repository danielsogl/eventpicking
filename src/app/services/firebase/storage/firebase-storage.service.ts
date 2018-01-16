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
  /** Logger */
  private log = Log.create('FirebaseStorageService');

  /** Upload files */
  public uploads: Observable<Upload[]>;

  /**
   * Constructor
   * @param  {AngularFireStorage} afStorage AngularFire Storage
   */
  constructor(private afStorage: AngularFireStorage) {
    this.log.color = 'green';
    this.log.d('Service injected');
  }

  /**
   * Upload images to Firebase storage
   * @param  {string} event Event ID
   * @param  {Upload} upload Uploadfile
   * @returns {AngularFireUploadTask}
   */
  pushUpload(event: string, upload: Upload): AngularFireUploadTask {
    const storageRef: AngularFireStorageReference = this.afStorage.ref(
      `events/${event}/${upload.file.name}`
    );

    return storageRef.put(upload.file);
  }
}
