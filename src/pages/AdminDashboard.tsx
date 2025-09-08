import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Calendar, TrendingUp, Activity, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const AdminDashboard = () => {
  // Mock data for demonstration
  const trendData = [
    { month: 'Jan', anxiety: 45, depression: 32, stress: 67, sleep: 23 },
    { month: 'Feb', anxiety: 52, depression: 28, stress: 71, sleep: 31 },
    { month: 'Mar', anxiety: 48, depression: 35, stress: 69, sleep: 28 },
    { month: 'Apr', anxiety: 61, depression: 42, stress: 78, sleep: 35 },
    { month: 'May', anxiety: 55, depression: 38, stress: 73, sleep: 32 },
    { month: 'Jun', anxiety: 49, depression: 33, stress: 66, sleep: 29 }
  ];

  const statusData = [
    { name: 'Available', value: 12, color: 'hsl(var(--success))' },
    { name: 'In Session', value: 8, color: 'hsl(var(--warning))' },
    { name: 'Offline', value: 3, color: 'hsl(var(--muted))' }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Mental Health Platform Overview</p>
          </div>
          <Badge variant="outline" className="text-sm">
            <Activity className="w-4 h-4 mr-1" />
            Live Data
          </Badge>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1,247</div>
              <p className="text-xs text-success">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Counselors</CardTitle>
              <UserCheck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">23</div>
              <p className="text-xs text-muted-foreground">8 currently in session</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">47</div>
              <p className="text-xs text-warning">3 slots remaining</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">87%</div>
              <p className="text-xs text-success">+5% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Analytics */}
          <Card className="lg:col-span-2 bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Mental Health Concerns Trends</CardTitle>
              <CardDescription>Anonymous aggregated data over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Line type="monotone" dataKey="anxiety" stroke="hsl(var(--warning))" strokeWidth={2} />
                  <Line type="monotone" dataKey="depression" stroke="hsl(var(--destructive))" strokeWidth={2} />
                  <Line type="monotone" dataKey="stress" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="sleep" stroke="hsl(var(--success))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-warning rounded-full mr-2"></div>
                  <span>Anxiety</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-destructive rounded-full mr-2"></div>
                  <span>Depression</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  <span>Stress</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
                  <span>Sleep Issues</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Counselor Status */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Counselor Availability</CardTitle>
              <CardDescription>Current status of all counselors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Alerts */}
        <Card className="bg-card border-warning">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <AlertCircle className="w-5 h-5 text-warning mr-2" />
              System Alerts
            </CardTitle>
            <CardDescription>Important notifications requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                <div>
                  <p className="font-medium">High Volume Alert</p>
                  <p className="text-sm text-muted-foreground">Chat requests 40% above average today</p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Maintenance Scheduled</p>
                  <p className="text-sm text-muted-foreground">System maintenance tomorrow 2:00-4:00 AM</p>
                </div>
                <Badge variant="outline">Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;