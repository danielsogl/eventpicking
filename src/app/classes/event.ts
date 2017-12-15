import { Picture } from '../interfaces/picture';

/**
 * Event class
 * @author Daniel Sogl
 */
export class Event {
  date: string;
  description: string;
  id: string;
  location: string;
  name: string;
  photographerUid: string;
  pictures: Picture[];
  public: boolean;
  ratings: number;

  constructor(eventData: any) {
    this.date = eventData.date;
    this.description = '';
    this.id = eventData.id;
    this.location = eventData.location;
    this.name = eventData.name;
    this.photographerUid = eventData.photographerUid;
    this.pictures = [];
    this.public = false;
    this.ratings = 0;
  }
}
