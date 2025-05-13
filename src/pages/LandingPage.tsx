
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-cubiPurple flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight bg-gradient-to-r from-cubiPurple to-cubiPink bg-clip-text text-transparent">
              CubiHealth
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 py-12 bg-gradient-to-br from-background to-muted">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Early Detection{" "}
            <span className="text-cubiPurple">Saves Lives</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            CubiHealth uses AI-powered technology for early detection, risk analysis, 
            and post-diagnosis support for cervical cancer. Connecting patients and 
            doctors for better healthcare outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              variant="default" 
              size="lg" 
              onClick={() => navigate("/patient/login")}
              className="bg-cubiPurple hover:bg-cubiPurple-dark text-white"
            >
              I'm a Patient
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/doctor/login")}
              className="border-cubiPurple text-cubiPurple hover:bg-cubiPurple/10"
            >
              I'm a Doctor
            </Button>
          </div>
        </div>
        <div className="flex-1 bg-cubiPurple/10 flex items-center justify-center p-8 hidden md:flex">
          <div className="relative w-full max-w-md aspect-square">
            <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-cubiPurple to-cubiPink flex items-center justify-center">
              <div className="text-white text-center p-8">
                <h2 className="text-2xl font-bold mb-4">AI-Powered Analysis</h2>
                <p>Advanced computer vision models for early detection and personalized risk assessment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 lg:px-16 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How CubiHealth Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Risk Analysis"
              description="Personalized risk assessment based on your health profile and family history."
            />
            <FeatureCard
              title="Medical Tracking"
              description="Monitor your health metrics, menstrual cycle, and symptoms in one place."
            />
            <FeatureCard
              title="Doctor Connection"
              description="Direct communication with healthcare professionals specializing in women's health."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CubiHealth. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300 animate-fade-in">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default LandingPage;
