echo "Build application"
ng build --prod --env=dev
echo "Deploy to firebase"
firebase deploy --only hosting -P staging --token $FIREBASE_TOKEN