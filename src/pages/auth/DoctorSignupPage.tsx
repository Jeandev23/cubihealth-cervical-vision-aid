
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const DoctorSignupPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();

  // Basic information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [specialization, setSpecialization] = useState("");

  // Professional information
  const [licenseNumber, setLicenseNumber] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [hospitalAffiliation, setHospitalAffiliation] = useState("");
  const [education, setEducation] = useState("");
  const [bio, setBio] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const validateStep1 = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all fields",
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password mismatch",
        description: "Passwords do not match",
      });
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (!licenseNumber || !yearsOfExperience || !specialization) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide your professional credentials",
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    
    setStep(step + 1);
    setProgress(step === 1 ? 66 : 100);
  };

  const handleBack = () => {
    setStep(step - 1);
    setProgress(step === 2 ? 33 : 66);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, you would send all doctor information to your backend
      await signup(email, password, fullName, "doctor");
      
      toast({
        title: "Account created!",
        description: "Welcome to CubiHealth",
      });
      
      navigate("/doctor/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "There was an error creating your account",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-background to-muted">
      <Link to="/" className="mb-6 flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-cubiPurple flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-cubiPurple to-cubiPink bg-clip-text text-transparent">
          CubiHealth
        </span>
      </Link>
      
      <Card className="w-full max-w-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create Doctor Account
          </CardTitle>
          <CardDescription className="text-center">
            Step {step} of 3: {
              step === 1 ? "Basic Information" :
              step === 2 ? "Professional Details" :
              "Review & Confirm"
            }
          </CardDescription>
          <Progress value={progress} className="h-2 mt-2" />
        </CardHeader>
        
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Dr. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Select value={specialization} onValueChange={setSpecialization}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gynecology">Gynecology</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                    <SelectItem value="gynecologic-oncology">Gynecologic Oncology</SelectItem>
                    <SelectItem value="general-practitioner">General Practitioner</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Medical License Number</Label>
                <Input
                  id="licenseNumber"
                  placeholder="e.g., MD12345678"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  type="number"
                  min="0"
                  placeholder="e.g., 10"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hospitalAffiliation">Hospital Affiliation</Label>
                <Input
                  id="hospitalAffiliation"
                  placeholder="e.g., University Medical Center"
                  value={hospitalAffiliation}
                  onChange={(e) => setHospitalAffiliation(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  placeholder="e.g., MD, Harvard Medical School"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Brief professional introduction"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Review Your Information</h3>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">{fullName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Specialization</p>
                      <p className="text-sm text-muted-foreground capitalize">{specialization}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">License Number</p>
                      <p className="text-sm text-muted-foreground">{licenseNumber}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Years of Experience</p>
                      <p className="text-sm text-muted-foreground">{yearsOfExperience}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Hospital Affiliation</p>
                      <p className="text-sm text-muted-foreground">{hospitalAffiliation || "None provided"}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium">Education</p>
                    <p className="text-sm text-muted-foreground">{education || "None provided"}</p>
                  </div>
                  
                  {bio && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">Bio</p>
                      <p className="text-sm text-muted-foreground">{bio}</p>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  By completing your registration, you agree to our Terms of Service and Privacy Policy. 
                  Your professional credentials may be subject to verification.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack} disabled={isLoading}>
              Back
            </Button>
          ) : (
            <Link to="/doctor/login">
              <Button variant="outline">I have an account</Button>
            </Link>
          )}
          
          {step < 3 ? (
            <Button onClick={handleNext} className="bg-cubiPurple hover:bg-cubiPurple-dark">
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading} className="bg-cubiPurple hover:bg-cubiPurple-dark">
              {isLoading ? "Creating Account..." : "Complete Signup"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default DoctorSignupPage;
