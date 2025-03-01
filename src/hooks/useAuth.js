"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await getIdToken(firebaseUser);
        
        // Send token to API for session management
        await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ idToken }),
        });

        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
