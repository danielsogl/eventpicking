echo -e "\n#2 = Building project..."
ng build --prod --env=dev

echo -e "\n#3 - Deploying to Firebase Hosting..."
firebase deploy --only hosting -P staging --token $FIREBASE_TOKEN

echo -e "\nDone. The project deployed successfully."