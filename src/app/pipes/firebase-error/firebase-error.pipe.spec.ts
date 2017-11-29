import { FirebaseErrorPipe } from './firebase-error.pipe';

describe('FirebaseErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new FirebaseErrorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform error messages', () => {
    const pipe = new FirebaseErrorPipe();
    expect(pipe.transform('auth/app-deleted')).toBe(
      'Die Anwendung ist nicht mehr verfügbar'
    );
    expect(pipe.transform('auth/app-not-authorized')).toBe(
      'Die Anwendung ist nicht autorisiert'
    );
    expect(pipe.transform('auth/argument-error')).toBe('Fehlerhafte Parameter');
    expect(pipe.transform('auth/invalid-api-key')).toBe(
      'Der API-Key ist abgelaufen'
    );
    expect(pipe.transform('auth/invalid-user-token')).toBe('Ungültiger Token');
    expect(pipe.transform('auth/network-request-failed')).toBe(
      'Netzwerkfehler'
    );
    expect(pipe.transform('auth/operation-not-allowed')).toBe(
      'Aktion ist nicht erlaubt'
    );
    expect(pipe.transform('auth/requires-recent-login')).toBe('Benötige Login');
    expect(pipe.transform('auth/too-many-requests')).toBe('Zu viele Anfragen');
    expect(pipe.transform('auth/unauthorized-domain')).toBe('Ungültige Domain');
    expect(pipe.transform('auth/user-disabled')).toBe(
      'Nutzer wurde deaktiviert'
    );
    expect(pipe.transform('auth/user-token-expired')).toBe('Token abgelaufen');
    expect(pipe.transform('auth/web-storage-unsupported')).toBe(
      'Web-Storage wird nicht unterstützt'
    );
    expect(pipe.transform('auth/user-mismatch')).toBe('Ungültiger Nutzer');
    expect(pipe.transform('auth/user-not-found')).toBe(
      'Nutzer wurde nicht gefunden'
    );
    expect(pipe.transform('auth/invalid-credential')).toBe(
      'Ungültige Anmeldedaten'
    );
    expect(pipe.transform('auth/invalid-email')).toBe(
      'Ungültige E-Mail-Adresse'
    );
    expect(pipe.transform('auth/wrong-password')).toBe('Ungültiges Passwort');
    expect(pipe.transform('auth/invalid-verification-code')).toBe(
      'Ungültiger Verifizierungs-Code'
    );
    expect(pipe.transform('auth/invalid-verification-id')).toBe(
      'Ungültige Verifizierungs-ID'
    );
    expect(pipe.transform('auth/weak-password')).toBe('Schwaches Passwort');
    expect(pipe.transform('auth/email-already-in-use')).toBe(
      'Email Adresse wird bereits verwendet'
    );
    expect(pipe.transform('error')).toBe('error');
  });
});
