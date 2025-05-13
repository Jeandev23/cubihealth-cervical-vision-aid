
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

import LandingPage from "./pages/LandingPage";
import PatientLoginPage from "./pages/auth/PatientLoginPage";
import PatientSignupPage from "./pages/auth/PatientSignupPage";
import DoctorLoginPage from "./pages/auth/DoctorLoginPage";
import DoctorSignupPage from "./pages/auth/DoctorSignupPage";
import PatientDashboard from "./pages/patient/Dashboard";
import DoctorDashboard from "./pages/doctor/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              
              {/* Patient Routes */}
              <Route path="/patient/login" element={<PatientLoginPage />} />
              <Route path="/patient/signup" element={<PatientSignupPage />} />
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
              
              {/* Doctor Routes */}
              <Route path="/doctor/login" element={<DoctorLoginPage />} />
              <Route path="/doctor/signup" element={<DoctorSignupPage />} />
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
