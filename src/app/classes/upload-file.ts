/**
 * Upload file
 * @author Daniel Sogl
 */
export class Upload {
  /** File */
  file: File;
  /** File name */
  name: string;
  /** Upload progress */
  progress: number;
  /** File url */
  url: string;

  /**
   * Constructor
   * @param  {File} file File
   */
  constructor(file: File) {
    this.file = file;
    this.name = file.name;
  }
}
