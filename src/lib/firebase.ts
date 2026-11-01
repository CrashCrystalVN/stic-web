import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDataConnect, connectDataConnectEmulator } from "firebase/data-connect";
import { connectorConfig } from "@dataconnect/generated";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyMockKeyForDevOnly_stic_web_gen1",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "stic-a2244.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "stic-a2244",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "stic-a2244.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789012:web:mockappidsticwebgen1",
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const dataConnect = getDataConnect(app, connectorConfig);

// Connect to local Data Connect emulator on port 50001 when in dev mode
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  try {
    connectDataConnectEmulator(dataConnect, "localhost", 50001);
  } catch {
    // Emulator connection already established or inactive
  }
}
