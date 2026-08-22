import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY ?? import.meta.env.VITE_apiKey ?? "",
  authDomain:
    import.meta.env.VITE_AUTH_DOMAIN ?? import.meta.env.VITE_authDomain ?? "",
  projectId:
    import.meta.env.VITE_PROJECT_ID ?? import.meta.env.VITE_projectId ?? "",
  storageBucket:
    import.meta.env.VITE_STORAGE_BUCKET ??
    import.meta.env.VITE_storageBucket ??
    "",
  messagingSenderId:
    import.meta.env.VITE_MESSAGING_SENDER_ID ??
    import.meta.env.VITE_messagingSenderId ??
    "",
  appId: import.meta.env.VITE_APP_ID ?? import.meta.env.VITE_appId ?? "",
  measurementId:
    import.meta.env.VITE_MEASUREMENT_ID ??
    import.meta.env.VITE_measurementId ??
    "",
};

if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.projectId ||
  !firebaseConfig.appId
) {
  console.warn(
    "Firebase config is incomplete. Check client/.env.local for VITE_* values.",
  );
}

const app = initializeApp(firebaseConfig);

export default app;
