echo "Build PWA"
npm run pwa
echo "Deploy to firebase"
firebase deploy --only hosting -P master --token $FIREBASE_TOKEN