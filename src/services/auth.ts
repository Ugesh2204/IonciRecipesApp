import firebase from 'firebase';
export class AuthService {
    /** sign up method*/
    signup(email: string, password: string) {
        //send the request
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
}