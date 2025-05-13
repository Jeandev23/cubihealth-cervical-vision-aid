
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-purple-900 overflow-hidden">
      {/* Starry background effect */}
      <div className="absolute inset-0 z-0">
        <div className="stars"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 py-6">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <div className="flex-1">
            {/* Left side empty to match the reference */}
          </div>
          
          <div className="flex-1 flex justify-center">
            <span className="font-bold text-2xl md:text-3xl tracking-widest text-white uppercase">
              CUBIHEALTH
            </span>
          </div>
          
          <div className="flex-1 flex items-center justify-end space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="text-white hover:bg-white/10"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white/10"
              onClick={() => navigate("/patient/login")}
            >
              LOGIN
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 h-[calc(100vh-80px)] flex flex-col items-center justify-center">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-left md:pr-16">
            <div className="mb-4">
              <span className="inline-block text-white bg-cubiPurple/50 px-4 py-1 mb-4 rounded-full text-sm">FROM RISK TO CARE</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tighter">
              Limitless
              <br />
              <span className="font-light">begins here.</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
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
                className="border-white text-white hover:bg-white/10"
              >
                I'm a Doctor
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-cubiPurple to-cubiPink rounded-full blur-2xl opacity-20 absolute"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 relative z-10">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-cubiPurple to-cubiPink flex items-center justify-center p-6">
                  <div className="text-white text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">AI-Powered Analysis</h2>
                    <p className="text-sm">Early detection and personalized risk assessment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Journey callout (right side) */}
        <div className="absolute bottom-20 right-8 text-white">
          <p className="mb-2">Journey into the <em className="italic">advanced</em></p>
          <p className="font-light">world of CubiHealth®</p>
          
          <Button 
            variant="ghost" 
            className="text-white mt-4 flex items-center"
            onClick={() => {
              // Smooth scroll to features section
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            SCROLL TO BEGIN
            <div className="ml-2 w-8 h-8 rounded-full border border-white flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1V11M6 11L11 6M6 11L1 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6 lg:px-16 bg-black/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            How CubiHealth Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <footer className="relative z-10 py-8 px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} CubiHealth. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default LandingPage;
