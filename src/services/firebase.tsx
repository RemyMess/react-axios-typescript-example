// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, query, where, addDoc, getDoc, getDocs, setDoc, doc, updateDoc, increment, FieldValue} from 'firebase/firestore';

import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDli5kHgPfV6GOhPIfkX5p0_dep7T4MW6k",
  authDomain: "habitopia-nyr-registrations.firebaseapp.com",
  projectId: "habitopia-nyr-registrations",
  storageBucket: "habitopia-nyr-registrations.appspot.com",
  messagingSenderId: "638139052728",
  appId: "1:638139052728:web:418ecd62dd9866493dba4d",
  measurementId: "G-CBXV3SX9XR"

};


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const firebaseDb = getFirestore(firebase);
const analytics = getAnalytics(firebase);


const getTokenFromEmail = (email: string) => {
    
}

const getEmailFromToken = (token: string) => {

}

// const docSnap = getDoc(docRef);
// console.log("yo2")
// if (!(docSnap.exists())) {
//     setDoc(doc(firebaseDb, "referrals"), {
//         email: email,
//     });
// }



// const getReferralTokenFromEmail = {
// }


const EmailService = {
    register: async (email: string) => {
        console.log("inside register")

        // check if data exists
        let email_id = ""
        const q = query(collection(firebaseDb, "registrations"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        
        let queryExists = false
        querySnapshot.forEach((doc) => {
            queryExists = true
            email_id = doc.id
        });
        console.log("exists?", queryExists )

        if (!(queryExists)) {
            await addDoc(collection(firebaseDb, "registrations"), {
                email: email,
                n_referral: 0
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                email_id = docRef.id
            });
        }
    



        return await email_id
    },

    incrementReferral: async (referral_id: string) => {
        // check if data exists
        const docRef = doc(firebaseDb, "registrations", referral_id);
        const docSnap = await getDoc(docRef);

        // increase referral cout
        if (docSnap.exists()) {
            const refereeRef = doc(firebaseDb, "registrations", referral_id);
            await updateDoc(refereeRef, {
                n_referral: increment(1)
            }
            )
        }
    },

    getNumberReferrals: async (id: string) => {
        let n_referral = 0

        // check if data exists
        console.log("check1", id)

        const docRef = doc(firebaseDb, "registrations", id);
        const docSnap = await getDoc(docRef);

        // increase referral cout
        if (docSnap.exists()) {
            n_referral = docSnap.data().n_referral
        }

        return n_referral
    }
}

export {EmailService}