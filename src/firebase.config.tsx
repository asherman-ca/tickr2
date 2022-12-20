// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAUGyyjUUQmi4AuuDSaf43TiefJ0ylsrWY',
	authDomain: 'tickr2.firebaseapp.com',
	projectId: 'tickr2',
	storageBucket: 'tickr2.appspot.com',
	messagingSenderId: '914827473528',
	appId: '1:914827473528:web:cd638389c271bdba08b38d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);

export default app;
