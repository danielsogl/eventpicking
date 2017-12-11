echo -e "\n#2 = Building project..."
npm run pwa

echo -e "\n#3 - Deploying to Firebase Hosting..."
firebase deploy --only hosting -P prod --token $FIREBASE_TOKEN

echo -e "\nDone. The project deployed successfully."