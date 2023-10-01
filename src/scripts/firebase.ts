import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: 'montamp-be910.firebaseapp.com',
  projectId: 'montamp-be910',
  storageBucket: 'montamp-be910.appspot.com',
  messagingSenderId: '521151855932',
  appId: '1:521151855932:web:1d696c63985128b911f239',
  measurementId: 'G-8NKXTW18Z3',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);
