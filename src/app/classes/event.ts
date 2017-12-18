import { Picture } from '../interfaces/picture';

export class Event {
  date: string;
  description: string;
  id: string;
  location: string;
  name: string;
  photographerUid: string;
  pictures: Picture[];
  public: boolean;

  constructor(eventData: any) {
    this.date = eventData.date;
    this.description = eventData.description;
    this.id = eventData.id;
    this.location = eventData.location;
    this.name = eventData.name;
    this.photographerUid = eventData.photographerUid;
    this.pictures = eventData.pictures;
    this.public = eventData.public;
  }
}
