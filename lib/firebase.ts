import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Valeurs de repli pour permettre le build/SSR sans configuration Firebase ;
// l'authentification réelle nécessite les variables NEXT_PUBLIC_FIREBASE_* en production.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id",
};

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
