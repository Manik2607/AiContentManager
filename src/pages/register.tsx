import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(false); // Set to false initially
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();
  const {toast} = useToast();

  

 // Password validation: at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character (any special character)
const validatePassword = (password: string) => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  return passwordPattern.test(password);
};

  // Handle registration logic
  const handleRegister = async (e: any) => {
    e.preventDefault();

    // Validate email
    setValidEmail(validateEmail(email));

    // Check if passwords match
    setPasswordMatch(password === confirmPassword);

    // Do not proceed if validation fails
    if (!validEmail || !validPassword || !passwordMatch) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
      });

      console.log("User registered:", user);
      navigate("/");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast({
          variant: "destructive",
          title: "ERROR:",
          description: "Email is already in use. Please use a different email or log in.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "ERROR:",
          description: error.message,
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full flex-grow">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Register</CardTitle>
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidEmail(validateEmail(e.target.value));
                }}
                required
              />
              {!validEmail && <p className="text-red-500">Please enter a valid email address.</p>}
            </div>
            <div className="mb-4">
              <label>Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setValidPassword(validatePassword(e.target.value));
                }}
                required
              />
              {!validPassword && (
                <p className="text-red-500">
                  Password must be at least 8 characters, contain 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.
                </p>
              )}
              {validPassword && (
                <p className="text-green-500">Password is valid!</p>
              )}
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
              {!passwordMatch && <p className="text-red-500">Passwords do not match.</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button type="submit" onClick={handleRegister} className="bg-primary w-28">
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
