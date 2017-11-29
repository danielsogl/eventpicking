import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firebaseError',
  pure: true
})
export class FirebaseErrorPipe implements PipeTransform {
  transform(value: any): any {
    let message;
    switch (value) {
      case 'auth/app-deleted':
        message = 'Die Anwendung ist nicht mehr verfügbar';
        break;
      case 'auth/app-not-authorized':
        message = 'Die Anwendung ist nicht autorisiert';
        break;
      case 'auth/argument-error':
        message = 'Fehlerhafte Parameter';
        break;
      case 'auth/invalid-api-key':
        message = 'Der API-Key ist abgelaufen';
        break;
      case 'auth/invalid-user-token':
        message = 'Ungültiger Token';
        break;
      case 'auth/network-request-failed':
        message = 'Netzwerkfehler';
        break;
      case 'auth/operation-not-allowed':
        message = 'Aktion ist nicht erlaubt';
        break;
      case 'auth/requires-recent-login':
        message = 'Benötige Login';
        break;
      case 'auth/too-many-requests':
        message = 'Zu viele Anfragen';
        break;
      case 'auth/unauthorized-domain':
        message = 'Ungültige Domain';
        break;
      case 'auth/user-disabled':
        message = 'Nutzer wurde deaktiviert';
        break;
      case 'auth/user-token-expired':
        message = 'Token abgelaufen';
        break;
      case 'auth/web-storage-unsupported':
        message = 'Web-Storage wird nicht unterstützt';
        break;
      case 'auth/user-mismatch':
        message = 'Ungültiger Nutzer';
        break;
      case 'auth/user-not-found':
        message = 'Nutzer wurde nicht gefunden';
        break;
      case 'auth/invalid-credential':
        message = 'Ungültige Anmeldedaten';
        break;
      case 'auth/invalid-email':
        message = 'Ungültige E-Mail-Adresse';
        break;
      case 'auth/wrong-password':
        message = 'Ungültiges Passwort';
        break;
      case 'auth/invalid-verification-code':
        message = 'Ungültiger Verifizierungs-Code';
        break;
      case 'auth/invalid-verification-id':
        message = 'Ungültige Verifizierungs-ID';
        break;
      case 'auth/weak-password':
        message = 'Schwaches Passwort';
        break;
      case 'auth/email-already-in-use':
        message = 'Email Adresse wird bereits verwendet';
        break;
      default:
        message = value;
        break;
    }
    return message;
  }
}
