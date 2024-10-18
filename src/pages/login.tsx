import { useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please provide both email and password.");
      return;
    }

    try {
      console.log("Attempting login with email:", email);
      console.log("Password entered:", password);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in:", user);
      navigate("/");

    } catch (error: any) {
      console.error("Error during sign in:", error);

      switch (error.code) {
        case "auth/user-not-found":
          alert("No user found with this email.");
          break;
        case "auth/wrong-password":
          alert("Incorrect password.");
          break;
        case "auth/invalid-email":
          alert("Invalid email format.");
          break;
        default:
          alert("Login failed. " + error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Email:</label>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                className="w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password:</label>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                className="w-full"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button onClick={handleSubmit} className="bg-primary w-28">
            Login
          </Button>
          <Link className="text-blue-500" to="/register">
            Register now
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
