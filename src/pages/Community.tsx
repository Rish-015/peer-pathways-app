import { useState } from "react";
import { Heart, MessageCircle, Send, Smile, Users, Shield, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface MoodPost {
  id: string;
  mood: string;
  color: string;
  emoji: string;
  timestamp: Date;
  anonymous: boolean;
}

interface ConfessionPost {
  id: string;
  content: string;
  timestamp: Date;
  mentorReply?: string;
  likes: number;
  supportCount: number;
}

const Community = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [confessionText, setConfessionText] = useState("");
  
  const [moodPosts] = useState<MoodPost[]>([
    { id: "1", mood: "hopeful", color: "bg-green-200", emoji: "🌱", timestamp: new Date(Date.now() - 30 * 60000), anonymous: true },
    { id: "2", mood: "anxious", color: "bg-orange-200", emoji: "😰", timestamp: new Date(Date.now() - 2 * 60 * 60000), anonymous: true },
    { id: "3", mood: "grateful", color: "bg-pink-200", emoji: "🙏", timestamp: new Date(Date.now() - 4 * 60 * 60000), anonymous: true },
    { id: "4", mood: "overwhelmed", color: "bg-red-200", emoji: "😵", timestamp: new Date(Date.now() - 6 * 60 * 60000), anonymous: true },
    { id: "5", mood: "peaceful", color: "bg-blue-200", emoji: "😌", timestamp: new Date(Date.now() - 8 * 60 * 60000), anonymous: true },
    { id: "6", mood: "excited", color: "bg-yellow-200", emoji: "✨", timestamp: new Date(Date.now() - 12 * 60 * 60000), anonymous: true },
  ]);

  const [confessions] = useState<ConfessionPost[]>([
    {
      id: "1",
      content: "I've been struggling with imposter syndrome lately. Sometimes I feel like I don't belong here and everyone else is smarter than me.",
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      mentorReply: "Imposter syndrome affects 70% of college students. You earned your place here through your hard work and abilities. These feelings are temporary, but your achievements are real.",
      likes: 12,
      supportCount: 8
    },
    {
      id: "2", 
      content: "I feel so lonely even though I'm surrounded by people all the time. It's like I'm invisible and no one really sees me.",
      timestamp: new Date(Date.now() - 5 * 60 * 60000),
      mentorReply: "Loneliness in crowded spaces is more common than you think. Quality connections matter more than quantity. Consider joining clubs aligned with your interests to find your people.",
      likes: 18,
      supportCount: 15
    },
    {
      id: "3",
      content: "The pressure to choose a major and plan my whole future is keeping me up at night. What if I make the wrong choice?",
      timestamp: new Date(Date.now() - 12 * 60 * 60000),
      likes: 9,
      supportCount: 6
    }
  ]);

  const moodOptions = [
    { mood: "happy", color: "bg-yellow-200", emoji: "😊" },
    { mood: "sad", color: "bg-blue-200", emoji: "😢" },
    { mood: "anxious", color: "bg-orange-200", emoji: "😰" },
    { mood: "grateful", color: "bg-pink-200", emoji: "🙏" },
    { mood: "overwhelmed", color: "bg-red-200", emoji: "😵" },
    { mood: "peaceful", color: "bg-green-200", emoji: "😌" },
    { mood: "excited", color: "bg-purple-200", emoji: "✨" },
    { mood: "frustrated", color: "bg-gray-200", emoji: "😤" },
  ];

  const handleMoodSubmit = () => {
    if (selectedMood) {
      // In a real app, this would submit to the backend
      setSelectedMood("");
    }
  };

  const handleConfessionSubmit = () => {
    if (confessionText.trim()) {
      // In a real app, this would submit to the backend
      setConfessionText("");
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <section className="bg-card border-b border-border shadow-gentle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Peer Support Community</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Connect with fellow students in a safe, anonymous space. Share your feelings, 
              support others, and know that you're not alone in your journey.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>100% Anonymous</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-secondary" />
                <span>Peer Moderated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mood Board */}
          <section>
            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smile className="h-5 w-5 text-primary" />
                  Anonymous Mood Board
                </CardTitle>
                <CardDescription>
                  Share how you're feeling right now. Your mood helps others feel less alone.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mood Selection */}
                <div>
                  <p className="text-sm font-medium mb-3">How are you feeling today?</p>
                  <div className="grid grid-cols-4 gap-2">
                    {moodOptions.map((option) => (
                      <button
                        key={option.mood}
                        onClick={() => setSelectedMood(option.mood)}
                        className={cn(
                          "p-3 rounded-lg border-2 transition-all text-center hover:scale-105",
                          selectedMood === option.mood
                            ? "border-primary bg-primary-soft shadow-gentle"
                            : "border-border hover:border-primary/50",
                          option.color
                        )}
                      >
                        <div className="text-2xl mb-1">{option.emoji}</div>
                        <div className="text-xs font-medium capitalize">{option.mood}</div>
                      </button>
                    ))}
                  </div>
                  {selectedMood && (
                    <Button 
                      onClick={handleMoodSubmit}
                      variant="calm" 
                      className="w-full mt-4"
                    >
                      Share Mood Anonymously
                    </Button>
                  )}
                </div>

                {/* Recent Moods */}
                <div>
                  <p className="text-sm font-medium mb-3">Recent Community Moods</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {moodPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", post.color)}>
                            <span>{post.emoji}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium capitalize">{post.mood}</p>
                            <p className="text-xs text-muted-foreground">Anonymous</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(post.timestamp)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Confession Wall */}
          <section>
            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-secondary" />
                  Anonymous Support Wall
                </CardTitle>
                <CardDescription>
                  Share your thoughts anonymously and receive support from mentors and peers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* New Confession */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="comfort" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Share Something Anonymous
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Anonymous Support Post</DialogTitle>
                      <DialogDescription>
                        Share what's on your mind. Your post will be completely anonymous and moderated for safety.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Share your thoughts, feelings, or what you're going through..."
                        value={confessionText}
                        onChange={(e) => setConfessionText(e.target.value)}
                        className="min-h-32"
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleConfessionSubmit}
                          variant="comfort"
                          disabled={!confessionText.trim()}
                          className="flex-1"
                        >
                          Post Anonymously
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Recent Confessions */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {confessions.map((post) => (
                    <div key={post.id} className="p-4 rounded-lg bg-card border border-border">
                      <p className="text-sm mb-3 leading-relaxed">{post.content}</p>
                      
                      {post.mentorReply && (
                        <div className="mt-3 p-3 rounded-lg bg-secondary-soft border-l-4 border-secondary">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              Peer Mentor
                            </Badge>
                          </div>
                          <p className="text-sm text-secondary-foreground">{post.mentorReply}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 hover:text-primary transition-gentle">
                            <Heart className="h-3 w-3" />
                            {post.likes}
                          </button>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {post.supportCount} supporting
                          </span>
                        </div>
                        <span>{formatTimeAgo(post.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Community Guidelines */}
        <Card className="mt-8 bg-accent-soft border-accent/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              Community Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Be Kind & Supportive</h4>
                <p className="text-muted-foreground">Treat others with empathy and respect. We're all here to support each other.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Keep It Anonymous</h4>
                <p className="text-muted-foreground">Don't share personal information that could identify yourself or others.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Seek Professional Help</h4>
                <p className="text-muted-foreground">If you're in crisis, please contact emergency services or use our booking system for professional support.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;