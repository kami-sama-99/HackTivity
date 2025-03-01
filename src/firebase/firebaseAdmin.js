import admin from "firebase-admin";
import { getApps, getApp } from "firebase-admin/app";

// Load service account credentials
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK || "{}");

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth };
