import { SocialNetworkLinks } from '../../interfaces/social-network-links';
import { Picture } from '../../interfaces/picture';
import { BillingDetails } from '../../interfaces/billing-details';
import { UserRoles } from '../../interfaces/user-roles';
import { User } from '../../classes/user';
import { Adress } from '../../interfaces/adress';
import { Event } from '../../classes/event';

export const PHOTOGRAPHER: User = {
  uid: '100',
  email: 'photoattack@web.de',
  photographerUrl: 'fotostar',
  photoURL:
    'http://www.ausbildungen.info/wp-content/uploads/2014/06/Fotograf-Ausbildung.jpg',
  roles: { photographer: true },
  adress: {
    street: 'Hauptstrasse',
    street_number: '14',
    city: 'Metzingen',
    zip: '72555'
  },
  billingDetails: {},
  events: ['', ''],
  sovialNetworks: {
    facebook: 'https://de-de.facebook.com/',
    twitter: 'www.twitter.com',
    instagram: 'instagram.com',
    tumbler: 'tumblr.com',
    website: 'webseite.com'
  },
  salutation: 'Herr',
  name: 'Tim',
  lastname: 'Krießler'
};
