
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

const PatientSignupPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();

  // Basic information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Health information
  const [smoking, setSmoking] = useState<string | null>(null);
  const [contraceptives, setContraceptives] = useState<string | null>(null);
  const [contraceptiveType, setContraceptiveType] = useState("");
  const [contraceptiveDuration, setContraceptiveDuration] = useState("");
  const [hasChildren, setHasChildren] = useState<string | null>(null);
  const [childrenCount, setChildrenCount] = useState("");
  const [birthAge, setBirthAge] = useState("");
  const [hasHpv, setHasHpv] = useState<string | null>(null);
  const [hasCancer, setHasCancer] = useState<string | null>(null);
  const [cancerTypes, setCancerTypes] = useState("");
  const [hasUti, setHasUti] = useState<string | null>(null);
  const [utiTypes, setUtiTypes] = useState("");
  const [hasStds, setHasStds] = useState<string | null>(null);
  const [stdTypes, setStdTypes] = useState("");
  const [hasFamilyCancerHistory, setHasFamilyCancerHistory] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const validateStep1 = () => {
    if (!fullName || !email || !password || !confirmPassword || !dateOfBirth) {
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
    if (smoking === null) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please indicate if you smoke",
      });
      return false;
    }

    if (contraceptives === null) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please indicate if you use contraceptives",
      });
      return false;
    }

    if (contraceptives === "yes" && (!contraceptiveType || !contraceptiveDuration)) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide contraceptive details",
      });
      return false;
    }

    if (hasChildren === null) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please indicate if you have children",
      });
      return false;
    }

    if (hasChildren === "yes" && (!childrenCount || !birthAge)) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide children details",
      });
      return false;
    }

    return true;
  };

  const validateStep3 = () => {
    if (
      hasHpv === null ||
      hasCancer === null ||
      hasUti === null ||
      hasStds === null ||
      hasFamilyCancerHistory === null
    ) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please answer all health questions",
      });
      return false;
    }

    if (hasCancer === "yes" && !cancerTypes) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please specify cancer types",
      });
      return false;
    }

    if (hasUti === "yes" && !utiTypes) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please specify UTI types",
      });
      return false;
    }

    if (hasStds === "yes" && !stdTypes) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please specify STD types",
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    
    setStep(step + 1);
    setProgress(progress + 25);
  };

  const handleBack = () => {
    setStep(step - 1);
    setProgress(progress - 25);
  };

  const calculateRiskScore = (): number => {
    let score = 0;
    
    // Smoking increases risk
    if (smoking === "yes") score += 10;
    
    // HPV is a major risk factor
    if (hasHpv === "yes") score += 30;
    
    // Previous cancer history increases risk
    if (hasCancer === "yes") score += 20;
    
    // STDs can increase risk
    if (hasStds === "yes") score += 15;
    
    // Family history of cancer increases risk
    if (hasFamilyCancerHistory === "yes") score += 15;
    
    // Long-term contraceptive use can affect risk
    if (contraceptives === "yes" && parseInt(contraceptiveDuration) > 5) score += 5;
    
    // Normalize score to 0-100 range
    return Math.min(Math.max(score, 0), 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep3()) return;
    
    setIsLoading(true);

    try {
      // Calculate risk score
      const riskScore = calculateRiskScore();
      
      // In a real application, you would send all this data to your backend
      await signup(email, password, fullName, "patient");
      
      toast({
        title: "Account created!",
        description: "Welcome to CubiHealth",
      });
      
      // Store the risk score in local storage for demo purposes
      localStorage.setItem("patientRiskScore", riskScore.toString());
      
      navigate("/patient/dashboard");
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
            Create Patient Account
          </CardTitle>
          <CardDescription className="text-center">
            Step {step} of 4: {
              step === 1 ? "Basic Information" :
              step === 2 ? "Lifestyle Factors" :
              step === 3 ? "Medical History" :
              "Risk Assessment"
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
                  placeholder="Enter your full name"
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
                  placeholder="name@example.com"
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
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Do you smoke?</Label>
                <RadioGroup
                  value={smoking || ""}
                  onValueChange={setSmoking}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="smoke-yes" />
                    <Label htmlFor="smoke-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="smoke-no" />
                    <Label htmlFor="smoke-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Do you use contraceptives?</Label>
                <RadioGroup
                  value={contraceptives || ""}
                  onValueChange={(value) => {
                    setContraceptives(value);
                    if (value === "no") {
                      setContraceptiveType("");
                      setContraceptiveDuration("");
                    }
                  }}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="contra-yes" />
                    <Label htmlFor="contra-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="contra-no" />
                    <Label htmlFor="contra-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {contraceptives === "yes" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contraType">Type of Contraceptive</Label>
                    <Input
                      id="contraType"
                      placeholder="e.g., Pill, IUD, etc."
                      value={contraceptiveType}
                      onChange={(e) => setContraceptiveType(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contraDuration">Years of Use</Label>
                    <Input
                      id="contraDuration"
                      type="number"
                      min="0"
                      placeholder="Years"
                      value={contraceptiveDuration}
                      onChange={(e) => setContraceptiveDuration(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <Label>Do you have children?</Label>
                <RadioGroup
                  value={hasChildren || ""}
                  onValueChange={(value) => {
                    setHasChildren(value);
                    if (value === "no") {
                      setChildrenCount("");
                      setBirthAge("");
                    }
                  }}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="children-yes" />
                    <Label htmlFor="children-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="children-no" />
                    <Label htmlFor="children-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {hasChildren === "yes" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="childCount">Number of Children</Label>
                    <Input
                      id="childCount"
                      type="number"
                      min="1"
                      placeholder="Count"
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birthAge">Age at First Birth</Label>
                    <Input
                      id="birthAge"
                      type="number"
                      min="10"
                      max="70"
                      placeholder="Age"
                      value={birthAge}
                      onChange={(e) => setBirthAge(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Do you have HPV?</Label>
                <RadioGroup
                  value={hasHpv || ""}
                  onValueChange={setHasHpv}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="hpv-yes" />
                    <Label htmlFor="hpv-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hpv-no" />
                    <Label htmlFor="hpv-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Have you ever had cancer?</Label>
                <RadioGroup
                  value={hasCancer || ""}
                  onValueChange={(value) => {
                    setHasCancer(value);
                    if (value === "no") setCancerTypes("");
                  }}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="cancer-yes" />
                    <Label htmlFor="cancer-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cancer-no" />
                    <Label htmlFor="cancer-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {hasCancer === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="cancerTypes">Which cancer types?</Label>
                  <Input
                    id="cancerTypes"
                    placeholder="Please specify"
                    value={cancerTypes}
                    onChange={(e) => setCancerTypes(e.target.value)}
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <Label>Do you have a history of UTIs?</Label>
                <RadioGroup
                  value={hasUti || ""}
                  onValueChange={(value) => {
                    setHasUti(value);
                    if (value === "no") setUtiTypes("");
                  }}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="uti-yes" />
                    <Label htmlFor="uti-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="uti-no" />
                    <Label htmlFor="uti-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {hasUti === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="utiTypes">Which UTI types?</Label>
                  <Input
                    id="utiTypes"
                    placeholder="Please specify"
                    value={utiTypes}
                    onChange={(e) => setUtiTypes(e.target.value)}
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <Label>Do you have a history of STDs?</Label>
                <RadioGroup
                  value={hasStds || ""}
                  onValueChange={(value) => {
                    setHasStds(value);
                    if (value === "no") setStdTypes("");
                  }}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="std-yes" />
                    <Label htmlFor="std-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="std-no" />
                    <Label htmlFor="std-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {hasStds === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="stdTypes">Which STD types?</Label>
                  <Input
                    id="stdTypes"
                    placeholder="Please specify"
                    value={stdTypes}
                    onChange={(e) => setStdTypes(e.target.value)}
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <Label>Is there a family history of cancer?</Label>
                <RadioGroup
                  value={hasFamilyCancerHistory || ""}
                  onValueChange={setHasFamilyCancerHistory}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="family-cancer-yes" />
                    <Label htmlFor="family-cancer-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="family-cancer-no" />
                    <Label htmlFor="family-cancer-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
          
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center py-6">
                <h3 className="text-xl font-semibold mb-2">Your Risk Assessment</h3>
                <p className="text-muted-foreground mb-6">
                  Based on the information provided, we've calculated your risk profile:
                </p>
                
                <div className="mb-4 relative">
                  <Progress 
                    value={calculateRiskScore()} 
                    className="h-4 w-full"
                    indicatorClassName={`${
                      calculateRiskScore() < 30
                        ? "bg-green-500"
                        : calculateRiskScore() < 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Low Risk</span>
                    <span>Medium Risk</span>
                    <span>High Risk</span>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg mt-6">
                  <p className="text-sm">
                    {calculateRiskScore() < 30
                      ? "Your risk factors indicate a lower risk profile. Continue regular checkups and screenings."
                      : calculateRiskScore() < 60
                      ? "You have some moderate risk factors. Regular screenings and consultations are recommended."
                      : "Your profile shows elevated risk factors. We recommend more frequent screenings and close monitoring."}
                  </p>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Note: This is an initial assessment based on self-reported information.
                  It is not a medical diagnosis. Please consult with healthcare professionals for proper evaluation.
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
            <Link to="/patient/login">
              <Button variant="outline">I have an account</Button>
            </Link>
          )}
          
          {step < 4 ? (
            <Button onClick={handleNext}>Continue</Button>
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

export default PatientSignupPage;
