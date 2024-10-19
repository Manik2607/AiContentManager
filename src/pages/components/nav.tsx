import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";


export default function Nav() {
  const logout = () => {
    auth.signOut().then(() => {
      window.location.href = "/login" ;
    });
  };
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
                <div className="flex items-center justify-center">
                  <Popover>
                    <PopoverTrigger>
                      <h1 className="text-pretty text-lg text-white font-extrabold ">
                        Hi, {userDetails.name}
                      </h1>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col p-2 bg-card rounded-xl p-5">
                        <h1 className="text-pretty  text-white ">
                          {userDetails.name}
                        </h1>
                        <h1 className="text-pretty  text-white ">
                          {userDetails.email}
                        </h1>
                        <div className="h-6"></div>
                        <Button onClick={logout}>Logout</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <Button
                  className="text-pretty text-lg text-white font-extrabold  bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
