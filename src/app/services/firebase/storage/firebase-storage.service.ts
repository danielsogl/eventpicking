import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Log } from 'ng2-logger';

/**
 * A service to up and download files from Firebase storage
 * @author Daniel Sogl
 */
@Injectable()
export class FirebaseStorageService {
  private log = Log.create('FirebaseStorageService');

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
   * @param  {File} file File
   * @returns {AngularFireUploadTask}
   */
  pushUpload(uid: string, event: string, file: File): AngularFireUploadTask {
    const storageRef: AngularFireStorageReference = this.afStorage.ref(
      `events/${uid}/${event}/${file.name}`
    );
    return storageRef.put(file);
  }
}
