import { useState } from "react";
import { Search, Filter, Play, BookOpen, Headphones, Clock, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "video" | "article" | "audio" | "exercise";
  topic: string;
  duration: string;
  rating: number;
  thumbnail: string;
  featured: boolean;
}

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");

  const resources: Resource[] = [
    {
      id: "1",
      title: "Understanding Anxiety in College",
      description: "Learn about common anxiety symptoms and practical coping strategies specifically designed for college students.",
      type: "video",
      topic: "anxiety",
      duration: "12 min",
      rating: 4.8,
      thumbnail: "bg-gradient-to-br from-blue-100 to-blue-200",
      featured: true
    },
    {
      id: "2", 
      title: "5-Minute Breathing Exercise",
      description: "A quick guided breathing exercise to help reduce stress and promote relaxation between classes.",
      type: "audio",
      topic: "stress",
      duration: "5 min",
      rating: 4.9,
      thumbnail: "bg-gradient-to-br from-green-100 to-green-200",
      featured: false
    },
    {
      id: "3",
      title: "Sleep Hygiene for Students",
      description: "Essential tips for improving sleep quality and establishing healthy sleep habits during college.",
      type: "article",
      topic: "sleep",
      duration: "8 min read",
      rating: 4.7,
      thumbnail: "bg-gradient-to-br from-purple-100 to-purple-200",
      featured: true
    },
    {
      id: "4",
      title: "Progressive Muscle Relaxation",
      description: "Learn this evidence-based technique for reducing physical tension and promoting deep relaxation.",
      type: "exercise",
      topic: "relaxation",
      duration: "15 min",
      rating: 4.6,
      thumbnail: "bg-gradient-to-br from-orange-100 to-orange-200",
      featured: false
    },
    {
      id: "5",
      title: "Managing Academic Pressure",
      description: "Strategies for dealing with academic stress, perfectionism, and maintaining work-life balance.",
      type: "article",
      topic: "stress",
      duration: "10 min read",
      rating: 4.8,
      thumbnail: "bg-gradient-to-br from-red-100 to-red-200",
      featured: false
    },
    {
      id: "6",
      title: "Mindful Study Breaks",
      description: "Short mindfulness exercises you can do between study sessions to refresh your mind and reduce burnout.",
      type: "video",
      topic: "mindfulness",
      duration: "7 min",
      rating: 4.5,
      thumbnail: "bg-gradient-to-br from-teal-100 to-teal-200",
      featured: false
    }
  ];

  const typeIcons = {
    video: Play,
    article: BookOpen,
    audio: Headphones,
    exercise: Star
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || resource.type === selectedType;
    const matchesTopic = selectedTopic === "all" || resource.topic === selectedTopic;
    
    return matchesSearch && matchesType && matchesTopic;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <section className="bg-card border-b border-border shadow-gentle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Mental Wellness Resource Hub
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover curated resources to support your mental health journey. From quick exercises 
              to in-depth guides, find what works best for you.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-8 shadow-gentle">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="exercise">Exercises</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  <SelectItem value="anxiety">Anxiety</SelectItem>
                  <SelectItem value="stress">Stress</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                  <SelectItem value="mindfulness">Mindfulness</SelectItem>
                  <SelectItem value="relaxation">Relaxation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Featured Resources */}
        {featuredResources.length > 0 && searchQuery === "" && selectedType === "all" && selectedTopic === "all" && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Featured Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredResources.map((resource) => {
                const Icon = typeIcons[resource.type];
                return (
                  <Card key={resource.id} className="group cursor-pointer transition-comfort hover:shadow-comfort">
                    <div className={cn("h-32 rounded-t-lg flex items-center justify-center", resource.thumbnail)}>
                      <Icon className="h-12 w-12 text-white/80" />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="group-hover:text-primary transition-gentle">
                            {resource.title}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="capitalize">
                              {resource.type}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {resource.topic}
                            </Badge>
                          </div>
                        </div>
                        <Badge className="bg-warning text-warning-foreground">Featured</Badge>
                      </div>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {resource.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            {resource.rating}
                          </div>
                        </div>
                        <Button variant="calm" size="sm">
                          Access Resource
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* All Resources */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              All Resources
              {filteredResources.length !== resources.length && (
                <span className="text-lg text-muted-foreground ml-2">
                  ({filteredResources.length} found)
                </span>
              )}
            </h2>
          </div>
          
          {filteredResources.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">No resources found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedType("all");
                    setSelectedTopic("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
                const Icon = typeIcons[resource.type];
                return (
                  <Card key={resource.id} className="group cursor-pointer transition-comfort hover:shadow-gentle">
                    <div className={cn("h-24 rounded-t-lg flex items-center justify-center", resource.thumbnail)}>
                      <Icon className="h-8 w-8 text-white/80" />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="space-y-2">
                        <CardTitle className="text-lg group-hover:text-primary transition-gentle">
                          {resource.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="capitalize text-xs">
                            {resource.type}
                          </Badge>
                          <Badge variant="outline" className="capitalize text-xs">
                            {resource.topic}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-sm">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {resource.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-warning text-warning" />
                            {resource.rating}
                          </div>
                        </div>
                        <Button variant="calm" size="sm">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Resources;