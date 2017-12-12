// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  stripeKey: 'pk_test_HAX2HpQ1LizdcxCoTOopfGVZ',
  firebase: {
    apiKey: 'AIzaSyBnB8M0rd5R87WvE57NzQVPuEQ6JiRbq_I',
    authDomain: 'eventpicking-development.firebaseapp.com',
    databaseURL: 'https://eventpicking-development.firebaseio.com',
    projectId: 'eventpicking-development',
    storageBucket: 'eventpicking-development.appspot.com',
    messagingSenderId: '311467263618'
  }
};
