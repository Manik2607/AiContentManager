import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";


export default function Nav() {
  interface UserDetails {
    email: string;
    name: string;
  }

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails({
            email: docSnap.data().email,
            name: docSnap.data().name,
          });
          console.log("userDetails");
          console.log(userDetails);
        } else {
          console.log("No such document!");
        }
      }
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <nav className="bg-secondary">
        <div className="mx-auto px-28">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <h1 className="text-pretty text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse">
                CMS
              </h1>
              <div className="grow"></div>
              {userDetails ? (
                <h1>
                  Hi, {userDetails.name}
                </h1>
              ) : (
                <a href="/login" className="flex text-blue-500">
                  Login
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
