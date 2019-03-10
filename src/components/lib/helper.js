import * as firebase from 'firebase';
import { firebaseApp, userProfileRef } from './firebase';
import { checkExistingUser } from './Service';

export const createNewUserWithGoogle = () => {
  const provider =  new firebase.auth.GoogleAuthProvider()
  firebaseApp.auth().signInWithPopup(provider)
   .then(async user => {
     const user_id = user.user.uid
     localStorage.setItem("current_user_id", user_id);
     const isExistUser = await checkExistingUser(user_id)
     if (false === isExistUser) {
       userProfileRef.ref('/users/' + user_id).set({
         email: user.user.email,
         fullname : user.user.displayName,
         username: user.user.displayName,
         user_id,
         avatar_src: user.user.photoURL
      });
    }
   })
   .catch(error => {
     console.log(error)
   });
}