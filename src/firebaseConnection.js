import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBCRn7CGEa4wH82AzrWQFW46PvBod_M4Eo",
    authDomain: "curso-react-76239.firebaseapp.com",
    projectId: "curso-react-76239",
    storageBucket: "curso-react-76239.appspot.com",
    messagingSenderId: "757035121574",
    appId: "1:757035121574:web:b7d6c41832a13fb68fed67",
    measurementId: "G-7FTCQR04WZ"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };