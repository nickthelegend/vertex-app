    // Import the functions you need from the SDKs you need
    import { initializeApp } from 'firebase/app';
    import { getAnalytics } from "firebase/analytics";
    import { getFirestore } from "firebase/firestore";
    import { getAuth } from "firebase/auth"

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyB056tMKN588natkE09N_5BAHuTp-0IXWw",
        authDomain: "rnvertexapp.firebaseapp.com",
        projectId: "rnvertexapp",
        storageBucket: "rnvertexapp.appspot.com",
        messagingSenderId: "633150595201",
        appId: "1:633150595201:web:4012a7e7b0260fd9caad80",
        measurementId: "G-HB0M1FTYLK"
      };
      
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db= getFirestore(app)
    const auth = getAuth(app)
    export {db,app,auth,analytics}