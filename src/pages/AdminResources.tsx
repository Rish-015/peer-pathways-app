import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, TrendingUp, Eye, Download, Play, FileText, Headphones, Video, Globe } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const AdminResources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("7days");

  // Mock data for resource analytics
  const popularResources = [
    { 
      id: 1,
      title: "Managing Exam Anxiety",
      type: "video",
      views: 2847,
      downloads: 1205,
      rating: 4.8,
      language: "English",
      category: "Anxiety",
      trend: "+12%"
    },
    { 
      id: 2,
      title: "Sleep Hygiene for Students",
      type: "article",
      views: 2234,
      downloads: 892,
      rating: 4.6,
      language: "English",
      category: "Sleep",
      trend: "+8%"
    },
    { 
      id: 3,
      title: "Mindfulness Meditation Guide",
      type: "audio",
      views: 1987,
      downloads: 1456,
      rating: 4.9,
      language: "Spanish",
      category: "Mindfulness",
      trend: "+15%"
    },
    { 
      id: 4,
      title: "Building Healthy Relationships",
      type: "video",
      views: 1756,
      downloads: 678,
      rating: 4.7,
      language: "English",
      category: "Relationships",
      trend: "+5%"
    },
    { 
      id: 5,
      title: "Time Management Strategies",
      type: "article",
      views: 1643,
      downloads: 834,
      rating: 4.5,
      language: "Mandarin",
      category: "Academic",
      trend: "+3%"
    }
  ];

  const usageByCategory = [
    { category: 'Anxiety', views: 8942, percentage: 28 },
    { category: 'Depression', views: 6834, percentage: 21 },
    { category: 'Stress Management', views: 5923, percentage: 18 },
    { category: 'Sleep', views: 4756, percentage: 15 },
    { category: 'Relationships', views: 3567, percentage: 11 },
    { category: 'Academic', views: 2234, percentage: 7 }
  ];

  const contentTypeData = [
    { name: 'Video', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Article', value: 35, color: 'hsl(var(--secondary))' },
    { name: 'Audio', value: 20, color: 'hsl(var(--accent))' }
  ];

  const languageData = [
    { language: 'English', percentage: 65, users: 812 },
    { language: 'Spanish', percentage: 20, users: 249 },
    { language: 'Mandarin', percentage: 10, users: 125 },
    { language: 'French', percentage: 3, users: 37 },
    { language: 'Other', percentage: 2, users: 24 }
  ];

  const weeklyTrends = [
    { day: 'Mon', views: 245, downloads: 89 },
    { day: 'Tue', views: 289, downloads: 112 },
    { day: 'Wed', views: 334, downloads: 156 },
    { day: 'Thu', views: 398, downloads: 187 },
    { day: 'Fri', views: 421, downloads: 203 },
    { day: 'Sat', views: 312, downloads: 134 },
    { day: 'Sun', views: 267, downloads: 98 }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="w-4 h-4" />;
      case "audio": return <Headphones className="w-4 h-4" />;
      case "article": return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-primary text-primary-foreground";
      case "audio": return "bg-secondary text-secondary-foreground";
      case "article": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredResources = popularResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Resource Analytics</h1>
            <p className="text-muted-foreground mt-1">Monitor resource usage and content performance</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="popular">Popular Content</TabsTrigger>
            <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">32,156</div>
                  <p className="text-xs text-success">+12% from last week</p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                  <Download className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">14,892</div>
                  <p className="text-xs text-success">+8% from last week</p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Resources</CardTitle>
                  <FileText className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">247</div>
                  <p className="text-xs text-muted-foreground">Across all categories</p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">4.7</div>
                  <p className="text-xs text-success">+0.2 from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Trends */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Weekly Usage Trends</CardTitle>
                <CardDescription>Views and downloads over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="downloads" stroke="hsl(var(--secondary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            {/* Search */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Popular Resources</CardTitle>
                <CardDescription>Most viewed and downloaded content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredResources.map((resource, index) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(resource.type)}>
                            {getTypeIcon(resource.type)}
                            <span className="ml-1 capitalize">{resource.type}</span>
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{resource.title}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Category: {resource.category}</span>
                            <span className="flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {resource.language}
                            </span>
                            <span>Rating: {resource.rating}/5</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{resource.views.toLocaleString()}</span>
                          </div>
                          <p className="text-muted-foreground">Views</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{resource.downloads.toLocaleString()}</span>
                          </div>
                          <p className="text-muted-foreground">Downloads</p>
                        </div>
                        <Badge variant="outline" className="text-success">
                          {resource.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Usage */}
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Usage by Category</CardTitle>
                  <CardDescription>Most accessed content categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={usageByCategory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="category" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                      />
                      <Bar dataKey="views" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Content Type Distribution */}
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Content Type Distribution</CardTitle>
                  <CardDescription>Breakdown by media format</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={contentTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {contentTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {contentTypeData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="languages" className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Language Usage</CardTitle>
                <CardDescription>Content language preferences by users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {languageData.map((lang) => (
                    <div key={lang.language} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{lang.language}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {lang.users} users ({lang.percentage}%)
                        </div>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${lang.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminResources;