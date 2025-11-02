// src/pages/Auth.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  doc,
  setDoc,
  signInWithGoogle,
  sendPasswordResetEmail, // <-- Import the new function
} from "../firebase.js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";

// --- Google SVG Icon ---
const GoogleIcon = (props) => (
  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" {...props}>
    {/* ... (Google SVG paths) ... */}
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

// Define the possible views
type AuthView = "login" | "signup" | "forgot";

export default function Auth() {
  const [view, setView] = useState<AuthView>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // For success messages
  const navigate = useNavigate();

  // --- Dynamic Title and Description ---
  const getTitle = () => {
    switch (view) {
      case "login":
        return "Welcome back";
      case "signup":
        return "Create an account";
      case "forgot":
        return "Reset your password";
    }
  };

  const getDescription = () => {
    switch (view) {
      case "login":
        return "Please enter your details.";
      case "signup":
        return "Enter your details to get started.";
      case "forgot":
        return "Enter your email to get a reset link.";
    }
  };

  // --- Main Submit Logic ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (view === "login") {
      // --- LOGIN LOGIC ---
      if (!email || !password) return setError("Please enter email and password.");
      try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("mindease_student_auth", "true");
        navigate("/");
      } catch (err) {
        setError("Invalid email or password.");
      }
    } else if (view === "signup") {
      // --- SIGN UP LOGIC ---
      if (!name || !email || !password || !confirmPassword)
        return setError("Please fill in all fields");
      if (password !== confirmPassword)
        return setError("Passwords do not match");

      try {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCred.user;
        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          createdAt: new Date().toISOString(),
        });
        await updateProfile(user, { displayName: name });
        setSuccess("Account created! Please log in.");
        setView("login"); // Switch to login view
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          setError("This email is already in use.");
        } else if (err.code === "auth/weak-password") {
          setError("Password must be at least 6 characters.");
        } else {
          setError("Failed to create account.");
        }
      }
    } else if (view === "forgot") {
      // --- FORGOT PASSWORD LOGIC ---
      if (!email) return setError("Please enter your email.");
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccess("Password reset link sent! Check your email.");
      } catch (err) {
        setError("Failed to send reset email. Please try again.");
      }
    }
  };

  // --- Google Sign-in Logic ---
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      localStorage.setItem("mindease_student_auth", "true");
      navigate("/");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  // --- Helper to clear state on view change ---
  const changeView = (newView: AuthView) => {
    setView(newView);
    setError("");
    setSuccess("");
    setEmail(newView === "forgot" ? email : ""); // Keep email if going to forgot
    setPassword("");
    setConfirmPassword("");
    setName("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600">
            <Lock className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-semibold">{getTitle()}</CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* --- SIGNUP: Name --- */}
            {view === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {/* --- ALL VIEWS: Email --- */}
            {view !== "login" || (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            {view !== "signup" || (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            {view !== "forgot" || (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}

            {/* --- LOGIN & SIGNUP: Password --- */}
            {(view === "login" || view === "signup") && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {/* --- SIGNUP: Confirm Password --- */}
            {view === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {/* --- LOGIN: Remember Me & Forgot --- */}
            {view === "login" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked)}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal text-muted-foreground cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={() => changeView("forgot")}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* --- ERROR & SUCCESS MESSAGES --- */}
            {error && (
              <p className="text-sm font-medium text-destructive text-center">
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm font-medium text-green-600 text-center">
                {success}
              </p>
            )}

            {/* --- SUBMIT BUTTON --- */}
            <Button type="submit" className="w-full">
              {view === "login" && "Sign in"}
              {view === "signup" && "Sign up"}
              {view === "forgot" && "Send Reset Link"}
            </Button>

            {/* --- GOOGLE BUTTON (Login/Signup only) --- */}
            {(view === "login" || view === "signup") && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
              >
                <GoogleIcon />
                Sign {view === "login" ? "in" : "up"} with Google
              </Button>
            )}
          </form>

          {/* --- TOGGLE LINKS --- */}
          <div className="mt-4 text-center text-sm">
            {/* Back to Login (from Forgot) */}
            {view === "forgot" && (
              <>
                <span className="text-muted-foreground">
                  Remember your password?{" "}
                </span>
                <button
                  type="button"
                  onClick={() => changeView("login")}
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </button>
              </>
            )}

            {/* Toggle Login/Signup */}
            {view !== "forgot" && (
              <>
                <span className="text-muted-foreground">
                  {view === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    changeView(view === "login" ? "signup" : "login")
                  }
                  className="font-medium text-primary hover:underline"
                >
                  {view === "login" ? "Sign up" : "Sign in"}
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}