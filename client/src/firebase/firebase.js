import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseconfig = {
    apiKey: "AIzaSyCtaQ80vkznaVKcM3eY5PMK7MttghnLJU4",
    authDomain: "e-commerce-34476.firebaseapp.com",
    projectId: "e-commerce-34476",
    storageBucket: "e-commerce-34476.appspot.com",
    messagingSenderId: "462683008232",
    appId: "1:462683008232:web:71fb83c7ff00258d942d5d",
    measurementId: "G-J4WS3L1771"
}

const app = initializeApp(firebaseconfig);
const storage = getStorage(app);

export { storage };