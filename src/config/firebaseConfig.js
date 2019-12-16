import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAuw8fddKfPVhytSp58c1O2KQoVv7cR3TI",
    authDomain: "mujkiteniski.firebaseapp.com",
    databaseURL: "https://mujkiteniski.firebaseio.com",
    projectId: "mujkiteniski",
    storageBucket: "mujkiteniski.appspot.com",
    messagingSenderId: "1075248186549",
    appId: "1:1075248186549:web:989e912c21cdabc43baafc",
    measurementId: "G-8TL4C618YB"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
firebase.firestore().settings({})

export default firebase;