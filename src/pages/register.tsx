import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password doesn't match. Please try again.");
      return;
    }

    try {
      // Create a new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
      });

      console.log("User registered:", user);
      // window.location.href = "/";
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert(
          "Email is already in use. Please use a different email or log in."
        );
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label>Name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label>Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label>Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label>Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button
            onClick={handleRegister}
            className="bg-primary w-28" 
          >
            Register
          </Button>
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
