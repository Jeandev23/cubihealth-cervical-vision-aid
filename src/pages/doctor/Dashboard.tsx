
import React from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Search } from "lucide-react";

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for demonstration
  const todayAppointments = [
    { 
      id: 1, 
      patientName: "Jane Smith", 
      time: "10:30 AM",
      type: "Check-up",
      riskLevel: "high",
      status: "confirmed" 
    },
    { 
      id: 2, 
      patientName: "Emily Jones", 
      time: "11:45 AM",
      type: "Follow-up",
      riskLevel: "medium", 
      status: "confirmed" 
    },
    { 
      id: 3, 
      patientName: "Mary Williams", 
      time: "2:15 PM",
      type: "Consultation",
      riskLevel: "low", 
      status: "confirmed" 
    },
  ];

  const highRiskPatients = [
    { 
      id: 101, 
      name: "Jane Smith", 
      age: 42, 
      riskScore: 78,
      lastVisit: "May 1, 2025",
      nextAppointment: "May 18, 2025",
    },
    { 
      id: 102, 
      name: "Lisa Wong", 
      age: 38, 
      riskScore: 82,
      lastVisit: "April 15, 2025",
      nextAppointment: "May 22, 2025",
    },
    { 
      id: 103, 
      name: "Teresa Clark", 
      age: 45, 
      riskScore: 75,
      lastVisit: "April 28, 2025",
      nextAppointment: "June 5, 2025",
    },
  ];

  const recentMessages = [
    {
      id: 201,
      patientName: "Jane Smith",
      message: "Dr. Johnson, I've been experiencing some unusual discharge lately. Should I be concerned?",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 202,
      patientName: "Emily Jones",
      message: "Thank you for the information about the new medication. I'll start taking it tomorrow.",
      time: "Yesterday",
      read: true,
    },
    {
      id: 203,
      patientName: "Mary Williams",
      message: "I've uploaded my latest test results to the portal for your review.",
      time: "Yesterday",
      read: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <Button variant="outline" asChild>
              <Link to="/doctor/patients">
                <Search className="mr-2 h-4 w-4" />
                Search Patients
              </Link>
            </Button>
            <Button className="bg-cubiPurple hover:bg-cubiPurple-dark" asChild>
              <Link to="/doctor/appointments/manage">
                <Calendar className="mr-2 h-4 w-4" />
                Manage Appointments
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Today's Schedule Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.length > 0 ? (
                todayAppointments.map(appointment => (
                  <div key={appointment.id} className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-4">
                      <div className="bg-muted rounded-full h-10 w-10 flex items-center justify-center">
                        <span className="font-semibold">{appointment.patientName.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                          <span className="text-sm text-muted-foreground">{appointment.time} - {appointment.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                      <Badge variant={
                        appointment.riskLevel === "high" ? "destructive" : 
                        appointment.riskLevel === "medium" ? "default" : 
                        "outline"
                      }>
                        {appointment.riskLevel === "high" ? "High Risk" : 
                        appointment.riskLevel === "medium" ? "Medium Risk" : 
                        "Low Risk"}
                      </Badge>
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm">Start</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">No appointments scheduled for today</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Full Schedule
            </Button>
          </CardFooter>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-muted-foreground text-sm">Patients</p>
                  <p className="text-2xl font-bold">128</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-muted-foreground text-sm">This Week</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-muted-foreground text-sm">High Risk</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-muted-foreground text-sm">New Patients</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Unread Messages Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map(msg => (
                  <div key={msg.id} className="flex items-start space-x-3">
                    <div className={`h-2 w-2 mt-2 rounded-full ${msg.read ? 'bg-muted' : 'bg-cubiPurple'}`} />
                    <div>
                      <p className="font-medium text-sm">
                        {msg.patientName}
                        <span className="font-normal text-xs text-muted-foreground ml-2">
                          {msg.time}
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {msg.message.length > 60 ? `${msg.message.substring(0, 60)}...` : msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Messages
              </Button>
            </CardFooter>
          </Card>
          
          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              <Button variant="outline" className="justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Create Treatment Plan
              </Button>
              <Button variant="outline" className="justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Follow-up
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Update Patient Notes
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Upload Educational Material
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="high-risk" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="high-risk">High Risk Patients</TabsTrigger>
            <TabsTrigger value="pending-reviews">Pending Reviews</TabsTrigger>
            <TabsTrigger value="test-results">New Test Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="high-risk">
            <Card>
              <CardHeader>
                <CardTitle>High Risk Patients</CardTitle>
                <CardDescription>Patients requiring close monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {highRiskPatients.map(patient => (
                    <div key={patient.id} className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <h4 className="font-medium">{patient.name} <span className="text-sm text-muted-foreground">({patient.age})</span></h4>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full">
                            Risk Score: {patient.riskScore}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Next Visit: {patient.nextAppointment}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" className="mt-2 sm:mt-0">
                        View Profile
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All High Risk Patients
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending-reviews">
            <Card>
              <CardHeader>
                <CardTitle>Pending Medical Reviews</CardTitle>
                <CardDescription>Patient files awaiting your review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You have no pending medical reviews at the moment.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="test-results">
            <Card>
              <CardHeader>
                <CardTitle>New Test Results</CardTitle>
                <CardDescription>Recently submitted test results for review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No new test results have been submitted.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DoctorDashboard;
