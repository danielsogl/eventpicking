ng build --prod --env=dev
firebase deploy --only hosting -P staging --token $FIREBASE_TOKEN