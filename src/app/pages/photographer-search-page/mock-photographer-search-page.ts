import { PhotographerProfile } from '../../interfaces/photographer-profile';

export const PHOTOGRAPHERS: PhotographerProfile[] = [
  {
    about: 'Ich bin ein Hochzeitsfotograf',
    address: {
      city: 'Stuttgart',
      email: 'test@web.de',
      phone: '01234',
      street: 'Hauptstraße',
      streetnumber: '2',
      zip: '70173'
    },
    email: 'test@web.de',
    facebook: 'sdf',
    location: { lat: 1, lng: 2 },
    name: 'Toni Kroos',
    phone: '071234',
    photoUrl:
      'https://cdn.images.dailystar.co.uk/dynamic/58/photos/645000/620x/Toni-Kroos-657599.jpg',
    premium: true
  }
];
