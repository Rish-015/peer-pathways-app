import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MessageCircle, TrendingUp, Users, AlertTriangle, Calendar, Clock, Eye } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from "recharts";

const AdminCommunity = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");

  // Mock data for mood trends
  const moodTrends = [
    { day: 'Mon', happy: 45, calm: 38, anxious: 62, sad: 23, excited: 29, stressed: 71 },
    { day: 'Tue', happy: 52, calm: 41, anxious: 58, sad: 28, excited: 34, stressed: 66 },
    { day: 'Wed', happy: 48, calm: 45, anxious: 64, sad: 31, excited: 27, stressed: 73 },
    { day: 'Thu', happy: 41, calm: 39, anxious: 69, sad: 35, excited: 22, stressed: 78 },
    { day: 'Fri', happy: 67, calm: 52, anxious: 45, sad: 18, excited: 58, stressed: 41 },
    { day: 'Sat', happy: 73, calm: 61, anxious: 32, sad: 15, excited: 64, stressed: 28 },
    { day: 'Sun', happy: 69, calm: 58, anxious: 38, sad: 19, excited: 51, stressed: 35 }
  ];

  // Mock discussion topics data
  const discussionTopics = [
    { topic: 'Academic Stress', mentions: 234, sentiment: 'negative', trend: '+12%' },
    { topic: 'Exam Anxiety', mentions: 189, sentiment: 'negative', trend: '+8%' },
    { topic: 'Social Life', mentions: 156, sentiment: 'neutral', trend: '+3%' },
    { topic: 'Sleep Issues', mentions: 134, sentiment: 'negative', trend: '+15%' },
    { topic: 'Career Concerns', mentions: 112, sentiment: 'neutral', trend: '+5%' },
    { topic: 'Relationships', mentions: 98, sentiment: 'mixed', trend: '-2%' },
    { topic: 'Financial Stress', mentions: 87, sentiment: 'negative', trend: '+7%' },
    { topic: 'Body Image', mentions: 76, sentiment: 'negative', trend: '+1%' },
    { topic: 'Time Management', mentions: 65, sentiment: 'neutral', trend: '+4%' },
    { topic: 'Self Care', mentions: 54, sentiment: 'positive', trend: '+9%' }
  ];

  // Mock community metrics
  const communityMetrics = {
    totalPosts: 1847,
    activeModerators: 12,
    dailyInteractions: 3421,
    reportedPosts: 23,
    averageResponseTime: '4.2 hours'
  };

  // Mock mood board data
  const moodDistribution = [
    { mood: 'Happy', count: 289, color: 'hsl(var(--success))' },
    { mood: 'Calm', count: 245, color: 'hsl(var(--primary))' },
    { mood: 'Anxious', count: 198, color: 'hsl(var(--warning))' },
    { mood: 'Stressed', count: 167, color: 'hsl(var(--destructive))' },
    { mood: 'Excited', count: 134, color: 'hsl(var(--accent))' },
    { mood: 'Sad', count: 89, color: 'hsl(var(--muted))' }
  ];

  // Mock engagement data
  const engagementData = [
    { hour: '6AM', posts: 12, views: 89 },
    { hour: '9AM', posts: 45, views: 234 },
    { hour: '12PM', posts: 67, views: 456 },
    { hour: '3PM', posts: 89, views: 678 },
    { hour: '6PM', posts: 134, views: 892 },
    { hour: '9PM', posts: 156, views: 1024 },
    { hour: '12AM', posts: 78, views: 345 }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-success text-success-foreground';
      case 'negative': return 'bg-destructive text-destructive-foreground';
      case 'neutral': return 'bg-muted text-muted-foreground';
      case 'mixed': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😰';
      case 'neutral': return '😐';
      case 'mixed': return '🤔';
      default: return '😐';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Community Analytics</h1>
            <p className="text-muted-foreground mt-1">Monitor peer support and community engagement</p>
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
            <TabsTrigger value="mood">Mood Analytics</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <MessageCircle className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{communityMetrics.totalPosts.toLocaleString()}</div>
                  <p className="text-xs text-success">+18% from last week</p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Daily Interactions</CardTitle>
                  <Heart className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{communityMetrics.dailyInteractions.toLocaleString()}</div>
                  <p className="text-xs text-success">+12% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Moderators</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{communityMetrics.activeModerators}</div>
                  <p className="text-xs text-muted-foreground">Currently online</p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reported Posts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{communityMetrics.reportedPosts}</div>
                  <p className="text-xs text-warning">Needs review</p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{communityMetrics.averageResponseTime}</div>
                  <p className="text-xs text-success">-20min from last week</p>
                </CardContent>
              </Card>
            </div>

            {/* Engagement Over Time */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Daily Engagement Patterns</CardTitle>
                <CardDescription>Post creation and view patterns throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Area type="monotone" dataKey="views" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="posts" stackId="2" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mood" className="space-y-6">
            {/* Mood Trends */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Weekly Mood Trends</CardTitle>
                <CardDescription>Anonymous mood board submissions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={moodTrends}>
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
                    <Line type="monotone" dataKey="happy" stroke="hsl(var(--success))" strokeWidth={2} />
                    <Line type="monotone" dataKey="calm" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="anxious" stroke="hsl(var(--warning))" strokeWidth={2} />
                    <Line type="monotone" dataKey="stressed" stroke="hsl(var(--destructive))" strokeWidth={2} />
                    <Line type="monotone" dataKey="excited" stroke="hsl(var(--accent))" strokeWidth={2} />
                    <Line type="monotone" dataKey="sad" stroke="hsl(var(--muted))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span className="text-sm">Happy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm">Calm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span className="text-sm">Anxious</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-sm">Stressed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span className="text-sm">Excited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-muted rounded-full"></div>
                    <span className="text-sm">Sad</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Mood Distribution */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Current Mood Distribution</CardTitle>
                <CardDescription>Real-time snapshot of community sentiment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {moodDistribution.map((mood) => (
                    <div key={mood.mood} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: mood.color }}
                        ></div>
                        <span className="font-medium">{mood.mood}</span>
                      </div>
                      <span className="text-lg font-bold">{mood.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            {/* Discussion Topics */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Trending Discussion Topics</CardTitle>
                <CardDescription>Most mentioned topics in community discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discussionTopics.map((topic, index) => (
                    <div key={topic.topic} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getSentimentIcon(topic.sentiment)}</span>
                          <Badge className={getSentimentColor(topic.sentiment)}>
                            {topic.sentiment}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{topic.topic}</p>
                          <p className="text-sm text-muted-foreground">{topic.mentions} mentions</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className={topic.trend.startsWith('+') ? 'text-success' : 'text-destructive'}>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {topic.trend}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Topic Mentions Chart */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Topic Mention Frequency</CardTitle>
                <CardDescription>Number of mentions across different topics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={discussionTopics.slice(0, 7)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="topic" 
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
                    <Bar dataKey="mentions" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            {/* Moderation Queue */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Content Moderation Queue
                </CardTitle>
                <CardDescription>Posts and comments requiring moderator review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border-l-4 border-warning bg-warning/10 rounded-lg">
                    <div>
                      <p className="font-medium">Potentially Concerning Post</p>
                      <p className="text-sm text-muted-foreground">Anonymous user expressing thoughts of self-harm</p>
                      <p className="text-xs text-muted-foreground mt-1">Reported 2 hours ago • Priority: High</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Review</Button>
                      <Button size="sm" className="bg-warning text-warning-foreground">Escalate</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border-l-4 border-destructive bg-destructive/10 rounded-lg">
                    <div>
                      <p className="font-medium">Inappropriate Content</p>
                      <p className="text-sm text-muted-foreground">Comment flagged for offensive language</p>
                      <p className="text-xs text-muted-foreground mt-1">Reported 4 hours ago • Priority: Medium</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Review</Button>
                      <Button size="sm" variant="destructive">Remove</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border-l-4 border-muted bg-muted/10 rounded-lg">
                    <div>
                      <p className="font-medium">Spam Report</p>
                      <p className="text-sm text-muted-foreground">Multiple reports of promotional content</p>
                      <p className="text-xs text-muted-foreground mt-1">Reported 6 hours ago • Priority: Low</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Review</Button>
                      <Button size="sm" variant="outline">Remove</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Moderator Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Active Moderators</CardTitle>
                  <CardDescription>Current moderator availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Dr. Smith (Lead)</span>
                      </div>
                      <Badge variant="outline">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Dr. Johnson</span>
                      </div>
                      <Badge variant="outline">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        <span>Dr. Chen</span>
                      </div>
                      <Badge variant="secondary">Away</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-muted rounded-full"></div>
                        <span>Dr. Rodriguez</span>
                      </div>
                      <Badge variant="outline">Offline</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Safety Metrics</CardTitle>
                  <CardDescription>Community safety indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Response Time</span>
                      <span className="font-medium text-success">4.2 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Resolved Reports</span>
                      <span className="font-medium">96%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Emergency Escalations</span>
                      <span className="font-medium text-warning">3 this week</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Community Guidelines</span>
                      <span className="font-medium text-success">99.2% compliance</span>
                    </div>
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

export default AdminCommunity;