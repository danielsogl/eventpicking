import { FirebaseErrorPipe } from './firebase-error.pipe';

describe('FirebaseErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new FirebaseErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
