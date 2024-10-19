import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const logout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  interface UserDetails {
    email: string;
    name: string;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails({
            email: docSnap.data().email,
            name: docSnap.data().name,
          });
        } else {
          console.log("No such document!");
        }
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full flex-grow p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Content Management System</h1>
      {userDetails ? (
        <div className="text-center">
          <h2 className="text-xl mb-2">Hi, {userDetails.name}!</h2>
          <p className="mb-4">You are logged in with {userDetails.email}</p>
          <Button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </Button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default Home;