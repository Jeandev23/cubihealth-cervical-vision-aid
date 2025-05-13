
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const DoctorLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password, "doctor");
      toast({
        title: "Login successful",
        description: "Welcome back to CubiHealth!",
      });
      navigate("/doctor/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-background to-muted">
      <Link to="/" className="mb-8 flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-cubiPurple flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-cubiPurple to-cubiPink bg-clip-text text-transparent">
          CubiHealth
        </span>
      </Link>

      <div className="w-full max-w-md p-6 bg-card border border-border rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Doctor Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/doctor/reset-password"
                className="text-sm font-medium text-cubiPurple hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-cubiPurple hover:bg-cubiPurple-dark"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/doctor/signup"
              className="text-cubiPurple hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Are you a patient?{" "}
        <Link to="/patient/login" className="text-cubiPurple hover:underline">
          Patient Login
        </Link>
      </p>
    </div>
  );
};

export default DoctorLoginPage;
