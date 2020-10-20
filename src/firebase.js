import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDHm5eaWKXgbYb04kmU1LCnkEUB6eujbo8",
    authDomain: "whatsapp-clone-37ef2.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-37ef2.firebaseio.com",
    projectId: "whatsapp-clone-37ef2",
    storageBucket: "whatsapp-clone-37ef2.appspot.com",
    messagingSenderId: "932202355066",
    appId: "1:932202355066:web:cf9259a548c076b5899ec3",
    measurementId: "G-H94RF2JDT3"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider}
export default db