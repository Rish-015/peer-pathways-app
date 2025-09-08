import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, UserCheck, Users, Calendar, Clock, MapPin, Mail, Phone } from "lucide-react";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock counselor data
  const counselors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "s.johnson@university.edu",
      phone: "(555) 123-4567",
      expertise: ["Anxiety", "Depression", "Academic Stress"],
      status: "Available",
      location: "Psychology Building, Room 201",
      todaySlots: { booked: 6, available: 2 },
      nextAvailable: "2:00 PM"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      email: "m.chen@university.edu",
      phone: "(555) 234-5678",
      expertise: ["Relationships", "Social Anxiety", "Self-Esteem"],
      status: "In Session",
      location: "Counseling Center, Room 105",
      todaySlots: { booked: 5, available: 3 },
      nextAvailable: "3:30 PM"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "e.rodriguez@university.edu",
      phone: "(555) 345-6789",
      expertise: ["Trauma", "PTSD", "Crisis Intervention"],
      status: "Available",
      location: "Health Center, Room 302",
      todaySlots: { booked: 4, available: 4 },
      nextAvailable: "1:15 PM"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      email: "j.wilson@university.edu",
      phone: "(555) 456-7890",
      expertise: ["ADHD", "Learning Disabilities", "Time Management"],
      status: "Offline",
      location: "Student Services, Room 150",
      todaySlots: { booked: 3, available: 5 },
      nextAvailable: "Tomorrow 9:00 AM"
    }
  ];

  // Mock student metrics
  const studentMetrics = {
    totalRegistered: 1247,
    activeThisWeek: 892,
    newThisMonth: 157,
    demographics: {
      year: { freshman: 312, sophomore: 298, junior: 334, senior: 303 },
      college: { 
        "Arts & Sciences": 387,
        "Engineering": 298,
        "Business": 234,
        "Medicine": 178,
        "Education": 150
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-success text-success-foreground";
      case "In Session": return "bg-warning text-warning-foreground";
      case "Offline": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredCounselors = counselors.filter(counselor =>
    counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    counselor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-1">Manage counselors and view student analytics</p>
          </div>
        </div>

        <Tabs defaultValue="counselors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="counselors" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Counselors
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Student Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="counselors" className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Counselor Roster</CardTitle>
                <CardDescription>Manage counselor profiles and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or expertise..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Counselor</TableHead>
                        <TableHead>Expertise</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Today's Schedule</TableHead>
                        <TableHead>Next Available</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCounselors.map((counselor) => (
                        <TableRow key={counselor.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{counselor.name}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {counselor.email}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {counselor.phone}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {counselor.expertise.map((exp) => (
                                <Badge key={exp} variant="secondary" className="text-xs">
                                  {exp}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(counselor.status)}>
                              {counselor.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              {counselor.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p><span className="font-medium">{counselor.todaySlots.booked}</span> booked</p>
                              <p><span className="font-medium">{counselor.todaySlots.available}</span> available</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              {counselor.nextAvailable}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Calendar className="w-3 h-3 mr-1" />
                                Schedule
                              </Button>
                              <Button size="sm" variant="outline">Edit</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            {/* Student Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Total Registered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{studentMetrics.totalRegistered.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Active student accounts</p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Active This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{studentMetrics.activeThisWeek.toLocaleString()}</div>
                  <p className="text-sm text-success">
                    {((studentMetrics.activeThisWeek / studentMetrics.totalRegistered) * 100).toFixed(1)}% engagement rate
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">New This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{studentMetrics.newThisMonth}</div>
                  <p className="text-sm text-muted-foreground">New registrations</p>
                </CardContent>
              </Card>
            </div>

            {/* Demographics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">By Academic Year</CardTitle>
                  <CardDescription>Anonymous demographic distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(studentMetrics.demographics.year).map(([year, count]) => (
                      <div key={year} className="flex items-center justify-between">
                        <span className="capitalize">{year}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full">
                            <div 
                              className="h-2 bg-primary rounded-full"
                              style={{ width: `${(count / studentMetrics.totalRegistered) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">By College</CardTitle>
                  <CardDescription>Academic distribution of users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(studentMetrics.demographics.college).map(([college, count]) => (
                      <div key={college} className="flex items-center justify-between">
                        <span className="text-sm">{college}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full">
                            <div 
                              className="h-2 bg-secondary rounded-full"
                              style={{ width: `${(count / studentMetrics.totalRegistered) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminUsers;