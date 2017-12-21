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
  public: boolean;
  ratings: number;

  constructor(eventData: any) {
    this.date = eventData.date;
    this.description = '';
    this.id = eventData.id;
    this.location = eventData.location;
    this.name = eventData.name;
    this.photographerUid = eventData.photographerUid;
    this.public = false;
    this.ratings = 0;
  }
}
