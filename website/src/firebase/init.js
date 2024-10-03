import { initializeApp } from 'firebase/app'

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDh5N8DPg99pLZUiJL63w5XC4YCEGa-N84',
  authDomain: 'communitycare-5ca3a.firebaseapp.com',
  projectId: 'communitycare-5ca3a',
  storageBucket: 'communitycare-5ca3a.appspot.com',
  messagingSenderId: '772383040794',
  appId: '1:772383040794:web:ab7fcacce0e038a99678a3'
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
export default db
