export class Upload {
  file: File;
  name: string;
  progress: number;

  constructor(file: File) {
    this.file = file;
    this.name = file.name;
  }
}
