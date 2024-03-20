import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import mystore from './redux/store/store';
import firebase from "firebase/compat/app"


const firebaseConfig = {
  apiKey: "AIzaSyAuW8FZmzR9hhWlE0SJEIMUJBuRaBuih6g",
  authDomain: "lms-project-f4120.firebaseapp.com",
  projectId: "lms-project-f4120",
  storageBucket: "lms-project-f4120.appspot.com",
  messagingSenderId: "364059640876",
  appId: "1:364059640876:web:56e94ff495b75472da3d89",
  measurementId: "G-27NDL3DDE7"
};
firebase.initializeApp(firebaseConfig)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={mystore}>
      <App />
    </Provider>
  </React.StrictMode>
);

