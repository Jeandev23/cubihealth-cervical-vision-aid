
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Upload, FileText, Clock, Calendar } from "lucide-react";

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [riskScore] = useState(() => {
    // For demo purposes, either get from localStorage or use a random score
    const stored = localStorage.getItem("patientRiskScore");
    return stored ? parseInt(stored) : Math.floor(Math.random() * 100);
  });

  // Mock data for demonstration
  const upcomingAppointment = {
    doctorName: "Dr. Sarah Johnson",
    date: "May 18, 2025",
    time: "10:30 AM",
    type: "Check-up",
  };

  const remindersList = [
    { id: 1, title: "Pap Smear", dueDate: "June 5, 2025", priority: "High" },
    { id: 2, title: "HPV Vaccination", dueDate: "August 15, 2025", priority: "Medium" },
    { id: 3, title: "Follow-up Consultation", dueDate: "September 2, 2025", priority: "Medium" },
  ];

  const educationalResources = [
    { id: 1, title: "Understanding Cervical Cancer Risk Factors", type: "Article" },
    { id: 2, title: "HPV and Cervical Health: What to Know", type: "Video" },
    { id: 3, title: "Preventive Measures for Cervical Health", type: "Document" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <Button asChild className="mt-4 md:mt-0 bg-cubiPurple hover:bg-cubiPurple-dark">
            <Link to="/patient/appointments/book">Book Appointment</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Risk Assessment Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Your Risk Profile</CardTitle>
              <CardDescription>Cervical Cancer Risk Assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Risk Score</span>
                    <span className="text-sm font-medium">{riskScore}%</span>
                  </div>
                  <Progress 
                    value={riskScore} 
                    className="h-3"
                    indicatorClassName={`${
                      riskScore < 30
                        ? "bg-green-500"
                        : riskScore < 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Low</span>
                    <span className="text-xs text-muted-foreground">High</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {riskScore < 30
                    ? "Your risk assessment indicates a lower risk profile. Continue regular screenings and maintain your health practices."
                    : riskScore < 60
                    ? "You have some moderate risk factors. Regular screenings are important for early detection."
                    : "Your assessment shows elevated risk factors. Please follow the recommended screening schedule closely."}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/patient/risk-assessment">View Detailed Assessment</Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Next Appointment Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Upcoming Appointment</CardTitle>
              <CardDescription>Your next scheduled visit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <CalendarIcon className="h-5 w-5 text-cubiPurple" />
                  </div>
                  <div>
                    <p className="font-medium">{upcomingAppointment.doctorName}</p>
                    <p className="text-sm text-muted-foreground">{upcomingAppointment.date} at {upcomingAppointment.time}</p>
                    <p className="text-sm text-muted-foreground">{upcomingAppointment.type}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Reschedule
                </Button>
                <Button size="sm" className="flex-1">
                  Join Video
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* Quick Actions Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
              <CardDescription>Common tasks you may need</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              <Button variant="outline" className="justify-start">
                <Upload className="mr-2 h-4 w-4" />
                Upload Medical Records
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Write in Journal
              </Button>
              <Button variant="outline" className="justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Track Symptoms
              </Button>
              <Button variant="outline" className="justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Menstruation Tracker
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="reminders" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="resources">Educational Resources</TabsTrigger>
            <TabsTrigger value="tracker">Menstrual Tracker</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reminders">
            <Card>
              <CardHeader>
                <CardTitle>Health Reminders</CardTitle>
                <CardDescription>Upcoming tests, screenings, and follow-ups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {remindersList.map(reminder => (
                    <div key={reminder.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <h4 className="font-medium">{reminder.title}</h4>
                        <p className="text-sm text-muted-foreground">Due: {reminder.dueDate}</p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          reminder.priority === 'High' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {reminder.priority} Priority
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">
                  View All Reminders
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Educational Resources</CardTitle>
                <CardDescription>Learn more about cervical health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {educationalResources.map(resource => (
                    <div key={resource.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground">{resource.type}</p>
                      </div>
                      <Button size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">
                  Browse All Resources
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="tracker">
            <Card>
              <CardHeader>
                <CardTitle>Menstrual Cycle Tracker</CardTitle>
                <CardDescription>Monitor and predict your cycle</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold">Next Period</h3>
                  <p className="text-3xl font-bold text-cubiPurple">May 25, 2025</p>
                  <p className="text-sm text-muted-foreground">in 12 days</p>
                </div>
                
                <div className="grid grid-cols-3 w-full gap-4 text-center mb-6">
                  <div className="bg-cubiPurple/10 p-4 rounded-lg">
                    <h4 className="text-sm font-medium">Cycle Length</h4>
                    <p className="text-xl font-semibold">28 days</p>
                  </div>
                  <div className="bg-cubiPurple/10 p-4 rounded-lg">
                    <h4 className="text-sm font-medium">Period Length</h4>
                    <p className="text-xl font-semibold">5 days</p>
                  </div>
                  <div className="bg-cubiPurple/10 p-4 rounded-lg">
                    <h4 className="text-sm font-medium">Ovulation</h4>
                    <p className="text-xl font-semibold">June 4</p>
                  </div>
                </div>
                
                <div className="w-full flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="bg-cubiPurple hover:bg-cubiPurple-dark">
                    Log Period
                  </Button>
                  <Button variant="outline">
                    View Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PatientDashboard;
