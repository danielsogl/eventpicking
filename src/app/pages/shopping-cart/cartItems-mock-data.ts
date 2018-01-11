import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';

export const ITEMS: ShoppingCartItem[] = [
  {
    eventname: 'Hochzeit Mario&Gomez',
    key: 'IMG_352',
    format: { type: 'download', price: 0.99, height: 100, width: 100 },
    url:
      'http://www.storyfox.de/wp-content/uploads/2016/11/2016-11-19-03_05_27-Ihr-Hochzeitsfoto-erntete-einen-Shitstorm.-5-Jahre-sp%C3%A4ter-haben-sie-etwas-Wichti.jpg',
    amount: 1
  },
  {
    eventname: 'Hochzeit Mario&Gomez',
    key: 'IMG_353',
    format: { type: 'print', price: 2.99, height: 200, width: 200 },
    url:
      'https://static1.squarespace.com/static/55c37beae4b0336075603f86/55c3cd80e4b01531b3208f2e/5603032be4b008bd0ad4e6fb/1486126957019/?format=1500w',
    amount: 1
  },
  {
    eventname: 'Geburtstag Inge 40',
    key: 'IMG_9000',
    format: { type: 'download', price: 3.99, height: 300, width: 300 },
    url: 'http://www.partytipps.info/wp-content/uploads/geburtstag.jpg',
    amount: 1
  }
];
